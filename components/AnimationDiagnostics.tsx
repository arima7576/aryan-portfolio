"use client";

import { useEffect, useRef, useState } from "react";

type Diagnostics = { hydrated: boolean; lenisRunning: boolean; gsapLoaded: boolean; scrollTriggerCount: number; pinSpacerCount: number; activeScene: string; timelineCreated: boolean; introTimelineProgress: number; progress: number };
const initial: Diagnostics = { hydrated: false, lenisRunning: false, gsapLoaded: false, scrollTriggerCount: 0, pinSpacerCount: 0, activeScene: "initialising", timelineCreated: false, introTimelineProgress: 0, progress: 0 };

const sceneIds = ["intro", "company", "capabilities", "founder", "research", "portfolio", "engine", "contact"];

function visibleScene() {
  return sceneIds
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .sort((a, b) => Math.abs(a!.getBoundingClientRect().top) - Math.abs(b!.getBoundingClientRect().top))[0]?.id ?? "initialising";
}

export function AnimationDiagnostics() {
  const [status, setStatus] = useState(initial);
  const runtime = useRef(initial);
  const lastConsoleSnapshot = useRef("");
  useEffect(() => {
    const publish = () => {
      const next = {
        ...runtime.current,
        hydrated: document.body.dataset.arimaHydrated === "true",
        pinSpacerCount: document.querySelectorAll(".pin-spacer").length,
        activeScene: visibleScene(),
        progress: document.documentElement.scrollHeight > innerHeight
          ? scrollY / (document.documentElement.scrollHeight - innerHeight)
          : 0,
      };
      next.timelineCreated = next.timelineCreated || next.scrollTriggerCount > 0;
      runtime.current = next;
      setStatus(next);
      const serialized = JSON.stringify(next);
      if (serialized !== lastConsoleSnapshot.current) {
        console.log("[Arima Production Diagnostics]", next);
        lastConsoleSnapshot.current = serialized;
      }
    };
    const update = (event: Event) => {
      runtime.current = { ...runtime.current, ...(event as CustomEvent<Partial<Diagnostics>>).detail };
      publish();
    };
    window.addEventListener("arima:animation-diagnostics", update);
    publish();
    const timer = window.setInterval(publish, 500);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("arima:animation-diagnostics", update);
    };
  }, []);
  const values = {
    "Hydrated": status.hydrated,
    "GSAP initialized": status.gsapLoaded,
    "ScrollTriggers": status.scrollTriggerCount,
    "Pin spacers": status.pinSpacerCount,
    "Current scene": status.activeScene,
    "Timeline created": status.timelineCreated,
    "Intro timeline progress": `${(status.introTimelineProgress * 100).toFixed(1)}%`,
    "Lenis running": status.lenisRunning,
    "Current scroll progress": `${(status.progress * 100).toFixed(1)}%`,
  };
  return <aside className="animation-diagnostics" aria-label="Animation diagnostics">
    <strong>PRODUCTION RUNTIME</strong>
    {status.hydrated && status.scrollTriggerCount === 0 && <p className="animation-runtime-warning">GSAP runtime not attached</p>}
    {Object.entries(values).map(([key, value]) => <div key={key}><span>{key}</span><b>{typeof value === "boolean" ? (value ? "yes" : "no") : value}</b></div>)}
  </aside>;
}
