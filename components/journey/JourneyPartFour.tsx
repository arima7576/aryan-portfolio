'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { JOURNEY_EASE } from './config';
import type { JourneyPartHandle } from './types';

export const JourneyPartFour = forwardRef<JourneyPartHandle>(function JourneyPartFour(_, ref) {
  const root = useRef<HTMLDivElement>(null); const portal = useRef<HTMLDivElement>(null); const router = useRouter();
  useImperativeHandle(ref, () => ({ addToTimeline(timeline, start) { timeline.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 10 }, start).fromTo(portal.current, { scale: .7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 26, ease: JOURNEY_EASE.enter }, start + 12); }}), []);
  return <section ref={root} className="journey-part journey-part-four" aria-label="Portfolio Lab transition"><div ref={portal} className="journey-product-portal"><span>AF</span><p>ARIMA PORTFOLIO LAB</p><h2>Continue into a live intelligence workspace.</h2><small>Sample portfolio data is available for the complete product journey.</small><div><button onClick={() => router.push('/login')}>Enter securely</button><button onClick={() => router.push('/portfolio-lab')}>Explore Portfolio Lab</button></div></div></section>;
});
