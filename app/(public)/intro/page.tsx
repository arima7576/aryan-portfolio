// ─── Arima Universe — Cinematic Intro Page ───
// 🎬 The cinematic introduction to the Arima universe.

'use client';

import { motion } from 'framer-motion';
import { AnimatedButton, PageTransition, BackgroundEffects } from '@/components/shared';
import { cinematicReveal } from '@/animations/framer';

export default function IntroPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <BackgroundEffects />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          variants={cinematicReveal}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            The Arima
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-white">
              Cinematic Experience
            </span>
          </h1>

          <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
            A journey through quantitative intelligence, algorithmic engineering, and portfolio science.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton variant="primary" size="lg" href="/watch-intro">
              Watch Full Introduction
            </AnimatedButton>
            <AnimatedButton variant="secondary" size="lg" href="/choose-door">
              Skip to Doors
            </AnimatedButton>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

// TODO: Implement auto-play cinematic sequence
// TODO: Add chapter progression system