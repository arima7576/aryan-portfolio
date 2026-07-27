// ─── Arima Universe — Three Monumental Doors Configuration ───
// 🚪 Each door represents a real product path within Arima

import type { DoorId, DoorTheme } from '@/types';

export const DOOR_THEMES: DoorTheme[] = [
  {
    id: 'work-with-us' as DoorId,
    label: 'Work With Us',
    subtitle: 'Join the Mission',
    description: 'Volunteer, intern or apply to build the future of financial intelligence.',
    accentColor: '#f0e6d3',
    path: '/work-with-us',
    visualLanguage: ['warm institutional', 'human presence', 'future talent', 'restrained gold'],
    doorNumber: '01',
    ambientGlow: 'rgba(240, 230, 211, 0.08)',
  },
  {
    id: 'client-portfolio' as DoorId,
    label: 'Client Portfolio World',
    subtitle: 'Secure Private Access',
    description: 'Enter your private portfolio environment. Institutional intelligence, personal allocation.',
    accentColor: '#1a6bff',
    path: '/client-portfolio',
    visualLanguage: ['secure threshold', 'deep blue', 'data movement', 'private universe'],
    doorNumber: '02',
    ambientGlow: 'rgba(26, 107, 255, 0.08)',
  },
  {
    id: 'research-projects' as DoorId,
    label: 'Research & Projects',
    subtitle: 'Intelligence & Technology',
    description: 'Explore Arima\'s public research, financial models, engine systems and experimental technology.',
    accentColor: '#8b7cf6',
    path: '/research-projects',
    visualLanguage: ['violet intelligence', 'scientific depth', 'moving diagrams', 'experimental energy'],
    doorNumber: '03',
    ambientGlow: 'rgba(139, 124, 246, 0.08)',
  },
];

export const DOOR_BY_ID = Object.fromEntries(
  DOOR_THEMES.map((door) => [door.id, door])
) as Record<string, DoorTheme>;