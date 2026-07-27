'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ensureAnimationPlugins, gsap, ScrollTrigger } from '@/lib/animation-runtime';
import { JOURNEY_TIMING } from './config';
import type { JourneyPartHandle } from './types';
import { JourneyPartOne } from './JourneyPartOne';
import { JourneyPartTwo } from './JourneyPartTwo';
import { JourneyPartThree } from './JourneyPartThree';
import { JourneyPartFour } from './JourneyPartFour';

export function JourneyController() {
  const root = useRef<HTMLElement>(null);
  const first = useRef<JourneyPartHandle>(null);
  const second = useRef<JourneyPartHandle>(null);
  const third = useRef<JourneyPartHandle>(null);
  const fourth = useRef<JourneyPartHandle>(null);
  const [debug, setDebug] = useState({ part: 1, progress: 0, start: 0, end: 0 });

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !ensureAnimationPlugins()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('journey-reduced');
      return;
    }
    const distance = window.innerWidth < 768 ? JOURNEY_TIMING.mobileDistance : JOURNEY_TIMING.desktopDistance;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { immediateRender: false },
        scrollTrigger: {
          trigger: element, start: 'top top', end: `+=${distance}`, scrub: 1,
          pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (process.env.NODE_ENV === 'development') setDebug({ part: Math.min(4, Math.floor(self.progress * 4) + 1), progress: self.progress, start: self.start, end: self.end });
          },
        },
      });
      [first, second, third, fourth].forEach((part, index) => {
        timeline.addLabel(`journey-part-${index + 1}`, index * JOURNEY_TIMING.partDuration);
        part.current?.addToTimeline(timeline, index * JOURNEY_TIMING.partDuration);
      });
      timeline.duration(JOURNEY_TIMING.partDuration * 4);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh, { once: true });
      document.fonts?.ready.then(refresh);
      requestAnimationFrame(refresh);
      return () => window.removeEventListener('load', refresh);
    }, element);
    return () => context.revert();
  }, []);

  return <section ref={root} className="journey-controller"><JourneyPartOne ref={first}/><JourneyPartTwo ref={second}/><JourneyPartThree ref={third}/><JourneyPartFour ref={fourth}/>{process.env.NODE_ENV === 'development' && <output className="journey-debug" aria-live="polite">PART {debug.part}/4 · {Math.round(debug.progress * 100)}% · {Math.round(debug.start)}–{Math.round(debug.end)}</output>}</section>;
}
