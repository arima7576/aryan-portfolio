"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureAnimationPlugins, gsap } from "@/lib/animation-runtime";

export function IntroScene({ compact }: { compact: boolean }) {
  const root = useRef<HTMLElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLSpanElement>(null);
  const wick = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    console.log("[Arima Animation] IntroScene timeline effect", { compact, refsReady: Boolean(root.current) });
    if (!ensureAnimationPlugins()) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = innerWidth < 768;
    if (compact || reducedMotion || isMobile || !root.current) {
      console.log("[Arima Animation] IntroScene early return", { compact, reducedMotion, isMobile, refsReady: Boolean(root.current) });
      return;
    }
    let lastLoggedProgress = -1;
    const timeline = gsap.timeline({ scrollTrigger: {
      id: "intro-cinematic",
      trigger: root.current,
      start: "top top",
      end: "+=180%",
      scrub: .65,
      pin: true,
      onUpdate: (self) => {
        root.current?.style.setProperty("--intro-timeline-progress", String(self.progress));
        if (meter.current) meter.current.textContent = `${Math.round(self.progress * 100)}%`;
        window.dispatchEvent(new CustomEvent("arima:animation-diagnostics", { detail: { introTimelineProgress: self.progress } }));
        const rounded = Math.floor(self.progress * 10) / 10;
        if (rounded !== lastLoggedProgress) {
          console.log("[Arima Intro Timeline]", { progress: self.progress, scrollY: window.scrollY });
          lastLoggedProgress = rounded;
        }
      },
    } });
    timeline
      .fromTo(camera.current, { scale: .2, opacity: 0, rotate: -8, y: 90 }, { scale: 1, opacity: 1, rotate: 0, y: 0, duration: .8, ease: "power2.out" })
      .fromTo(body.current, { height: 20, width: 40, scale: .2, opacity: 0, rotate: -8, borderRadius: 24 }, { height: 260, width: 100, scale: 1.35, opacity: 1, rotate: 0, borderRadius: 4, duration: 1.15, ease: "power2.out" }, 0)
      .fromTo(wick.current, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: .85 }, .15)
      .fromTo(label.current, { opacity: 0, y: 70 }, { opacity: 1, y: -15, duration: .9 }, .1)
      .to(camera.current, { scale: 4, y: -35, filter: "blur(.4px)", duration: 1.8, ease: "power1.inOut" }, .75)
      .to(body.current, { scale: 1.8, rotate: 2, duration: 1.8, ease: "power1.inOut" }, .75)
      .to(label.current, { y: -120, opacity: .2, duration: 1.4 }, .85)
      .to(cue.current, { y: 90, opacity: 0, duration: .8 }, .35)
      .to(root.current, { backgroundColor: "#071a37", duration: 1.6 }, .55);
    console.log("[Arima Animation] IntroScene timeline created", { triggers: timeline.scrollTrigger ? 1 : 0 });
  }, { scope: root, dependencies: [compact], revertOnUpdate: true });
  return <section ref={root} id="intro" className={`scene intro-scene ${compact ? "compact-scene" : ""}`} aria-label="Market candle introduction">
    <div ref={label} className="intro-label"><span>ARIMA FINANCE</span><small>SCROLL TO ENTER THE MARKET</small></div>
    <div ref={camera} className="candle-system" aria-hidden="true"><span ref={wick} className="candle-wick"/><span ref={body} className="candle-body"/><span className="candle-glow"/></div>
    <div ref={cue} className="scroll-cue" aria-hidden="true"><span/>SCROLL</div>
    <div className="intro-timeline-marker" aria-label="Intro timeline progress"><i/><span ref={meter}>0%</span></div>
  </section>;
}
