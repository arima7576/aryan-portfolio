// ─── Arima Universe — Glass Card Component ───
// 🪟 Reusable glassmorphism card with intensity variants.

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { glassCardReveal } from '@/animations/framer';
import type { GlassCardProps } from '@/types';

const intensityStyles = {
  low: 'bg-white/[0.02] border-white/[0.05] backdrop-blur-sm',
  medium: 'bg-white/[0.04] border-white/[0.08] backdrop-blur-md',
  high: 'bg-white/[0.06] border-white/[0.12] backdrop-blur-xl',
};

export function GlassCard({
  children,
  className,
  intensity = 'medium',
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border p-6',
        intensityStyles[intensity],
        hoverEffect && 'hover:border-white/20 transition-all duration-500',
        className
      )}
      variants={glassCardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.3 } } : undefined}
    >
      <div data-animate="card-content">{children}</div>
    </motion.div>
  );
}