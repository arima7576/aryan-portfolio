// ─── Arima Universe — Authentication Layout ───
// 🔐 Shared layout for all auth pages (login, register, forgot password, verify email).

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackgroundEffects } from '@/components/shared';
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/framer';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthLayout({ children, title, subtitle, className }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <BackgroundEffects />

      <motion.div
        className={cn(
          'relative z-10 w-full max-w-md mx-auto px-6',
          className
        )}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={staggerItem} className="text-center mb-8">
          <Link href="/">
            <span className="text-2xl font-bold tracking-tight text-white">
              ARIMA<span className="text-amber-400">◈</span>
            </span>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={staggerItem}
          className="text-3xl font-bold text-white text-center mb-2"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p variants={staggerItem} className="text-sm text-white/40 text-center mb-8">
            {subtitle}
          </motion.p>
        )}

        {/* Form Container */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}