'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AvatarVisualState } from '@/types/experience';
import type { VoiceState } from '@/types/voice';

const voiceStateMap: Partial<Record<VoiceState, AvatarVisualState>> = {
  idle: 'idle',
  requesting_microphone: 'awakening',
  listening: 'listening',
  speech_detected: 'speech_detected',
  processing: 'processing',
  thinking: 'thinking',
  tool_execution: 'executing',
  awaiting_approval: 'awaiting_approval',
  speaking: 'speaking',
  interrupted: 'interrupted',
  completed: 'completed',
  warning: 'warning',
  error: 'error',
  cancelled: 'idle',
};

export function avatarStateFromVoice(state: VoiceState): AvatarVisualState {
  return voiceStateMap[state] ?? 'idle';
}

export function useAvatarState(initial: AvatarVisualState = 'idle') {
  const [avatarState, setAvatarState] = useState<AvatarVisualState>(initial);
  const completionTimeout = useRef<number | null>(null);

  const transitionAvatar = useCallback((next: AvatarVisualState) => {
    if (completionTimeout.current !== null) {
      window.clearTimeout(completionTimeout.current);
      completionTimeout.current = null;
    }
    setAvatarState(next);
    if (next === 'completed' || next === 'interrupted') {
      completionTimeout.current = window.setTimeout(() => {
        setAvatarState('idle');
        completionTimeout.current = null;
      }, 1_100);
    }
  }, []);

  useEffect(() => () => {
    if (completionTimeout.current !== null) window.clearTimeout(completionTimeout.current);
  }, []);

  return { avatarState, transitionAvatar };
}
