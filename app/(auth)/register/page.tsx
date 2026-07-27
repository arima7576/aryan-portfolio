// ─── Arima Universe — Register ───
// 📝 Cinematic registration — Headquarters visual language

'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/providers';

export default function RegisterPage() {
  const router = useRouter();
  const { register, step, error, resetStep } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 8) errors.password = 'Minimum 8 characters';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!acceptTerms) errors.terms = 'You must accept the terms';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetStep();
    if (!validate()) return;
    setHasSubmitted(true);
    await register(name, email, password);
  };

  // After successful registration, redirect based on selectedDivision
  useEffect(() => {
    if (step === 'success' && hasSubmitted) {
      const stored = sessionStorage.getItem('selectedDivision');
      if (stored) {
        sessionStorage.removeItem('selectedDivision');
        router.push(stored === 'investment-banking' ? '/investment-banking' : stored === 'projects' ? '/projects' : '/portfolio-lab');
      } else {
        router.push('/verify-email');
      }
    }
  }, [step, router, hasSubmitted]);

  return (
    <AuthLayout title="Create Account" subtitle="Begin your Arima journey">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="Your name"
          />
          {validationErrors.name && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.name}
            </motion.p>
          )}
        </div>

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
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="you@example.com"
          />
          {validationErrors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.email}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 pr-12 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-all duration-300 placeholder:text-white/10"
            placeholder="••••••••"
          />
          {validationErrors.confirmPassword && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-[10px] font-mono text-red-400/80">
              {validationErrors.confirmPassword}
            </motion.p>
          )}
        </div>

        {/* Accept terms */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-3.5 h-3.5 bg-transparent border border-white/20 rounded-none appearance-none checked:bg-blue-500/30 checked:border-blue-400/50 transition-all duration-300 cursor-pointer"
          />
          <span className="text-[9px] font-mono text-white/20 group-hover:text-white/40 transition-colors tracking-wider">
            I accept the terms and conditions
          </span>
        </label>
        {validationErrors.terms && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono text-red-400/80">
            {validationErrors.terms}
          </motion.p>
        )}

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
                Creating account...
                <span className="w-3 h-[1px] bg-blue-400/50 animate-pulse" />
              </span>
            ) : (
              'Create Account'
            )}
          </span>
        </button>

        {/* Links */}
        <p className="text-center text-[9px] font-mono text-white/10">
          Already have an account?{' '}
          <Link href="/login" className="text-white/30 hover:text-white/60 transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}