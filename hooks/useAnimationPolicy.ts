'use client';

import { useEffect, useMemo, useState } from 'react';
import { prefersConstrainedAnimation, resolveAnimationPolicy } from '@/utils/animation-policy';
import type { AnimationPolicy } from '@/types/experience';

type Signals = {
  reducedMotion: boolean;
  mobile: boolean;
  hidden: boolean;
  lowPower: boolean;
};

const initialSignals: Signals = {
  reducedMotion: false,
  mobile: false,
  hidden: false,
  lowPower: false,
};

export function useAnimationPolicy(forceReducedMotion = false): AnimationPolicy {
  const [signals, setSignals] = useState<Signals>(initialSignals);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 720px)');
    const update = () => setSignals({
      reducedMotion: motionQuery.matches,
      mobile: mobileQuery.matches,
      hidden: document.visibilityState !== 'visible',
      lowPower: prefersConstrainedAnimation(),
    });
    update();
    motionQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return useMemo(() => resolveAnimationPolicy({
    ...signals,
    reducedMotion: forceReducedMotion || signals.reducedMotion,
  }), [forceReducedMotion, signals]);
}
