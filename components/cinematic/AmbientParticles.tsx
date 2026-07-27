'use client';

import { useEffect, useRef } from 'react';

interface AmbientParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export function AmbientParticles({ count = 60, color = 'rgba(100, 180, 255,', speed = 1, className = '' }: AmbientParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const size = 1 + Math.random() * 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 8 + Math.random() * 16 / speed;
      const delay = Math.random() * 10;
      const driftX = (Math.random() - 0.5) * 40;
      const driftY = (Math.random() - 0.5) * 40;

      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color} ${0.1 + Math.random() * 0.3});
        box-shadow: 0 0 ${size * 3}px ${color} ${0.05 + Math.random() * 0.1});
        pointer-events: none;
        animation: ambientDrift ${duration}s ease-in-out ${delay}s infinite;
        --drift-x: ${driftX}px;
        --drift-y: ${driftY}px;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [count, color, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}