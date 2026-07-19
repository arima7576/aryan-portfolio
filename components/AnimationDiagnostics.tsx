"use client";

import { useEffect, useState } from "react";

type Diagnostics = { hydrated: boolean; reducedMotion: boolean; mobileFallback: boolean; introCompleted: boolean; lenisRunning: boolean; gsapLoaded: boolean; scrollTriggerCount: number; activeScene: string; progress: number };
const initial: Diagnostics = { hydrated: false, reducedMotion: false, mobileFallback: false, introCompleted: false, lenisRunning: false, gsapLoaded: false, scrollTriggerCount: 0, activeScene: "initialising", progress: 0 };

export function AnimationDiagnostics() {
  const [status, setStatus] = useState(initial);
  useEffect(() => {
    const update = (event: Event) => setStatus((event as CustomEvent<Diagnostics>).detail);
    window.addEventListener("arima:animation-diagnostics", update);
    return () => window.removeEventListener("arima:animation-diagnostics", update);
  }, []);
  if (process.env.NODE_ENV === "production") return null;
  return <aside className="animation-diagnostics" aria-label="Animation diagnostics"><strong>ANIMATION RUNTIME</strong>{Object.entries({ "JavaScript hydrated": status.hydrated, "Reduced motion": status.reducedMotion, "Mobile fallback": status.mobileFallback, "Intro completed": status.introCompleted, "Lenis running": status.lenisRunning, "GSAP loaded": status.gsapLoaded, "ScrollTriggers": status.scrollTriggerCount, "Active scene": status.activeScene, "Scroll progress": `${(status.progress * 100).toFixed(1)}%` }).map(([key, value]) => <div key={key}><span>{key}</span><b>{typeof value === "boolean" ? (value ? "yes" : "no") : value}</b></div>)}</aside>;
}
