// ─── Arima Universe — Authentication Provider ───
// 🔐 Manages auth state, no backend connected — placeholder architecture only.

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthState, AuthStep, User } from '@/types';

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resetStep: () => void;
};

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  step: 'idle',
  error: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(INITIAL_AUTH_STATE);

  const setStep = useCallback((step: AuthStep) => {
    setState((prev) => ({ ...prev, step, error: step === 'loading' ? null : prev.error }));
  }, []);

  const setError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, step: 'error', error }));
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    setStep('loading');
    try {
      // TODO: Connect to authentication API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Placeholder: simulate login
      const mockUser: User = {
        id: 'usr_placeholder',
        email: _email,
        name: _email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      setState({ isAuthenticated: true, user: mockUser, step: 'success', error: null });
    } catch {
      setError('Authentication failed. Please try again.');
    }
  }, [setStep, setError]);

  const register = useCallback(async (_name: string, _email: string, _password: string) => {
    setStep('loading');
    try {
      // TODO: Connect to registration API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: 'usr_placeholder_new',
        email: _email,
        name: _name,
        createdAt: new Date().toISOString(),
      };
      setState({ isAuthenticated: true, user: mockUser, step: 'success', error: null });
    } catch {
      setError('Registration failed. Please try again.');
    }
  }, [setStep, setError]);

  const forgotPassword = useCallback(async (_email: string) => {
    setStep('loading');
    try {
      // TODO: Connect to password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState((prev) => ({ ...prev, step: 'success', error: null }));
    } catch {
      setError('Password reset request failed.');
    }
  }, [setStep, setError]);

  const verifyEmail = useCallback(async (_code: string) => {
    setStep('loading');
    try {
      // TODO: Connect to email verification API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState((prev) => ({ ...prev, step: 'success', error: null }));
    } catch {
      setError('Verification failed. Invalid or expired code.');
    }
  }, [setStep, setError]);

  const logout = useCallback(() => {
    setState(INITIAL_AUTH_STATE);
  }, []);

  const resetStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: 'idle', error: null }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        forgotPassword,
        verifyEmail,
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