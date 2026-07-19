"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureAnimationPlugins, gsap, ScrollTrigger } from "@/lib/animation-runtime";

const sceneIds = ["intro", "company", "capabilities", "founder", "research", "portfolio", "engine", "contact"];

function activeScene() {
  return sceneIds.map((id) => document.getElementById(id)).filter(Boolean).sort((a, b) => Math.abs(a!.getBoundingClientRect().top) - Math.abs(b!.getBoundingClientRect().top))[0]?.id ?? "initialising";
}

export function ScrollController({ runtimeVersion, introCompleted }: { runtimeVersion: number; introCompleted: boolean }) {
  useEffect(() => {
    if (!ensureAnimationPlugins()) return;
    let disposed = false;
    let lenis: Lenis | null = null;
    let lenisRunning = false;
    let lastDiagnostic = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const progress = document.querySelector<HTMLElement>(".progress-rail span");
    const progressTrigger = ScrollTrigger.create({
      id: "global-progress",
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => { if (progress) progress.style.transform = `scaleY(${self.progress})`; },
    });

    const publishDiagnostics = () => {
      const now = performance.now();
      if (now - lastDiagnostic < 200) return;
      lastDiagnostic = now;
      window.dispatchEvent(new CustomEvent("arima:animation-diagnostics", { detail: {
        hydrated: true,
        reducedMotion: reduced,
        mobileFallback: mobile,
        introCompleted,
        lenisRunning,
        gsapLoaded: Boolean(gsap),
        scrollTriggerCount: ScrollTrigger.getAll().length,
        activeScene: activeScene(),
        progress: ScrollTrigger.maxScroll(window) ? window.scrollY / ScrollTrigger.maxScroll(window) : 0,
      } }));
    };
    const ticker = (time: number) => { if (lenis) lenis.raf(time * 1000); publishDiagnostics(); };
    const refresh = () => requestAnimationFrame(() => {
      if (disposed) return;
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
      publishDiagnostics();
    });

    if (!reduced && !mobile) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      lenis.start();
      lenisRunning = true;
    }
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    const timers = [window.setTimeout(refresh, 0), window.setTimeout(refresh, 250), window.setTimeout(refresh, 1000)];
    document.fonts?.ready.then(refresh).catch(() => refresh());
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh);

    return () => {
      disposed = true;
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.stop();
      lenis?.destroy();
      progressTrigger.kill();
    };
  }, [runtimeVersion, introCompleted]);
  return null;
}
