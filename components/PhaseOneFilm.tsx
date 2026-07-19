"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureAnimationPlugins, gsap, ScrollTrigger } from "@/lib/animation-runtime";

const marketData = [
  "XAUUSD  2384.62", "BTCUSD  67241.30", "SPX  5297.14", "VOL  0.184",
  "ALPHA  +0.428", "BETA  1.180", "RISK  0.720", "LIQUIDITY",
  "EXECUTION", "SIGNAL  0.840", "VAR  1.62%", "σ  0.217",
  "Δ  0.428", "14:32:08Z", "ORDER FLOW", "MARKET DEPTH",
];

export function PhaseOneFilm() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ambient = useRef<HTMLDivElement>(null);
  const firstLight = useRef<HTMLDivElement>(null);
  const candle = useRef<HTMLDivElement>(null);
  const candleBody = useRef<HTMLDivElement>(null);
  const candleWick = useRef<HTMLDivElement>(null);
  const portal = useRef<HTMLDivElement>(null);
  const universe = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dataCloud = useRef<HTMLDivElement>(null);
  const dataItems = useRef<HTMLSpanElement[]>([]);
  const chartPaths = useRef<SVGPathElement[]>([]);
  const convergence = useRef<HTMLDivElement>(null);
  const afMark = useRef<SVGSVGElement>(null);
  const afPaths = useRef<SVGPathElement[]>([]);
  const identity = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !stage.current || !ensureAnimationPlugins()) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([ambient.current, universe.current, afMark.current, identity.current], { opacity: 1 });
        gsap.set(afPaths.current, { strokeDashoffset: 0 });
        gsap.set([firstLight.current, candle.current, portal.current, dataCloud.current, convergence.current], { opacity: 0 });
        return;
      }

      const travel = innerWidth < 768 ? 5000 : 7000;
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "phase-one-master",
          trigger: root.current,
          start: "top top",
          end: `+=${travel}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .set(stage.current, { backgroundColor: "#000" }, 0)
        .fromTo(firstLight.current, { opacity: 0, scale: .05 }, { opacity: 1, scale: 1, duration: 10 }, 0)
        .fromTo(ambient.current, { opacity: 0 }, { opacity: .45, duration: 10 }, 0)

        .fromTo(candle.current, { opacity: 0, scale: .08, rotate: -5 }, { opacity: 1, scale: .42, rotate: 0, duration: 7 }, 10)
        .fromTo(candleBody.current, { height: 2, width: 22, borderRadius: 30 }, { height: 230, width: 82, borderRadius: 5, duration: 11 }, 10)
        .fromTo(candleWick.current, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 9 }, 13)
        .to(firstLight.current, { opacity: .35, scale: 2.6, duration: 10 }, 15)

        .to(candle.current, { scale: 5.5, z: 500, duration: 20, ease: "power2.in" }, 25)
        .to(candleBody.current, { boxShadow: "0 0 140px 45px rgba(123,190,255,.52)", duration: 20 }, 25)
        .to(ambient.current, { opacity: .9, scale: 1.7, duration: 20 }, 25)

        .fromTo(portal.current, { opacity: 0, scale: .1 }, { opacity: 1, scale: 9, duration: 15, ease: "power3.in" }, 45)
        .to(candle.current, { scale: 24, opacity: 0, filter: "blur(8px)", duration: 15, ease: "power3.in" }, 45)
        .to(stage.current, { backgroundColor: "#020817", duration: 15 }, 45)

        .fromTo(universe.current, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 8 }, 58)
        .fromTo(grid.current, { opacity: 0, rotateX: 72, yPercent: 42 }, { opacity: .8, rotateX: 58, yPercent: 5, duration: 18 }, 60)
        .fromTo(dataCloud.current, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 8 }, 60)
        .fromTo(dataItems.current, { opacity: 0, z: -900, yPercent: 80 }, { opacity: .88, z: 260, yPercent: -35, duration: 20, stagger: { each: .35, from: "random" } }, 60)
        .fromTo(chartPaths.current, { strokeDashoffset: 1200, opacity: 0 }, { strokeDashoffset: 0, opacity: .75, duration: 18, stagger: 1.5 }, 62)

        .to(dataItems.current, { x: 0, y: 0, z: 0, scale: .12, opacity: 0, duration: 15, stagger: { each: .18, from: "edges" }, ease: "power2.in" }, 80)
        .to(chartPaths.current, { scale: .12, opacity: 0, transformOrigin: "50% 50%", duration: 12 }, 81)
        .fromTo(convergence.current, { opacity: 0, scale: .1 }, { opacity: 1, scale: 2.4, duration: 12 }, 80)
        .fromTo(afMark.current, { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: 12 }, 83)
        .fromTo(afPaths.current, { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 13, stagger: .7, ease: "power2.out" }, 82)
        .to([grid.current, dataCloud.current], { opacity: 0, duration: 10 }, 85)

        .fromTo(identity.current, { opacity: 0, y: 36, letterSpacing: ".6em" }, { opacity: 1, y: 0, letterSpacing: ".28em", duration: 5, ease: "power2.out" }, 95)
        .to(convergence.current, { opacity: .22, scale: 3.3, duration: 5 }, 95);
    }, root);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return <main className="phase-one-root">
    <section ref={root} className="phase-one-film" aria-label="Arima Finance cinematic identity sequence">
      <div ref={stage} className="film-stage">
        <div ref={ambient} className="film-ambient" aria-hidden="true"/>
        <div ref={firstLight} className="first-light" aria-hidden="true"/>

        <div ref={candle} className="film-candle" aria-hidden="true">
          <div ref={candleWick} className="film-candle-wick"/>
          <div ref={candleBody} className="film-candle-body"/>
        </div>
        <div ref={portal} className="candle-portal" aria-hidden="true"/>

        <div ref={universe} className="data-universe" aria-hidden="true">
          <div ref={grid} className="depth-grid"/>
          <svg className="market-chart chart-a" viewBox="0 0 1200 400">
            <path ref={(node) => { if (node) chartPaths.current[0] = node; }} pathLength="1200" d="M0 315 C90 260 145 340 220 250 S360 130 430 205 S570 330 650 190 S800 85 875 165 S1020 260 1200 60"/>
          </svg>
          <svg className="market-chart chart-b" viewBox="0 0 1200 400">
            <path ref={(node) => { if (node) chartPaths.current[1] = node; }} pathLength="1200" d="M0 210 C110 120 180 300 285 180 S450 90 530 240 S700 300 770 150 S950 80 1200 205"/>
          </svg>
          <div ref={dataCloud} className="market-data-cloud">
            {marketData.map((value, index) => <span
              ref={(node) => { if (node) dataItems.current[index] = node; }}
              style={{ "--x": `${(index * 47) % 92 + 4}%`, "--y": `${(index * 31) % 82 + 8}%`, "--d": index % 5 } as React.CSSProperties}
              key={value}
            >{value}</span>)}
          </div>
        </div>

        <div ref={convergence} className="data-convergence" aria-hidden="true"/>
        <div className="film-identity">
          <svg ref={afMark} className="af-film-mark" viewBox="0 0 520 300" role="img" aria-label="AF">
            <path ref={(node) => { if (node) afPaths.current[0] = node; }} pathLength="900" d="M55 245 L165 45 L275 245 M105 158 H225"/>
            <path ref={(node) => { if (node) afPaths.current[1] = node; }} pathLength="900" d="M305 245 V45 H475 M305 142 H442"/>
          </svg>
          <div ref={identity} className="af-film-name"><strong>ARIMA FINANCE</strong><span>QUANTITATIVE INTELLIGENCE</span></div>
        </div>
      </div>
    </section>
  </main>;
}
