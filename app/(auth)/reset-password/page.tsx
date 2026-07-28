// ─── Arima Universe — Reset Password ───

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/providers';

const resetToken = () => (
  typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('token') ?? ''
);

export default function ResetPasswordPage() {
  const { resetPassword, step, error, resetStep } = useAuth();
  const [token] = useState(resetToken);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isReset, setIsReset] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!token.trim()) errors.token = 'This reset link is missing a token';
    if (!password) errors.password = 'Password is required';
    else if (
      password.length < 12
      || !/[a-z]/.test(password)
      || !/[A-Z]/.test(password)
      || !/\d/.test(password)
      || !/[^A-Za-z0-9]/.test(password)
    ) errors.password = 'Use 12+ characters with upper/lowercase, a number, and a symbol';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    resetStep();
    if (!validate()) return;
    const reset = await resetPassword(token.trim(), password);
    if (reset) setIsReset(true);
  };

  if (isReset) {
    return (
      <AuthLayout title="Password Updated" subtitle="Your account is secure">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-12 h-[1px] bg-blue-400/30 mx-auto" />
          <p className="text-[10px] font-mono text-white/30 leading-relaxed">
            Your password has been reset. Sign in with your new password to continue.
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
    <AuthLayout title="Choose a New Password" subtitle="Use a strong, unique password for your account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" value={token} readOnly />
        {validationErrors.token && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border border-red-500/20 px-4 py-3"
          >
            <p className="text-[10px] font-mono text-red-400/80">{validationErrors.token}</p>
          </motion.div>
        )}

        <div>
          <label htmlFor="password" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 pr-12 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-mono text-white/20 hover:text-white/50 transition-colors uppercase"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {validationErrors.password && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.password}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="••••••••"
          />
          {validationErrors.confirmPassword && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.confirmPassword}
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

        <button
          type="submit"
          disabled={step === 'loading'}
          className="group relative w-full py-3.5 mt-2"
        >
          <div className="absolute inset-0 border border-white/20 group-hover:border-blue-400/50 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative text-white/70 group-hover:text-white text-sm tracking-[0.2em] uppercase font-light">
            {step === 'loading' ? 'Updating...' : 'Update Password'}
          </span>
        </button>

        <div className="text-center">
          <Link href="/forgot-password" className="text-[9px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-wider">
            Request a new reset link
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
