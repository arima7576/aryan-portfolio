// ─── Arima Universe — Hero Component ───
// 🏛️ Full-viewport hero with cinematic entrance.

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { createHeroTimeline } from '@/animations/gsap';
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/framer';
import { BackgroundEffects } from '@/components/shared/BackgroundEffects';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  gradient?: string;
  align?: 'center' | 'left';
}

export function Hero({
  title,
  subtitle,
  children,
  className,
  gradient = 'from-black via-zinc-950 to-black',
  align = 'center',
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelinePlayed = useRef(false);

  useEffect(() => {
    if (heroRef.current && !timelinePlayed.current) {
      const tl = createHeroTimeline(heroRef.current);
      tl.play();
      timelinePlayed.current = true;
      return () => { tl.kill(); };
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b',
        gradient,
        className
      )}
    >
      <BackgroundEffects />

      <motion.div
        className={cn(
          'relative z-10 max-w-4xl px-6',
          align === 'center' ? 'text-center' : 'text-left'
        )}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <motion.p
            data-animate="subtitle"
            variants={staggerItem}
            className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div data-animate="cta" variants={staggerItem} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="block w-5 h-8 border-2 border-white/20 rounded-full relative">
          <span className="block w-1 h-2 bg-white/40 rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
        </span>
      </motion.div>
    </section>
  );
}