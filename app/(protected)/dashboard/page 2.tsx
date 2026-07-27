// ─── Arima Universe — Dashboard Placeholder ───
// 🖥️ Protected dashboard — placeholder for Arima OS.

'use client';

import { motion } from 'framer-motion';
import { PageTransition, BackgroundEffects } from '@/components/shared';
import { staggerContainer, staggerItem } from '@/animations/framer';

export default function DashboardPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen bg-black overflow-hidden py-24">
        <BackgroundEffects />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Arima <span className="text-amber-400">OS</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-white/40 text-lg"
            >
              Your command center is loading...
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {['Analytics', 'Portfolio', 'Research'].map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-white font-semibold mb-2">{item}</h3>
                <p className="text-white/30 text-sm">
                  {item === 'Analytics' && 'Real-time market analytics and performance metrics.'}
                  {item === 'Portfolio' && 'Portfolio construction, optimization, and risk management.'}
                  {item === 'Research' && 'Quantitative research tools and signal exploration.'}
                </p>
                <div className="mt-6 h-20 bg-white/5 rounded-lg flex items-center justify-center">
                  <span className="text-white/10 text-xs">Coming Soon</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* TODO: Implement full Arima OS interface */}
          {/* TODO: Add module navigation */}
          {/* TODO: Add user profile section */}
        </div>
      </section>
    </PageTransition>
  );
}