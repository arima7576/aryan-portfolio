"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureAnimationPlugins, gsap } from "@/lib/animation-runtime";

export function IntroScene({ compact }: { compact: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!ensureAnimationPlugins()) return;
    if (compact || matchMedia("(prefers-reduced-motion: reduce)").matches || innerWidth < 768) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", scrub: 1.1, pin: true } });
    timeline.fromTo(".candle-body", { height: 2, width: 54, borderRadius: 20 }, { height: 250, width: 92, borderRadius: 4, duration: 2 })
      .fromTo(".candle-wick", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 1)
      .to(".candle-system", { scale: 4.5, filter: "blur(1px)", duration: 2 })
      .to(".candle-body", { opacity: 0 }, "<.5")
      .to(".intro-label", { opacity: 1, y: 0, duration: 1 }, 0.2)
      .to(".intro-label", { opacity: 0, duration: .6 }, 2.4)
      .to(root.current, { backgroundColor: "#020711", duration: 1 }, 3);
  }, { scope: root, dependencies: [compact], revertOnUpdate: true });
  return <section ref={root} id="intro" className={`scene intro-scene ${compact ? "compact-scene" : ""}`} aria-label="Market candle introduction">
    <div className="intro-label"><span>ARIMA FINANCE</span><small>SCROLL TO ENTER THE MARKET</small></div>
    <div className="candle-system" aria-hidden="true"><span className="candle-wick"/><span className="candle-body"/><span className="candle-glow"/></div>
    <div className="scroll-cue" aria-hidden="true"><span/>SCROLL</div>
  </section>;
}
