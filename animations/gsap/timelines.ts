// ─── Arima Universe — GSAP Animation Timelines ───
// 🎬 All GSAP timeline factories. No animation logic inside page components.

import { gsap } from 'gsap';

// ─── Hero ───
export function createHeroTimeline(element: string | Element, delay = 0) {
  return gsap
    .timeline({ paused: true, delay })
    .fromTo(element, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out' })
    .fromTo(
      `${element} [data-animate="subtitle"]`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      `${element} [data-animate="cta"]`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );
}

// ─── Door ───
export function createDoorEntranceTimeline(doorSelector: string, index: number) {
  return gsap
    .timeline({ paused: true })
    .fromTo(
      doorSelector,
      { opacity: 0, y: 80, rotationY: 15 },
      { opacity: 1, y: 0, rotationY: 0, duration: 1.2, ease: 'power3.out', delay: index * 0.2 }
    )
    .fromTo(
      `${doorSelector} [data-animate="door-label"]`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.6'
    );
}

export function createDoorOpenTimeline(doorSelector: string) {
  return gsap.timeline({ paused: true }).to(doorSelector, {
    scale: 1.05,
    duration: 0.4,
    ease: 'power2.out',
  });
}

// ─── Page Transition ───
export function createPageEnterTimeline(element: string | Element) {
  return gsap
    .timeline({ paused: true })
    .set(element, { opacity: 0 })
    .to(element, { opacity: 1, duration: 0.8, ease: 'power2.out' });
}

export function createPageExitTimeline(element: string | Element) {
  return gsap.timeline({ paused: true }).to(element, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: 'power2.in',
  });
}

// ─── Loading Screen ───
export function createLoadingTimeline(element: string | Element) {
  return gsap
    .timeline({ paused: true })
    .fromTo(element, { opacity: 1 }, { opacity: 1, duration: 1 })
    .to(element, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=0.3');
}

// ─── Glass Card ───
export function createGlassCardEnterTimeline(element: string | Element, delay = 0) {
  return gsap
    .timeline({ paused: true, delay })
    .fromTo(
      element,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(
      `${element} [data-animate="card-content"]`,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
}

// ─── Cinematic Chapter ───
export function createCinematicChapterTimeline(element: string | Element) {
  return gsap
    .timeline({ paused: true })
    .fromTo(element, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' })
    .fromTo(
      `${element} [data-animate="chapter-title"]`,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
      '-=0.8'
    );
}

// ─── Mind Map ───
export function createMindNodeAppearTimeline(nodeSelector: string) {
  return gsap
    .timeline({ paused: true })
    .fromTo(nodeSelector, { opacity: 0, scale: 0, filter: 'blur(8px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(2)' });
}

export function createConnectionLineDrawTimeline(lineSelector: string) {
  return gsap
    .timeline({ paused: true })
    .fromTo(lineSelector, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.8, ease: 'power2.out' });
}