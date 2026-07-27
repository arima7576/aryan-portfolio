'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface MonumentalDoorProps {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  accentColor: string;
  index: number;
  className?: string;
}

export function MonumentalDoor({ id, title, subtitle, path, accentColor, index, className = '' }: MonumentalDoorProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Door frame glow
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, `${accentColor}00`);
      grad.addColorStop(0.1, `${accentColor}15`);
      grad.addColorStop(0.5, `${accentColor}08`);
      grad.addColorStop(0.9, `${accentColor}15`);
      grad.addColorStop(1, `${accentColor}00`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vertical energy lines
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3);
        const pulse = Math.sin(time * 2 + i) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `${accentColor}${Math.floor(8 + pulse * 12).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Fire/plasma particles at base
      if (isHovered.current || Math.random() > 0.7) {
        particles.push({
          x: canvas.width * (0.2 + Math.random() * 0.6),
          y: canvas.height - 5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(0.5 + Math.random() * 1.5),
          life: 1,
          size: 1 + Math.random() * 3,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.life -= 0.01;

        // Clamp radius to prevent IndexSizeError from negative/NaN/Infinity values
        const rawRadius = p.size * p.life;
        const safeRadius = Number.isFinite(rawRadius)
          ? Math.max(0.01, Math.abs(rawRadius))
          : 0.01;

        ctx.beginPath();
        ctx.arc(p.x, p.y, safeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${accentColor}${Math.floor(Math.max(0, Math.min(1, p.life)) * 40).toString(16).padStart(2, '0')}`;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      }

      // Horizontal threshold glow
      const thresholdGlow = Math.sin(time * 1.5) * 0.3 + 0.3;
      const grad2 = ctx.createLinearGradient(0, canvas.height - 10, 0, canvas.height);
      grad2.addColorStop(0, `${accentColor}00`);
      grad2.addColorStop(0.5, `${accentColor}${Math.floor(thresholdGlow * 20).toString(16).padStart(2, '0')}`);
      grad2.addColorStop(1, `${accentColor}${Math.floor(thresholdGlow * 10).toString(16).padStart(2, '0')}`);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [accentColor]);

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      onClick={() => router.push(path)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(path); }}
      tabIndex={0}
      role="button"
      aria-label={`Enter ${title}`}
    >
      {/* Door canvas overlay */}
      <canvas
        ref={canvasRef}
        width={300}
        height={400}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Door structure */}
      <div
        className="relative overflow-hidden"
        style={{
          border: `1px solid ${accentColor}25`,
          background: `linear-gradient(180deg, ${accentColor}08, #000 40%, ${accentColor}05)`,
          boxShadow: `0 0 40px ${accentColor}08, inset 0 0 60px ${accentColor}05`,
        }}
      >
        {/* Door top arch */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
        />

        {/* Door number */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[8px] font-mono tracking-[0.3em]" style={{ color: `${accentColor}50` }}>
            PORTAL 0{index + 1}
          </span>
        </div>

        {/* Content area */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[280px] px-8 py-16">
          {/* Door emblem */}
          <motion.div
            className="w-16 h-16 mb-6 flex items-center justify-center"
            style={{
              border: `1px solid ${accentColor}30`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${accentColor}15, transparent)`,
            }}
            animate={{ boxShadow: [`0 0 20px ${accentColor}10`, `0 0 40px ${accentColor}20`, `0 0 20px ${accentColor}10`] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-lg font-light" style={{ color: `${accentColor}AA` }}>
              {id === 'investment-banking' ? '01' : id === 'projects' ? '02' : '03'}
            </span>
          </motion.div>

          <h3 className="text-base font-light tracking-[0.15em] text-center mb-2" style={{ color: `${accentColor}CC` }}>
            {title}
          </h3>
          <p className="text-[9px] font-mono tracking-[0.1em] text-center max-w-[200px]" style={{ color: `${accentColor}50` }}>
            {subtitle}
          </p>
        </div>

        {/* Threshold light */}
        <motion.div
          className="absolute bottom-0 left-[10%] right-[10%] h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5 + index, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floor reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 opacity-30"
          style={{
            background: `linear-gradient(180deg, ${accentColor}10, transparent)`,
            filter: 'blur(4px)',
          }}
        />
      </div>
    </motion.div>
  );
}