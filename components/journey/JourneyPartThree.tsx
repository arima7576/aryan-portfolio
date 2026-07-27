'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DIVISIONS, JOURNEY_EASE } from './config';
import type { JourneyPartHandle } from './types';

export const JourneyPartThree = forwardRef<JourneyPartHandle>(function JourneyPartThree(_, ref) {
  const root = useRef<HTMLDivElement>(null); const modules = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ addToTimeline(timeline, start) { timeline.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 10 }, start).fromTo(modules.current, { y: 52, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 24, ease: JOURNEY_EASE.enter }, start + 12).to(modules.current, { y: -10, duration: 38, ease: JOURNEY_EASE.drift }, start + 42).to(root.current, { autoAlpha: 0, duration: 12, ease: JOURNEY_EASE.exit }, start + 88); }}), []);
  return <section ref={root} className="journey-part journey-part-three" aria-label="Arima Universe divisions"><div className="journey-universe-title"><span>ARIMA UNIVERSE</span><h2>One intelligence architecture.<br/>Three operating divisions.</h2></div><div ref={modules} className="journey-division-grid">{DIVISIONS.map((division) => <article key={division.index}><span>{division.index}</span><small>{division.lead}</small><h3>{division.title}</h3><ul>{division.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="journey-disclosure">AF Portfolio Lab is a founder-funded research environment. It does not represent externally managed client assets.</p></section>;
});
