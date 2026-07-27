// ─── Arima Universe — Class Name Utility ───

import { type ClassValue, clsx } from 'clsx';

// Note: Install clsx via `npm install clsx tailwind-merge`
// TODO: Integrate tailwind-merge for conflict resolution

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}