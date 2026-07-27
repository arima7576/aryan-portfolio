'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DOOR_THEMES } from '@/config';
import type { DoorTheme } from '@/types';

export function UniverseHall({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [opening, setOpening] = useState<string | null>(null);
  const enter = (door: DoorTheme) => {
    if (opening) return;
    setOpening(door.id);
    window.setTimeout(() => router.push(door.path), reduceMotion ? 0 : 1250);
  };
  return <section className={`hall-world ${embedded ? 'hall-world--embedded' : ''} ${opening ? 'hall-is-opening' : ''}`} aria-label="Arima headquarters central hall">
    <div className="hall-ceiling" aria-hidden="true" /><div className="hall-lightwell" aria-hidden="true" />
    <div className="hall-pillars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><div className="hall-floor" aria-hidden="true" /><div className="hall-reflection" aria-hidden="true" />
    <header className="hall-header"><span>ARIMA HEADQUARTERS</span><p>Central hall / access protocol</p></header>
    <div className="hall-content"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="hall-intro"><span>THE OPERATING HEART</span><h1>Choose a world.</h1><p>Three distinct missions. One intelligence architecture.</p></motion.div>
      <div className="gateway-row">{DOOR_THEMES.map((door, index) => <Gateway key={door.id} door={door} index={index} opening={opening === door.id} dimmed={Boolean(opening && opening !== door.id)} onEnter={() => enter(door)} />)}</div>
    </div><p className="hall-prompt">APPROACH A THRESHOLD TO ENTER</p>
  </section>;
}

function Gateway({ door, index, opening, dimmed, onEnter }: { door: DoorTheme; index: number; opening: boolean; dimmed: boolean; onEnter: () => void }) {
  return <motion.button className={`gateway ${opening ? 'is-opening' : ''} ${dimmed ? 'is-dimmed' : ''}`} style={{ '--accent': door.accentColor } as React.CSSProperties} initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35 + index * 0.14, ease: [0.16, 1, 0.3, 1] }} onClick={onEnter} aria-label={`Enter ${door.label}`}>
    <span className="gateway-shadow" /><span className="gateway-plinth" /><span className="gateway-arch"><span className="gateway-frame" /><span className="gateway-void"><i /><i /><i /></span><span className="gateway-leaf gateway-left" /><span className="gateway-leaf gateway-right" /><span className="gateway-light" /></span>
    <span className="gateway-meta"><small>GATEWAY / {door.doorNumber}</small><strong>{door.label}</strong><em>{door.subtitle}</em></span><span className="gateway-description">{door.description}</span>
  </motion.button>;
}
