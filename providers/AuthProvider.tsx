'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthState, AuthStep, User } from '@/types';
import {
  authApi,
  AuthApiError,
  clearAuthSession,
  type RegistrationResult,
} from '@/lib/auth-api';

type AuthContextValue = AuthState & {
  login: (email: string, password: string, rememberMe: boolean) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<RegistrationResult | null>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  resetStep: () => void;
};

const INITIAL_AUTH_STATE: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  step: 'initializing',
  error: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const errorMessage = (error: unknown, fallback: string) => (
  error instanceof AuthApiError ? error.message : fallback
);

const splitName = (name: string) => {
  const [firstName = '', ...lastName] = name.trim().split(/\s+/);
  return { firstName, lastName: lastName.join(' ') };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(INITIAL_AUTH_STATE);

  const setStep = useCallback((step: AuthStep) => {
    setState((previous) => ({
      ...previous,
      step,
      error: step === 'loading' ? null : previous.error,
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setState((previous) => ({
      ...previous,
      isInitialized: true,
      step: 'error',
      error,
    }));
  }, []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        const session = await authApi.refresh();
        const user = session.user ?? await authApi.me();
        if (!active) return;
        setState({
          isInitialized: true,
          isAuthenticated: user.emailVerified,
          user: user.emailVerified ? user : null,
          step: 'idle',
          error: user.emailVerified ? null : 'Please verify your email before signing in.',
        });
        if (!user.emailVerified) clearAuthSession();
      } catch {
        clearAuthSession();
        if (!active) return;
        setState({
          ...INITIAL_AUTH_STATE,
          isInitialized: true,
          step: 'idle',
        });
      }
    };

    void bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean): Promise<User | null> => {
    setStep('loading');
    try {
      const session = await authApi.login({ email, password, rememberMe });
      const user = session.user ?? await authApi.me();
      if (!user.emailVerified) {
        clearAuthSession();
        setError('Please verify your email before signing in.');
        return null;
      }
      setState({
        isInitialized: true,
        isAuthenticated: true,
        user,
        step: 'success',
        error: null,
      });
      return user;
    } catch (error) {
      clearAuthSession();
      setError(errorMessage(error, 'Authentication failed. Please try again.'));
      return null;
    }
  }, [setError, setStep]);

  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
  ): Promise<RegistrationResult | null> => {
    setStep('loading');
    try {
      const { firstName, lastName } = splitName(name);
      const result = await authApi.register({ email, password, firstName, lastName });
      setState({
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        step: 'success',
        error: null,
      });
      return result;
    } catch (error) {
      setError(errorMessage(error, 'Registration failed. Please try again.'));
      return null;
    }
  }, [setError, setStep]);

  const forgotPassword = useCallback(async (email: string): Promise<boolean> => {
    setStep('loading');
    try {
      await authApi.forgotPassword(email);
      setState((previous) => ({ ...previous, step: 'success', error: null }));
      return true;
    } catch (error) {
      setError(errorMessage(error, 'Password reset request failed.'));
      return false;
    }
  }, [setError, setStep]);

  const resetPassword = useCallback(async (token: string, password: string): Promise<boolean> => {
    setStep('loading');
    try {
      await authApi.resetPassword(token, password);
      setState((previous) => ({ ...previous, step: 'success', error: null }));
      return true;
    } catch (error) {
      setError(errorMessage(error, 'Password reset failed. Please request a new reset link.'));
      return false;
    }
  }, [setError, setStep]);

  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    setStep('loading');
    try {
      await authApi.verifyEmail(token);
      setState({
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        step: 'success',
        error: null,
      });
      return true;
    } catch (error) {
      setError(errorMessage(error, 'Verification failed. The link may be invalid or expired.'));
      return false;
    }
  }, [setError, setStep]);

  const resendVerificationEmail = useCallback(async (email: string): Promise<boolean> => {
    setStep('loading');
    try {
      await authApi.resendVerificationEmail(email);
      setState((previous) => ({ ...previous, step: 'success', error: null }));
      return true;
    } catch (error) {
      setError(errorMessage(error, 'Unable to resend the verification email.'));
      return false;
    }
  }, [setError, setStep]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // The local session is always cleared, even when the server session has expired.
    } finally {
      clearAuthSession();
      setState({
        ...INITIAL_AUTH_STATE,
        isInitialized: true,
        step: 'idle',
      });
    }
  }, []);

  const resetStep = useCallback(() => {
    setState((previous) => ({ ...previous, step: 'idle', error: null }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
        resetStep,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
