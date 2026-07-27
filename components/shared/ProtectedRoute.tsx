// ─── Arima Universe — Protected Route Component ───
// 🛡️ Wraps pages that require authentication.

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers';
import { LoadingScreen } from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, step } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && step !== 'loading') {
      sessionStorage.setItem('arimaReturnPath', pathname);
      router.push('/login');
    }
  }, [isAuthenticated, pathname, step, router]);

  if (!isAuthenticated) {
    return <LoadingScreen message="Authenticating..." />;
  }

  return <>{children}</>;
}
