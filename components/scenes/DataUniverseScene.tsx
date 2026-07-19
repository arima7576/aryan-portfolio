"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureAnimationPlugins, gsap } from "@/lib/animation-runtime";

const streams = [
  ["XAUUSD", "2384.62", "BID 2384.58", "ASK 2384.66", "VOL 0.184"],
  ["BTCUSD", "67241.30", "ALPHA +0.42", "BETA 1.18", "RISK 0.72"],
  ["SPX", "5297.14", "LIQUIDITY", "EXECUTION", "SIGNAL 0.84"],
  ["PORTFOLIO", "VAR 1.62%", "Δ 0.428", "σ 0.217", "T 14:32:08Z"],
];

export function DataUniverseScene({ compact }: { compact: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    console.log("[Arima Animation] DataUniverseScene timeline effect", { compact, refsReady: Boolean(root.current) });
    if (!ensureAnimationPlugins()) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.utils.toArray<HTMLElement>(".data-stream").forEach((stream, index) => {
      gsap.fromTo(stream, { yPercent: index % 2 ? 30 : -20, opacity: .15 }, { yPercent: index % 2 ? -25 : 25, opacity: .75, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.fromTo(".data-horizon", { scaleX: .1 }, { scaleX: 1, scrollTrigger: { trigger: root.current, start: "top 70%", end: "center center", scrub: true } });
    console.log("[Arima Animation] DataUniverseScene timelines created");
  }, { scope: root, dependencies: [compact], revertOnUpdate: true });
  return <section ref={root} className={`scene data-scene ${compact ? "compact-scene" : ""}`} aria-label="Institutional market data universe">
    <div className="data-grid" aria-hidden="true"/><div className="data-horizon" aria-hidden="true"/>
    <div className="data-streams" aria-hidden="true">{streams.map((items, i) => <div className="data-stream" key={i}>{[...items, ...items, ...items].map((item, j) => <span key={j}>{item}</span>)}</div>)}</div>
    <div className="scene-copy"><p className="eyebrow">01 / MARKET INFRASTRUCTURE</p><h2>Every decision begins<br/>as <em>data.</em></h2><p>Prices. Liquidity. Volatility. Risk. A continuous information system beneath modern financial markets.</p></div>
  </section>;
}
