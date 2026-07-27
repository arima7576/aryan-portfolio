'use client';

import { motion } from 'framer-motion';

interface BreathingLightProps {
  color?: string;
  size?: string;
  intensity?: number;
  className?: string;
  pulseDuration?: number;
}

export function BreathingLight({
  color = 'rgba(100, 180, 255, 0.15)',
  size = '60vmin',
  intensity = 1,
  className = '',
  pulseDuration = 6,
}: BreathingLightProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
      }}
      animate={{
        opacity: [0.15 * intensity, 0.4 * intensity, 0.15 * intensity],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: pulseDuration,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    />
  );
}