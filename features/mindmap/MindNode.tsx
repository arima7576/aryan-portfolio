// ─── Arima Universe — Mind Map Node ───
// 📍 Individual node in the cinematic mind map

'use client';

import { motion } from 'framer-motion';
import type { MindNode } from '@/types';

interface MindNodeComponentProps {
  node: MindNode;
  onClick?: () => void;
  delay?: number;
}

export function MindNodeComponent({ node, onClick, delay = 0 }: MindNodeComponentProps) {
  const sizeMap = { root: 120, branch: 70, leaf: 50 } as const;
  const size = sizeMap[node.type];
  const color = node.color || '#69c8ff';

  const isRoot = node.type === 'root';
  const isBranch = node.type === 'branch';

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: node.x - size / 2,
        top: node.y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      onClick={onClick}
    >
      {/* Node visual */}
      <div
        className={`w-full h-full flex items-center justify-center ${
          isRoot ? 'rounded-full' : isBranch ? 'rounded-[4px]' : 'rounded-full'
        }`}
        style={{
          border: `1px solid ${color}44`,
          background: `radial-gradient(circle at 50% 50%, ${color}11, transparent)`,
          boxShadow: `0 0 20px ${color}22, inset 0 0 20px ${color}11`,
        }}
      >
        <span
          className="text-center font-mono select-none"
          style={{
            color,
            fontSize: isRoot ? 11 : isBranch ? 8 : 6,
            letterSpacing: isRoot ? '0.2em' : '0.1em',
            fontWeight: isRoot ? 700 : 500,
            textShadow: `0 0 10px ${color}66`,
            lineHeight: 1.2,
            padding: 4,
          }}
        >
          {node.label}
        </span>
      </div>

      {/* Glow effect for root */}
      {isRoot && (
        <div
          className="absolute inset-[-20px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color}11, transparent 70%)`,
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      )}
    </motion.div>
  );
}