// ─── Arima Universe — Video Overlay Component ───
// 🎥 Full-screen video overlay for cinematic sequences.

'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

interface VideoOverlayProps {
  src: string;
  isPlaying: boolean;
  onComplete?: () => void;
  className?: string;
}

export function VideoOverlay({ src, isPlaying, onComplete, className }: VideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    if (isPlaying) {
      videoRef.current?.play();
    }
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className={cn('fixed inset-0 z-[90] bg-black', className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={src}
            onLoadedData={handleLoadedData}
            onEnded={handleEnded}
            playsInline
            muted
            autoPlay
          />

          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40 text-sm tracking-widest uppercase">
                Loading...
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}