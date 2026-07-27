// ─── Arima Universe — Theme Provider ───
// 🎨 Manages door-specific theming across the application.

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { DoorId, ThemeAccent, ThemeMode } from '@/types';

type ThemeContextValue = {
  mode: ThemeMode;
  accent: ThemeAccent;
  activeDoor: DoorId | null;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
  setActiveDoor: (doorId: DoorId | null) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [accent, setAccent] = useState<ThemeAccent>('default');
  const [activeDoor, setActiveDoor] = useState<DoorId | null>(null);

  const handleSetAccent = useCallback((newAccent: ThemeAccent) => {
    setAccent(newAccent);
    // TODO: Apply CSS custom properties for door-specific theming
    // document.documentElement.style.setProperty('--accent-color', ...)
  }, []);

  const handleSetActiveDoor = useCallback((doorId: DoorId | null) => {
    setActiveDoor(doorId);
    if (doorId) {
      switch (doorId) {
        case 'work-with-us':
          handleSetAccent('investment');
          break;
        case 'client-portfolio':
          handleSetAccent('portfolio');
          break;
        case 'research-projects':
          handleSetAccent('projects');
          break;
        default:
          handleSetAccent('default');
      }
    } else {
      handleSetAccent('default');
    }
  }, [handleSetAccent]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        activeDoor,
        setMode,
        setAccent: handleSetAccent,
        setActiveDoor: handleSetActiveDoor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}