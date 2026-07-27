// ─── Arima Universe — Verify Email ───
// ✅ Cinematic email verification — Headquarters visual language

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/providers';

export default function VerifyEmailPage() {
  const { verifyEmail, step, error, resetStep } = useAuth();
  const [code, setCode] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isVerified, setIsVerified] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!code.trim()) errors.code = 'Verification code is required';
    else if (code.length < 4) errors.code = 'Invalid verification code';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetStep();
    if (!validate()) return;
    await verifyEmail(code);
    if (step === 'success') {
      setIsVerified(true);
    }
  };

  if (isVerified) {
    return (
      <AuthLayout title="Email Verified" subtitle="Your account is active">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-12 h-[1px] bg-blue-400/30 mx-auto" />
          <p className="text-[10px] font-mono text-white/30 leading-relaxed">
            Your email has been verified. You can now access all Arima Finance features.
          </p>
          <Link
            href="/dashboard"
            className="inline-block text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
          >
            Go to Dashboard →
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Verify Email" subtitle="Enter the verification code sent to your email">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Code */}
        <div>
          <label htmlFor="code" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm text-center tracking-[0.3em] font-mono focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="000000"
            maxLength={6}
          />
          {validationErrors.code && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80 text-center">
              {validationErrors.code}
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
                Verifying...
                <span className="w-3 h-[1px] bg-blue-400/50 animate-pulse" />
              </span>
            ) : (
              'Verify Email'
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