// ─── Arima Universe — Animated Button Component ───
// 🔘 Reusable button with hover, loading, and variant states.

'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { AnimatedButtonProps } from '@/types';

const baseStyles =
  'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30';

const variantStyles = {
  primary:
    'bg-white text-black hover:bg-white/90 active:scale-[0.98]',
  secondary:
    'border border-white/20 text-white hover:bg-white/10 active:scale-[0.98]',
  ghost:
    'text-white/60 hover:text-white hover:bg-white/5',
  door:
    'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white hover:border-white/30 hover:from-white/15 hover:to-white/10 backdrop-blur-sm',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className,
      href,
    },
    ref
  ) => {
    const content = (
      <motion.span
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        whileHover={!disabled ? { scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </motion.span>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className="inline-block">
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} onClick={onClick} disabled={disabled || loading} type="button">
        {content}
      </button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';