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
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized || isAuthenticated) return;
    const returnPath = pathname.startsWith('/') && !pathname.startsWith('//') ? pathname : '/';
    sessionStorage.setItem('arimaReturnPath', returnPath);
    router.replace('/login');
  }, [isAuthenticated, isInitialized, pathname, router]);

  if (!isInitialized || !isAuthenticated) {
    return <LoadingScreen message="Authenticating..." />;
  }

  return <>{children}</>;
}
