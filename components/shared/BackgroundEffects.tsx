// ─── Arima Universe — Background Effects ───
// ✨ Layered visual effects for immersive backgrounds.

'use client';

import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  mouseGlow?: boolean;
  noise?: boolean;
  gradient?: boolean;
}

export function BackgroundEffects({
  mouseGlow = true,
  noise = true,
  gradient = true,
}: BackgroundEffectsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Layer */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
      )}

      {/* Noise Layer */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      )}

      {/* Mouse Glow Layer */}
      {mouseGlow && <MouseGlow />}
    </div>
  );
}

function MouseGlow() {
  return (
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 60%)',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
      }}
    />
  );
}

// TODO: Add particle system layer for interactive background