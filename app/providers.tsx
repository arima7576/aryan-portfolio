// ─── Arima Universe — Client-Side Providers ───
// Wraps the application with all necessary context providers.

'use client';

import { type ReactNode } from 'react';
import { ThemeProvider, AuthProvider } from '@/providers';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}