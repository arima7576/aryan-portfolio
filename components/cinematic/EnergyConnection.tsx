'use client';

import { useEffect, useRef } from 'react';

interface EnergyConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  pulseSpeed?: number;
  animated?: boolean;
  className?: string;
}

export function EnergyConnection({
  x1, y1, x2, y2,
  color = '#418cff',
  pulseSpeed = 1,
  animated = true,
  className = '',
}: EnergyConnectionProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = midX + dy * 0.15;
  const cy1 = midY - dx * 0.15;
  const cx2 = midX + dy * 0.15;
  const cy2 = midY - dx * 0.15;
  const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  useEffect(() => {
    if (!pathRef.current || !animated) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;
    pathRef.current.style.animation = `energyPulse ${3 / pulseSpeed}s ease-in-out infinite`;
  }, [animated, pulseSpeed]);

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ zIndex: 1 }}>
      <defs>
        <linearGradient id={`energy-grad-${x1}-${y1}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`energy-glow-${x1}-${y1}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.2"
        filter={`url(#energy-glow-${x1}-${y1})`}
      />
      {animated && (
        <circle r="2" fill={color} opacity="0.6" filter={`url(#energy-glow-${x1}-${y1})`}>
          <animateMotion dur={`${2.5 / pulseSpeed}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
    </svg>
  );
}