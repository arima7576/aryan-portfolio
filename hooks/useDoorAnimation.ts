// ─── Arima Universe — Door Animation Hook ───
// 🚪 Manages door hover + entrance animation state.

'use client';

import { useState, useCallback } from 'react';
import type { DoorId } from '@/types';

type DoorAnimationState = {
  hoveredDoor: DoorId | null;
  selectedDoor: DoorId | null;
  isEntering: boolean;
};

export function useDoorAnimation() {
  const [state, setState] = useState<DoorAnimationState>({
    hoveredDoor: null,
    selectedDoor: null,
    isEntering: false,
  });

  const handleHover = useCallback((doorId: DoorId | null) => {
    setState((prev) => ({ ...prev, hoveredDoor: doorId }));
  }, []);

  const handleSelect = useCallback((doorId: DoorId) => {
    setState((prev) => ({ ...prev, selectedDoor: doorId, isEntering: true }));
  }, []);

  const handleEnterComplete = useCallback(() => {
    setState((prev) => ({ ...prev, isEntering: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ hoveredDoor: null, selectedDoor: null, isEntering: false });
  }, []);

  return {
    ...state,
    handleHover,
    handleSelect,
    handleEnterComplete,
    reset,
  };
}