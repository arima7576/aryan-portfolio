// ─── Arima Universe — Mind Map Camera Controller ───
// 🎥 Handles pan and zoom for the mind map canvas.

'use client';

import { useCallback, useRef, useEffect, type RefObject } from 'react';
import type { CameraState } from '@/types';

interface CameraControllerProps {
  camera: CameraState;
  onCameraChange: (update: Partial<CameraState>) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function CameraController({ camera, onCameraChange, containerRef }: CameraControllerProps) {
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 0.001;
      const newZoom = Math.max(0.1, Math.min(5, camera.zoom - e.deltaY * zoomFactor));
      onCameraChange({ zoom: newZoom });
    },
    [camera.zoom, onCameraChange]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      onCameraChange({ x: camera.x + dx, y: camera.y + dy });
    },
    [camera.x, camera.y, onCameraChange]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  // Zoom controls UI
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
      <button
        onClick={() => onCameraChange({ zoom: Math.min(5, camera.zoom + 0.2) })}
        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        onClick={() => onCameraChange({ zoom: Math.max(0.1, camera.zoom - 0.2) })}
        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        onClick={() => onCameraChange({ x: 0, y: 0, zoom: 1 })}
        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors text-xs"
        aria-label="Reset camera"
      >
        ⌖
      </button>
    </div>
  );
}

// TODO: Add touch controls for mobile
// TODO: Add smooth camera transitions
// TODO: Implement double-click to zoom on node