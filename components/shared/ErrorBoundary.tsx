// ─── Arima Universe — Error Boundary ───
// 🛡️ Graceful error capture for route-level failures

'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Arima ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-[1px] bg-blue-500/30 mx-auto mb-6" />
            <h2 className="text-white/60 text-sm font-light tracking-[0.15em] uppercase mb-3">
              Something went wrong
            </h2>
            <p className="text-white/20 text-[10px] font-mono mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}