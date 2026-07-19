"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const institutions = ["JPMorgan", "Goldman Sachs", "Morgan Stanley", "BlackRock", "Bloomberg", "Citadel", "Jane Street", "Barclays", "HSBC", "UBS", "Deutsche Bank", "Nomura", "Bank of England", "Nasdaq", "CME Group"];

export function InstitutionScene({ compact }: { compact: boolean }) {
  const root = useRef<HTMLElement>(null); const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (compact || matchMedia("(prefers-reduced-motion: reduce)").matches || innerWidth < 768) return;
    gsap.to(track.current, { xPercent: -50, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", scrub: 1, pin: true } });
  }, { scope: root, dependencies: [compact], revertOnUpdate: true });
  return <section ref={root} className={`scene institution-scene ${compact ? "compact-scene" : ""}`} aria-label="Global financial ecosystem">
    <div ref={track} className="institution-track"><div className="institution-panel"><div className="scene-copy"><p className="eyebrow">02 / GLOBAL FINANCIAL ECOSYSTEM</p><h2>Capital moves through a<br/>connected landscape.</h2></div><div className="institution-cloud">{institutions.slice(0,8).map((name,i)=><span style={{"--depth":i%4} as React.CSSProperties} key={name}>{name}</span>)}</div></div><div className="institution-panel second"><div className="institution-cloud">{institutions.slice(8).map((name,i)=><span style={{"--depth":(i+2)%4} as React.CSSProperties} key={name}>{name}</span>)}</div><div className="scene-copy"><p className="eyebrow">THE MARKET LANDSCAPE</p><h2>Research. Infrastructure.<br/>Institutions. Intelligence.</h2></div></div></div>
    <p className="landscape-disclaimer">Industry names represent the wider financial landscape only. No affiliation, endorsement or partnership is implied.</p>
  </section>;
}
