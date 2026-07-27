// ─── Arima Universe — Framer Motion Variants ───
// 🎭 All motion variants are centralized here.

import type { Variants } from 'framer-motion';

// ─── Fade ───
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: 15, transition: { duration: 0.3, ease: 'easeIn' } },
};

// ─── Scale ───
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

// ─── Slide ───
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3, ease: 'easeIn' } },
};

// ─── Door ───
export const doorReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 25, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export const doorHover = {
  initial: { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  tap: { scale: 0.98 },
};

// ─── Glass Card ───
export const glassCardReveal: Variants = {
  hidden: { opacity: 0, y: 40, backdropFilter: 'blur(0px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

// ─── Stagger Children ───
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: 'easeOut',
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// ─── Page Transition ───
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } },
};

// ─── Cinematic ───
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: 'blur(12px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.8, ease: 'easeIn' } },
};

// ─── Mind Map ───
export const mindNodeAppear: Variants = {
  hidden: { opacity: 0, scale: 0, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, delay: i * 0.04, ease: 'backOut' },
  }),
  exit: { opacity: 0, scale: 0.8, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

// ─── Background ───
export const gradientPulse: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 10, repeat: Infinity, ease: 'linear' },
  },
};