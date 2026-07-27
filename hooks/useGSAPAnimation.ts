// ─── Arima Universe — GSAP Animation Hook ───
// 🎬 Provides a clean interface for playing GSAP timelines.

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

type AnimationTarget = string | Element | gsap.TweenTarget;

interface UseGSAPAnimationOptions {
  autoPlay?: boolean;
  onComplete?: () => void;
  dependencies?: unknown[];
}

export function useGSAPAnimation(
  timelineFactory: (target: AnimationTarget) => gsap.core.Timeline,
  target: AnimationTarget,
  options: UseGSAPAnimationOptions = {}
) {
  const { autoPlay = true, onComplete, dependencies = [] } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    timelineRef.current = timelineFactory(target);
    if (onComplete) {
      timelineRef.current.eventCallback('onComplete', onComplete);
    }

    if (autoPlay && !hasPlayed.current) {
      timelineRef.current.play();
      hasPlayed.current = true;
    }

    return () => {
      timelineRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...dependencies]);

  const play = useCallback(() => {
    timelineRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    timelineRef.current?.pause();
  }, []);

  const reverse = useCallback(() => {
    timelineRef.current?.reverse();
  }, []);

  const restart = useCallback(() => {
    timelineRef.current?.restart();
  }, []);

  return { play, pause, reverse, restart, timeline: timelineRef };
}

// ─── ScrollTrigger shortcut (for future use) ───
// TODO: Implement useScrollTriggerAnimation for scroll-based GSAP animations