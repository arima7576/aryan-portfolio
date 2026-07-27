'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ArimaOSCoreProps {
  className?: string;
}

export function ArimaOSCore({ className = '' }: ArimaOSCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let angle = 0;
    const rings = 3;
    const particles: { angle: number; radius: number; speed: number; size: number; opacity: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * 60,
        speed: 0.2 + Math.random() * 0.4,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.005;

      // Outer rings
      for (let r = 0; r < rings; r++) {
        const radius = 30 + r * 22;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 180, 255, ${0.06 + r * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Ring data nodes
        for (let i = 0; i < 8; i++) {
          const a = angle + (i / 8) * Math.PI * 2 + r * 0.3;
          const x = centerX + Math.cos(a) * radius;
          const y = centerY + Math.sin(a) * radius;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140, 210, 255, ${0.3 + r * 0.1})`;
          ctx.fill();
        }
      }

      // Orbiting particles
      particles.forEach((p) => {
        p.angle += p.speed * 0.01;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 220, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Central glow
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      grad.addColorStop(0, 'rgba(160, 220, 255, 0.12)');
      grad.addColorStop(0.3, 'rgba(100, 180, 255, 0.06)');
      grad.addColorStop(1, 'rgba(100, 180, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fill();

      // Center mark
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180, 230, 255, 0.8)';
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} width={180} height={180} className="absolute" />
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
        <span className="text-[7px] font-mono tracking-[0.35em] text-blue-400/40">ARIMA</span>
        <span className="text-[10px] font-mono tracking-[0.3em] text-blue-300/60 font-bold">OS</span>
        <span className="text-[6px] font-mono tracking-[0.2em] text-blue-400/20 mt-1">CORE ACTIVE</span>
      </motion.div>
    </div>
  );
}