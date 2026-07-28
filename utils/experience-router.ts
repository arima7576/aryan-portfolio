import type { ActiveChamber } from '@/types/experience';

const validChambers = new Set<ActiveChamber>([
  'executive',
  'portfolio',
  'quant',
  'growth',
  'projects',
  'publications',
  'approvals',
  'health',
]);

export const isActiveChamber = (value: string | null | undefined): value is ActiveChamber =>
  Boolean(value && validChambers.has(value as ActiveChamber));

export const chamberFromPath = (path: string): ActiveChamber | null => {
  if (path === '/portfolio-lab' || path.includes('chamber=portfolio')) return 'portfolio';
  if (path === '/quant-research' || path.includes('chamber=quant')) return 'quant';
  if (path === '/growth-studio' || path.includes('chamber=growth')) return 'growth';
  if (path === '/projects' || path.includes('chamber=projects')) return 'projects';
  if (path.includes('chamber=publications')) return 'publications';
  if (path.includes('chamber=approvals')) return 'approvals';
  if (path.includes('chamber=health')) return 'health';
  if (path === '/executive' || path.includes('chamber=executive')) return 'executive';
  return null;
};

export const executiveChamberPath = (chamber: ActiveChamber): string =>
  chamber === 'executive' ? '/executive' : '/executive?chamber=' + chamber;

export const initialChamberFromLocation = (): ActiveChamber | null => {
  if (typeof window === 'undefined') return null;
  const chamber = new URLSearchParams(window.location.search).get('chamber');
  return isActiveChamber(chamber) ? chamber : null;
};
