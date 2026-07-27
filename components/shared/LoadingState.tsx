// ─── Arima Universe — Route Loading State ───
// ⏳ Minimal loading indicator for route transitions

export function LoadingState() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-[1px] bg-blue-500/30 animate-pulse" />
        <span className="text-[10px] font-mono text-blue-400/30 tracking-[0.3em] uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}