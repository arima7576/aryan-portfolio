"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureAnimationPlugins, gsap } from "@/lib/animation-runtime";

export function LightTransitionScene() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!ensureAnimationPlugins() || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".travel-pulse", { left: "-10%", scaleX: .4 }, { left: "105%", scaleX: 2, ease: "power2.in", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 25%", scrub: .6 } });
    gsap.fromTo(".trail-dot", { opacity: 0 }, { opacity: .65, stagger: .06, scrollTrigger: { trigger: root.current, start: "top 60%", end: "center center", scrub: true } });
  }, { scope: root });
  return <section ref={root} className="light-transition" aria-hidden="true"><div className="data-cable"><span className="travel-pulse"/>{Array.from({ length: 18 }, (_, index) => <i className="trail-dot" style={{ left: `${index * 5.5}%` }} key={index}/>)}</div></section>;
}
