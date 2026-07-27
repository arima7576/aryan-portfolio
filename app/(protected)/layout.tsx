// ─── Arima Universe — Protected Routes Layout ───
// Wraps protected pages with auth check.

import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}