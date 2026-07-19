"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureAnimationPlugins, gsap } from "@/lib/animation-runtime";

const particles = Array.from({ length: 84 }, (_, i) => ({ left: (i * 37) % 100, top: (i * 61) % 100, value: i % 3 ? String((i * 17) % 10) : "+" }));

export function AFRevealScene({ compact }: { compact: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!ensureAnimationPlugins()) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl=gsap.timeline({scrollTrigger:{trigger:root.current,start:"top 70%",end:"bottom 70%",scrub:1}});
    tl.fromTo(".af-particle",{opacity:.55,scale:.4},{opacity:.05,scale:1.5,stagger:.005}).fromTo(".af-mark",{opacity:0,scale:.7,filter:"blur(20px)"},{opacity:1,scale:1,filter:"blur(0px)"},0.2).fromTo(".af-name",{opacity:0,y:30},{opacity:1,y:0},.55);
  },{scope:root,dependencies:[compact],revertOnUpdate:true});
  return <section ref={root} className={`scene af-scene ${compact ? "compact-scene" : ""}`}><div className="af-particles" aria-hidden="true">{particles.map((p,i)=><span className="af-particle" style={{left:`${p.left}%`,top:`${p.top}%`}} key={i}>{p.value}</span>)}</div><div className="af-identity"><div className="af-mark">AF</div><div className="af-name"><h1>ARIMA FINANCE</h1><p>Quantitative Intelligence for Modern Financial Markets</p></div></div></section>;
}
