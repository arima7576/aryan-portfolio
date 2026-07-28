// ─── Arima Universe — Forgot Password ───
// 🔑 Cinematic password reset — Headquarters visual language

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/providers';

export default function ForgotPasswordPage() {
  const { forgotPassword, step, error, resetStep } = useAuth();
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email address';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetStep();
    if (!validate()) return;
    const sent = await forgotPassword(email);
    if (sent) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout title="Check Your Email" subtitle="Reset link sent">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-12 h-[1px] bg-blue-400/30 mx-auto" />
          <p className="text-[10px] font-mono text-white/30 leading-relaxed">
            If an account with {email} exists, you will receive a password reset link shortly.
          </p>
          <Link
            href="/login"
            className="inline-block text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
          >
            Return to login
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border border-red-500/20 px-4 py-3"
          >
            <p className="text-[10px] font-mono text-red-400/80">{error}</p>
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={step === 'loading'}
          className="group relative w-full py-3.5 mt-2"
        >
          <div className="absolute inset-0 border border-white/20 group-hover:border-blue-400/50 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative text-white/70 group-hover:text-white text-sm tracking-[0.2em] uppercase font-light">
            {step === 'loading' ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-3 h-[1px] bg-blue-400/50 animate-pulse" />
                Sending...
                <span className="w-3 h-[1px] bg-blue-400/50 animate-pulse" />
              </span>
            ) : (
              'Send Reset Link'
            )}
          </span>
        </button>

        {/* Back */}
        <div className="text-center">
          <Link href="/login" className="text-[9px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-wider">
            ← Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
