'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  dailyIntelligenceObjects,
  objectsForChamber,
  watchlistObjects,
  weeklyPerformanceObject,
} from '@/data/experience-demo';
import { useAnimationPolicy } from '@/hooks/useAnimationPolicy';
import { avatarStateFromVoice, useAvatarState } from '@/hooks/useAvatarState';
import { useChamberNavigation } from '@/hooks/useChamberNavigation';
import { useExperienceEvents } from '@/hooks/useExperienceEvents';
import type {
  ActiveChamber,
  ExperienceAnnouncement,
  ExperienceMode,
  NeuralDataObject,
} from '@/types/experience';
import type {
  VoiceGatewayResponse,
  VoiceNavigationAction,
  VoiceState,
} from '@/types/voice';
import {
  chamberFromPath,
  executiveChamberPath,
  initialChamberFromLocation,
} from '@/utils/experience-router';

const deduplicate = (objects: NeuralDataObject[]) =>
  Array.from(new Map(objects.map((object) => [object.id, object])).values());

export function useNeuralExperience() {
  const [reducedMotionOverride, setReducedMotionOverride] = useState(false);
  const animation = useAnimationPolicy(reducedMotionOverride);
  const { avatarState, transitionAvatar } = useAvatarState();
  const chamber = useChamberNavigation();
  const [mode, setMode] = useState<ExperienceMode>('avatar');
  const [objects, setObjects] = useState<NeuralDataObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<ExperienceAnnouncement | null>(null);
  const entryTimers = useRef<number[]>([]);
  const dismissalTimers = useRef<number[]>([]);
  const didReadInitialRoute = useRef(false);

  const clearEntryTimers = useCallback(() => {
    entryTimers.current.forEach((timer) => window.clearTimeout(timer));
    entryTimers.current = [];
  }, []);

  const addObjects = useCallback((next: NeuralDataObject[]) => {
    setObjects((current) => deduplicate([...current, ...next]));
  }, []);

  const addObject = useCallback((object: NeuralDataObject) => {
    setObjects((current) => deduplicate([...current, object]));
  }, []);

  const updateObject = useCallback((id: string, patch: Partial<NeuralDataObject>) => {
    setObjects((current) => current.map((object) => (
      object.id === id ? { ...object, ...patch } : object
    )));
  }, []);

  const dismissObject = useCallback((id: string) => {
    setObjects((current) => current.map((object) => (
      object.id === id ? { ...object, returning: true } : object
    )));
    setSelectedObjectId((current) => current === id ? null : current);
    const dismissal = window.setTimeout(() => {
      setObjects((current) => current.filter((object) => object.id !== id));
      dismissalTimers.current = dismissalTimers.current.filter(
        (timer) => timer !== dismissal,
      );
    }, 460);
    dismissalTimers.current.push(dismissal);
  }, []);

  const announce = useCallback((next: ExperienceAnnouncement) => {
    setAnnouncement(next);
  }, []);

  const seedChamber = useCallback((target: ActiveChamber) => {
    addObjects(objectsForChamber(target));
  }, [addObjects]);

  const writeChamberPath = useCallback((target: ActiveChamber) => {
    if (typeof window === 'undefined') return;
    window.history.replaceState({}, '', executiveChamberPath(target));
  }, []);

  const openChamber = useCallback((target: ActiveChamber) => {
    if (mode === 'avatar' || mode === 'exiting') {
      clearEntryTimers();
      transitionAvatar('awakening');
      setMode('entering');
      entryTimers.current.push(window.setTimeout(() => {
        setMode('neural_core');
      }, animation.reducedMotion ? 0 : 260));
      entryTimers.current.push(window.setTimeout(() => {
        chamber.navigateToChamber(target, {
          from: 'avatar',
          onCommit: (committed) => {
            setMode('chamber');
            seedChamber(committed);
            writeChamberPath(committed);
            transitionAvatar('presenting');
          },
        });
      }, animation.reducedMotion ? 0 : 380));
      return;
    }
    setMode('chamber');
    chamber.navigateToChamber(target, {
      onCommit: (committed) => {
        seedChamber(committed);
        writeChamberPath(committed);
        transitionAvatar('presenting');
      },
    });
  }, [
    animation.reducedMotion,
    chamber,
    clearEntryTimers,
    mode,
    seedChamber,
    transitionAvatar,
    writeChamberPath,
  ]);

  const enterCore = useCallback(() => {
    if (mode !== 'avatar') return;
    clearEntryTimers();
    transitionAvatar('awakening');
    setMode('entering');
    announce({
      id: 'entry',
      message: 'Entering Arima’s neural core.',
    });
    entryTimers.current.push(window.setTimeout(() => {
      setMode('neural_core');
      transitionAvatar('thinking');
    }, animation.reducedMotion ? 0 : 680));
    entryTimers.current.push(window.setTimeout(() => {
      chamber.navigateToChamber('executive', {
        from: 'avatar',
        onCommit: (target) => {
          setMode('chamber');
          seedChamber(target);
          writeChamberPath(target);
          transitionAvatar('presenting');
        },
      });
    }, animation.reducedMotion ? 0 : 980));
  }, [
    animation.reducedMotion,
    announce,
    chamber,
    clearEntryTimers,
    mode,
    seedChamber,
    transitionAvatar,
    writeChamberPath,
  ]);

  const exitCore = useCallback(() => {
    if (mode === 'avatar' || mode === 'exiting') return;
    clearEntryTimers();
    setMode('exiting');
    transitionAvatar('dormant');
    chamber.returnToCore(() => {
      setMode('avatar');
      setSelectedObjectId(null);
      transitionAvatar('idle');
      if (typeof window !== 'undefined') window.history.replaceState({}, '', '/executive');
      announce({ id: 'exit', message: 'Returned to Arima avatar view.' });
    });
  }, [announce, chamber, clearEntryTimers, mode, transitionAvatar]);

  const showDailyIntelligence = useCallback(() => {
    addObjects(dailyIntelligenceObjects);
    addObjects(watchlistObjects);
    announce({
      id: 'daily-intelligence',
      message: 'Daily intelligence is ready. Five simulated watchlist assets have appeared.',
    });
  }, [addObjects, announce]);

  const showWeeklyPerformance = useCallback(() => {
    addObject(weeklyPerformanceObject);
    announce({
      id: 'weekly-performance',
      message: 'A simulated weekly portfolio performance object has appeared.',
    });
  }, [addObject, announce]);

  const handleVoiceState = useCallback((state: VoiceState) => {
    transitionAvatar(avatarStateFromVoice(state));
  }, [transitionAvatar]);

  const events = useExperienceEvents({
    setAvatar: transitionAvatar,
    navigate: openChamber,
    addObject,
    updateObject,
    dismissObject,
    announce,
  });

  const handleVoiceResponse = useCallback((response: VoiceGatewayResponse) => {
    events.applyVoiceResponse(response);
    const panelFocus = response.panel_action?.focus;
    const content = response.transcript?.toLowerCase() ?? '';
    if (panelFocus === 'today' || content.includes('what') && content.includes('today')) {
      showDailyIntelligence();
    }
    if (panelFocus === 'approvals' || content.includes('approval')) {
      openChamber('approvals');
    }
    if (content.includes('weekly') || content.includes('performance')) {
      openChamber('portfolio');
      showWeeklyPerformance();
    }
  }, [events, openChamber, showDailyIntelligence, showWeeklyPerformance]);

  const handleVoiceNavigation = useCallback((action: VoiceNavigationAction): boolean => {
    if (action.path === 'back' || action.focus === 'exit') {
      exitCore();
      return true;
    }
    if (action.focus === 'enter' || action.path === '/executive?enter=true') {
      enterCore();
      return true;
    }
    const target = chamberFromPath(action.path);
    if (target) {
      openChamber(target);
      return true;
    }
    return false;
  }, [enterCore, exitCore, openChamber]);

  const resolveObjectAction = useCallback((
    id: string,
    action: 'approve' | 'reject' | 'revision',
  ) => {
    updateObject(id, {
      status: action === 'approve' ? 'complete' : action === 'reject' ? 'error' : 'warning',
      summary: action === 'approve'
        ? 'Approved locally in demo mode. No external action has been taken.'
        : action === 'reject'
          ? 'Rejected locally in demo mode. No external action has been taken.'
          : 'Revision requested locally in demo mode. No external action has been taken.',
    });
    announce({
      id: id + '-' + action,
      message: action + ' recorded locally. No external action has been taken.',
    });
  }, [announce, updateObject]);

  useEffect(() => {
    if (didReadInitialRoute.current) return;
    didReadInitialRoute.current = true;
    const directChamber = initialChamberFromLocation();
    if (!directChamber || directChamber === 'executive') return undefined;
    const bootstrap = window.setTimeout(() => {
      setMode('chamber');
      chamber.setActiveChamber(directChamber);
      seedChamber(directChamber);
      transitionAvatar('presenting');
      announce({
        id: 'direct-chamber',
        message: 'Opened ' + directChamber + ' intelligence chamber.',
      });
    }, 0);
    return () => window.clearTimeout(bootstrap);
  }, [announce, chamber, seedChamber, transitionAvatar]);

  useEffect(() => {
    if (mode === 'avatar' || animation.paused) return undefined;
    const pulse = window.setInterval(() => {
      addObject({
        id: 'background-' + Date.now(),
        kind: 'notification',
        chamber: 'health',
        eyebrow: 'BACKGROUND INTELLIGENCE / DEMO',
        title: 'System pulse received',
        summary: 'A deterministic background signal moved through the neural network.',
        source: 'demo',
        status: 'complete',
        position: { x: 84, y: 16 },
      });
    }, 22_000);
    return () => window.clearInterval(pulse);
  }, [addObject, animation.paused, mode]);

  useEffect(() => () => {
    clearEntryTimers();
    dismissalTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, [clearEntryTimers]);

  const selectedObject = useMemo(
    () => objects.find((object) => object.id === selectedObjectId) ?? null,
    [objects, selectedObjectId],
  );

  return {
    mode,
    activeChamber: chamber.activeChamber,
    transition: chamber.transition,
    avatarState,
    animation,
    objects,
    selectedObject,
    announcement,
    enterCore,
    exitCore,
    openChamber,
    handleVoiceState,
    handleVoiceResponse,
    handleVoiceNavigation,
    showDailyIntelligence,
    showWeeklyPerformance,
    selectObject: setSelectedObjectId,
    dismissObject,
    resolveObjectAction,
    reducedMotionOverride,
    setReducedMotionOverride,
  };
}
