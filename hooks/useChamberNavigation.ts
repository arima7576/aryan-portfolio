'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ActiveChamber,
  ChamberTransition,
} from '@/types/experience';

type NavigationOptions = {
  from?: ActiveChamber | 'avatar';
  onCommit?: (chamber: ActiveChamber) => void;
};

const emptyTransition: ChamberTransition = {
  phase: 'idle',
  from: 'avatar',
  to: 'avatar',
};

export function useChamberNavigation(initialChamber: ActiveChamber = 'executive') {
  const [activeChamber, setActiveChamber] = useState<ActiveChamber>(initialChamber);
  const [transition, setTransition] = useState<ChamberTransition>(emptyTransition);
  const timers = useRef<number[]>([]);

  const clearTransitionTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const navigateToChamber = useCallback((
    next: ActiveChamber,
    options: NavigationOptions = {},
  ) => {
    clearTransitionTimers();
    const from = options.from ?? activeChamber;
    setTransition({ phase: 'focus', from, to: next });
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'zoom', from, to: next });
    }, 180));
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'dissolve', from, to: next });
    }, 420));
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'tunnel', from, to: next });
    }, 640));
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'neural_expansion', from, to: next });
      setActiveChamber(next);
      options.onCommit?.(next);
    }, 900));
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'reveal', from, to: next });
    }, 1_100));
    timers.current.push(window.setTimeout(() => {
      setTransition({ phase: 'idle', from: next, to: next });
      timers.current = [];
    }, 1_420));
  }, [activeChamber, clearTransitionTimers]);

  const returnToCore = useCallback((onComplete?: () => void) => {
    clearTransitionTimers();
    const from = activeChamber;
    setTransition({ phase: 'returning', from, to: 'avatar' });
    timers.current.push(window.setTimeout(() => {
      setTransition(emptyTransition);
      onComplete?.();
      timers.current = [];
    }, 750));
  }, [activeChamber, clearTransitionTimers]);

  useEffect(() => clearTransitionTimers, [clearTransitionTimers]);

  return {
    activeChamber,
    setActiveChamber,
    transition,
    navigateToChamber,
    returnToCore,
    clearTransitionTimers,
  };
}
