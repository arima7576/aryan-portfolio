// ─── Arima Universe — Stage 3: Full Cinematic Journey ───
// 🎬 Uses native document scroll with PhaseOneFilm GSAP ScrollTrigger

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseOneFilm } from '@/components/PhaseOneFilm';
import { CINEMATIC_CHAPTERS } from '@/types';

export default function WatchIntroPage() {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showSkip] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  // Track document scroll position to estimate chapter progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Update chapter based on progress
      const chapterIndex = Math.min(
        Math.floor(progress * CINEMATIC_CHAPTERS.length),
        CINEMATIC_CHAPTERS.length - 1
      );
      setCurrentChapter(chapterIndex);

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router]);

  const handleSkip = () => {
    router.push('/choose-door');
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Cinematic navigation overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      >
        <div className="px-6 pt-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="text-[9px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
            >
              ← Exit
            </button>
            <div className="flex-1" />
            <div className="text-[8px] font-mono text-white/20 tracking-wider uppercase">
              Chapter {currentChapter + 1}/{CINEMATIC_CHAPTERS.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical chapter progress rail */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[90] flex flex-col items-center gap-2 pointer-events-none">
        <div className="relative w-[1px] h-[180px] bg-white/5">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-blue-600 origin-top"
            style={{ transform: 'scaleY(0)', transition: 'transform 0.3s ease-out' }}
          />
        </div>
        <div className="text-[7px] font-mono text-white/20 tracking-wider">
          {Math.round(currentChapter / (CINEMATIC_CHAPTERS.length - 1) * 100)}%
        </div>
      </div>

      {/* Chapter labels on hover (right side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[85] pointer-events-none hidden md:block">
        {CINEMATIC_CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.id}
            className={`text-[7px] font-mono tracking-wider uppercase transition-all duration-500 ${
              i === currentChapter
                ? 'text-blue-400/80 translate-x-0'
                : 'text-white/10 translate-x-4'
            }`}
            style={{
              position: 'absolute',
              top: `${(i / (CINEMATIC_CHAPTERS.length - 1)) * 180}px`,
              transform: `translateY(-50%) translateX(${i === currentChapter ? 0 : 16}px)`,
              whiteSpace: 'nowrap',
            }}
          >
            {chapter.title}
          </div>
        ))}
      </div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            onClick={handleSkip}
            className="fixed top-4 right-4 z-[100] px-4 py-2 border border-white/10 rounded-full bg-black/40 text-[9px] font-mono text-white/40 hover:text-white/70 hover:border-white/30 transition-all duration-300 pointer-events-auto"
          >
            Skip Journey <span className="text-blue-400">→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* The cinematic film — uses native document scroll for GSAP ScrollTrigger */}
      <PhaseOneFilm />
    </div>
  );
}
