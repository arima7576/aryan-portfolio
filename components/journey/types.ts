import type { gsap } from '@/lib/animation-runtime';

export type JourneyPartHandle = { addToTimeline: (timeline: gsap.core.Timeline, start: number) => void };
