// ─── Arima Universe — Navigation Component ───
// 🧭 Main navigation bar with theme-aware styling.

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/config';
import { cn } from '@/utils/cn';
import { fadeInDown, staggerContainer, staggerItem } from '@/animations/framer';
import type { NavVariant } from '@/types';

interface NavigationProps {
  variant?: NavVariant;
  className?: string;
}

export function Navigation({ variant = 'transparent', className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgClass = isScrolled
    ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
    : variant === 'dark'
      ? 'bg-black/40 backdrop-blur-md'
      : 'bg-transparent';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500',
        bgClass,
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="text-xl font-bold tracking-tight text-white">
            ARIMA<span className="text-amber-400">◈</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <motion.ul
          className="hidden md:flex items-center gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {NAV_LINKS.map((link) => (
            <motion.li key={link.href} variants={staggerItem}>
              <Link
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle navigation"
        >
          <motion.span
            className="w-6 h-[1.5px] bg-white block"
            animate={isMobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-[1.5px] bg-white block"
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-[1.5px] bg-white block"
            animate={isMobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            variants={fadeInDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.ul
              className="flex flex-col items-center gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={staggerItem}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl text-white/70 hover:text-white transition-colors tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// TODO: Add active link detection with pathname
// TODO: Implement scroll-based hide/show