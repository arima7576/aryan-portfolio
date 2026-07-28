// ─── Arima Universe — Verify Email ───
// ✅ Cinematic email verification — Headquarters visual language

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/providers';

const queryValue = (name: string) => (
  typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get(name) ?? ''
);

export default function VerifyEmailPage() {
  const { verifyEmail, resendVerificationEmail, step, error, resetStep } = useAuth();
  const [token, setToken] = useState(() => queryValue('token'));
  const [email, setEmail] = useState(() => queryValue('email'));
  const [purpose] = useState<'verification' | 'email_change'>(() => (
    queryValue('purpose') === 'email_change' ? 'email_change' : 'verification'
  ));
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isVerified, setIsVerified] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  const validateToken = () => {
    if (token.trim()) return true;
    setValidationErrors((previous) => ({ ...previous, token: 'Verification token is required' }));
    return false;
  };

  const validateEmail = () => {
    if (/\S+@\S+\.\S+/.test(email)) return true;
    setValidationErrors((previous) => ({ ...previous, email: 'Enter a valid email address' }));
    return false;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    resetStep();
    setValidationErrors({});
    if (!validateToken()) return;
    const verified = await verifyEmail(token.trim(), purpose);
    if (verified) setIsVerified(true);
  };

  const handleResend = async () => {
    resetStep();
    setValidationErrors({});
    if (!validateEmail()) return;
    const sent = await resendVerificationEmail(email.trim());
    if (sent) setResendSent(true);
  };

  if (isVerified) {
    return (
      <AuthLayout
        title={purpose === 'email_change' ? 'Email Updated' : 'Email Verified'}
        subtitle={purpose === 'email_change' ? 'Your new email is confirmed' : 'Your account is ready'}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-12 h-[1px] bg-blue-400/30 mx-auto" />
          <p className="text-[10px] font-mono text-white/30 leading-relaxed">
            {purpose === 'email_change'
              ? 'Your new email address is confirmed. Sign in again to protect your private Arima workspace.'
              : 'Your email has been verified. Sign in to enter your private Arima workspace.'}
          </p>
          <Link
            href="/login"
            className="inline-block text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
          >
            Continue to sign in →
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={purpose === 'email_change' ? 'Confirm Email Change' : 'Verify Email'}
      subtitle={purpose === 'email_change' ? 'Enter the confirmation token from your email' : 'Enter the verification token from your email'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="you@example.com"
          />
          {validationErrors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.email}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="token" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Verification Token
          </label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm text-center tracking-[0.12em] font-mono focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="Paste your verification token"
          />
          {validationErrors.token && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80 text-center">
              {validationErrors.token}
            </motion.p>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border border-red-500/20 px-4 py-3"
          >
            <p className="text-[10px] font-mono text-red-400/80">{error}</p>
          </motion.div>
        )}

        {resendSent && (
          <p className="text-[10px] font-mono text-blue-300/70 text-center">
            A new verification email has been sent if the account exists.
          </p>
        )}

        <button
          type="submit"
          disabled={step === 'loading'}
          className="group relative w-full py-3.5 mt-2"
        >
          <div className="absolute inset-0 border border-white/20 group-hover:border-blue-400/50 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative text-white/70 group-hover:text-white text-sm tracking-[0.2em] uppercase font-light">
            {step === 'loading'
              ? 'Confirming...'
              : purpose === 'email_change'
                ? 'Confirm Email Change'
                : 'Verify Email'}
          </span>
        </button>

        {purpose === 'verification' && <button
          type="button"
          onClick={() => void handleResend()}
          disabled={step === 'loading'}
          className="block w-full text-[9px] font-mono text-white/25 hover:text-white/55 disabled:cursor-not-allowed disabled:opacity-50 transition-colors tracking-wider"
        >
          Resend verification email
        </button>}

        <div className="text-center">
          <Link href="/login" className="text-[9px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-wider">
            ← Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
