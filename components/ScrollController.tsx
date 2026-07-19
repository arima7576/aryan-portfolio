"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureAnimationPlugins, gsap, ScrollTrigger } from "@/lib/animation-runtime";

const sceneIds = ["intro", "company", "capabilities", "founder", "research", "portfolio", "engine", "contact"];

function activeScene() {
  return sceneIds.map((id) => document.getElementById(id)).filter(Boolean).sort((a, b) => Math.abs(a!.getBoundingClientRect().top) - Math.abs(b!.getBoundingClientRect().top))[0]?.id ?? "initialising";
}

export function ScrollController({ runtimeVersion, introCompleted }: { runtimeVersion: number; introCompleted: boolean }) {
  console.log("[Arima Animation] ScrollController render", { runtimeVersion, introCompleted });
  useEffect(() => {
    console.log("[Arima Animation] ScrollController effect", { runtimeVersion, introCompleted });
    const conditions = {
      windowAvailable: typeof window !== "undefined",
      reducedMotion: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      isMobile: typeof window !== "undefined" && window.innerWidth < 768,
      lightweightMode: false,
      introCompleted,
      refsReady: Boolean(document.querySelector("#intro") && document.querySelector(".progress-rail span")),
      gsapAvailable: Boolean(gsap),
      ScrollTriggerAvailable: Boolean(ScrollTrigger),
    };
    console.log("[Arima Animation] runtime conditions", conditions);
    if (!ensureAnimationPlugins()) {
      console.log("[Arima Animation] ScrollController early return", { reason: "plugins-unavailable", ...conditions });
      return;
    }
    console.log("ScrollTrigger before", ScrollTrigger.getAll().length);
    let disposed = false;
    let lenis: Lenis | null = null;
    let probeTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
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
    console.log("[Arima Animation] global progress trigger created", { count: ScrollTrigger.getAll().length });

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
    const probeTimer = window.setTimeout(() => {
      const existingPins = ScrollTrigger.getAll().filter((trigger) => Boolean(trigger.pin));
      if (existingPins.length === 0 && !reduced && !mobile && !introCompleted) {
        console.log("[Arima Animation] no scene pin found; creating production probe");
        probeTrigger = ScrollTrigger.create({
          id: "intro-runtime-probe",
          trigger: "#intro",
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: true,
          onUpdate: (self) => document.documentElement.style.setProperty("--debug-scroll-progress", String(self.progress)),
        });
      }
      console.log("ScrollTrigger after", ScrollTrigger.getAll().length);
      refresh();
    }, 100);
    const timers = [window.setTimeout(refresh, 0), window.setTimeout(refresh, 250), window.setTimeout(refresh, 1000), probeTimer];
    document.fonts?.ready.then(refresh).catch(() => refresh());
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh);

    return () => {
      console.log("[Arima Animation] ScrollController cleanup", { runtimeVersion, introCompleted });
      disposed = true;
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.stop();
      lenis?.destroy();
      probeTrigger?.kill();
      progressTrigger.kill();
    };
  }, [runtimeVersion, introCompleted]);
  return null;
}
