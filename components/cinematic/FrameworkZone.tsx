'use client';

import { motion } from 'framer-motion';
import { BreathingLight } from './BreathingLight';

interface FrameworkZoneProps {
  title: string;
  index: number;
  accentColor: string;
  modules?: string[];
  className?: string;
}

export function FrameworkZone({ title, index, accentColor, modules = [], className = '' }: FrameworkZoneProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: index * 0.3 }}
    >
      {/* Zone ambient glow */}
      <BreathingLight
        color={`${accentColor}22`}
        size="100%"
        intensity={0.5}
        pulseDuration={5 + index}
      />

      {/* Zone boundary */}
      <div
        className="relative border-t border-l overflow-hidden"
        style={{
          borderColor: `${accentColor}18`,
          background: `linear-gradient(135deg, ${accentColor}08, transparent 60%)`,
        }}
      >
        {/* Zone header */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[7px] font-mono tracking-[0.3em]" style={{ color: `${accentColor}60` }}>
              ZONE 0{index + 1}
            </span>
            <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}30, transparent)` }} />
          </div>
          <h3 className="text-sm font-light tracking-[0.15em]" style={{ color: `${accentColor}CC` }}>
            {title}
          </h3>
        </div>

        {/* Zone modules */}
        <div className="px-6 pb-6 space-y-2">
          {modules.map((mod, i) => (
            <motion.div
              key={mod}
              className="flex items-center gap-2 py-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
            >
              <div className="w-[2px] h-3" style={{ background: `${accentColor}40` }} />
              <span className="text-[8px] font-mono tracking-[0.15em]" style={{ color: `${accentColor}50` }}>
                {mod}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Ambient data stream */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] overflow-hidden">
          <motion.div
            className="w-full"
            style={{ background: `linear-gradient(180deg, transparent, ${accentColor}30, transparent)` }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}