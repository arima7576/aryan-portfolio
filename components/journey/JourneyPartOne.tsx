'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { JourneyPartHandle } from './types';
import { JOURNEY_EASE } from './config';

export const JourneyPartOne = forwardRef<JourneyPartHandle>(function JourneyPartOne(_, ref) {
  const root = useRef<HTMLDivElement>(null);
  const corridor = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ addToTimeline(timeline, start) {
    timeline.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 8 }, start)
      .fromTo(corridor.current, { scale: .78, y: 36 }, { scale: 1, y: 0, duration: 30, ease: JOURNEY_EASE.enter }, start + 8)
      .to(corridor.current, { scale: 1.18, y: -18, duration: 42, ease: JOURNEY_EASE.drift }, start + 42)
      .to(root.current, { autoAlpha: 0, duration: 12, ease: JOURNEY_EASE.exit }, start + 88);
  }}), []);
  return <section ref={root} className="journey-part journey-part-one" aria-label="Arrival and institutional corridor"><div ref={corridor} className="journey-corridor"><i/><i/><i/><i/><div className="journey-corridor-copy"><span>ARIMA FINANCE / INSTITUTIONAL INTELLIGENCE</span><strong>Capital moves through structure.</strong><small>Research · Technology · Risk discipline</small></div></div></section>;
});
