'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { INSTITUTIONS, JOURNEY_EASE } from './config';
import type { JourneyPartHandle } from './types';

export const JourneyPartTwo = forwardRef<JourneyPartHandle>(function JourneyPartTwo(_, ref) {
  const root = useRef<HTMLDivElement>(null); const towers = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ addToTimeline(timeline, start) { timeline.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 10 }, start).fromTo(towers.current, { scale: .86, y: 48 }, { scale: 1, y: 0, duration: 34, ease: JOURNEY_EASE.enter }, start + 6).to(towers.current, { y: -20, duration: 42, ease: JOURNEY_EASE.drift }, start + 40).to(root.current, { autoAlpha: 0, duration: 12, ease: JOURNEY_EASE.exit }, start + 88); }}), []);
  return <section ref={root} className="journey-part journey-part-two" aria-label="Financial institution landscape"><div ref={towers} className="journey-towers"><header><span>GLOBAL FINANCIAL LANDSCAPE</span><h2>Signals across the institution.</h2></header><div className="journey-tower-grid">{INSTITUTIONS.map((name, index) => <article key={name}><i/><strong>{name}</strong><small>{['LIQUIDITY', 'CAPITAL', 'RESEARCH'][index % 3]} · MARKET SYSTEMS</small></article>)}</div><p>Institution names illustrate the financial landscape only. No affiliation is implied.</p></div></section>;
});
