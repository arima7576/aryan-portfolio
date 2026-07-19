"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollController() {
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".progress-rail span");
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => { if (progress) progress.style.transform = `scaleY(${self.progress})`; },
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) return () => progressTrigger.kill();
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      progressTrigger.kill();
    };
  }, []);
  return null;
}
