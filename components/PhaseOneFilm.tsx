"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureAnimationPlugins, gsap, ScrollTrigger } from "@/lib/animation-runtime";

const marketData = [
  "XAUUSD  2384.62", "BTCUSD  67241.30", "SPX  5297.14", "VOL  0.184",
  "ALPHA  +0.428", "BETA  1.180", "RISK  0.720", "LIQUIDITY",
  "EXECUTION", "SIGNAL  0.840", "VAR  1.62%", "σ  0.217",
  "Δ  0.428", "14:32:08Z", "ORDER FLOW", "MARKET DEPTH",
];

const institutionDistricts = [
  [["HSBC", "LIQUIDITY · CAPITAL"], ["Barclays", "CREDIT · MARKETS"]],
  [["JPMorgan", "GLOBAL BANKING"], ["Goldman Sachs", "CAPITAL · ADVISORY"], ["BlackRock", "ASSET ALLOCATION"], ["Morgan Stanley", "WEALTH · MARKETS"]],
  [["Bloomberg", "MARKET INFORMATION"], ["Nasdaq", "EXCHANGE DATA"]],
  [["UBS", "GLOBAL WEALTH"], ["Deutsche Bank", "FX · CREDIT"], ["Nomura", "GLOBAL MARKETS"]],
  [["Citadel", "QUANTITATIVE SYSTEMS"], ["Jane Street", "LIQUIDITY · EXECUTION"]],
  [["Bank of England", "MONETARY INFRASTRUCTURE"], ["CME Group", "DERIVATIVES · CLEARING"]],
];

const rotationLabels = ["CAPITAL", "LIQUIDITY", "RISK", "EXECUTION", "ALPHA", "MARKET DATA"];

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
  const dissolveParticles = useRef<HTMLSpanElement[]>([]);
  const cityScene = useRef<HTMLDivElement>(null);
  const cityCamera = useRef<HTMLDivElement>(null);
  const rotationChamber = useRef<HTMLDivElement>(null);
  const rotationPlanes = useRef<HTMLDivElement[]>([]);
  const cityFog = useRef<HTMLDivElement>(null);
  const avenue = useRef<HTMLDivElement>(null);
  const avenueWorld = useRef<HTMLDivElement>(null);
  const districts = useRef<HTMLDivElement[]>([]);
  const roadPulse = useRef<HTMLDivElement>(null);
  const destination = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !stage.current || !ensureAnimationPlugins()) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([cityScene.current, avenue.current, destination.current], { opacity: 1 });
        gsap.set([firstLight.current, candle.current, portal.current, dataCloud.current, convergence.current, afMark.current, identity.current, rotationChamber.current], { opacity: 0 });
        return;
      }

      const travel = innerWidth < 768 ? 10000 : 14000;
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "arima-film-master",
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
        .to(convergence.current, { opacity: .22, scale: 3.3, duration: 5 }, 95)

        .to([afMark.current, identity.current], { opacity: 0, scale: 1.35, filter: "blur(14px)", duration: 15, ease: "power2.in" }, 100)
        .fromTo(dissolveParticles.current, { opacity: 0, x: 0, y: 0, scale: .2 }, {
          opacity: .82,
          x: (index) => Math.cos(index * .73) * (220 + index * 13),
          y: (index) => Math.sin(index * .73) * (170 + index * 9),
          scale: 1,
          duration: 15,
          stagger: .08,
          ease: "power2.out",
        }, 100)
        .to(convergence.current, { opacity: 0, scale: 7, duration: 15 }, 100)
        .fromTo(cityScene.current, { opacity: 0 }, { opacity: 1, duration: 12 }, 108)
        .to(dissolveParticles.current, { opacity: 0, duration: 8 }, 113)

        .fromTo(rotationChamber.current, { rotateY: 0, rotateZ: 0 }, { rotateY: 360, rotateZ: 2, duration: 40, ease: "power1.inOut" }, 115)
        .fromTo(rotationPlanes.current, { opacity: .15, scale: .72 }, { opacity: .9, scale: 1, duration: 18, stagger: .7 }, 115)
        .to(cityCamera.current, { rotateZ: 7, rotateX: -3, duration: 10, ease: "sine.inOut" }, 115)
        .to(cityCamera.current, { rotateZ: -8, rotateX: 4, duration: 10, ease: "sine.inOut" }, 125)
        .fromTo(avenue.current, { opacity: 0, scale: .45, rotateY: -32 }, { opacity: .55, scale: .72, rotateY: 12, duration: 15 }, 130)
        .to(cityCamera.current, { rotateZ: 6, rotateX: -2, duration: 10, ease: "sine.inOut" }, 135)
        .to(avenue.current, { opacity: .8, scale: .9, rotateY: -8, duration: 10 }, 140)
        .to(cityCamera.current, { rotateZ: 0, rotateX: 0, duration: 10, ease: "sine.inOut" }, 145)
        .to(avenue.current, { opacity: 1, scale: 1, rotateY: 0, duration: 10, ease: "power2.out" }, 145)
        .to(rotationChamber.current, { opacity: 0, scale: 1.7, duration: 8 }, 152)

        .fromTo(avenueWorld.current, { scale: .68, y: 90 }, { scale: 1, y: 0, duration: 10, ease: "power2.out" }, 155)
        .fromTo(cityFog.current, { opacity: .05, scale: .7 }, { opacity: .48, scale: 1.15, duration: 18 }, 155)
        .fromTo(roadPulse.current, { yPercent: 110, opacity: 0 }, { yPercent: -170, opacity: .85, duration: 8, repeat: 1 }, 157)

        .fromTo(districts.current[0], { opacity: 0, y: 100, scale: .72 }, { opacity: 1, y: 0, scale: 1, duration: 7 }, 163)
        .to(avenueWorld.current, { scale: 1.15, x: -18, y: -14, duration: 8 }, 165)
        .fromTo(districts.current[1], { opacity: 0, y: 80, scale: .68 }, { opacity: 1, y: 0, scale: 1, duration: 8 }, 170)
        .to(districts.current[0], { opacity: .18, duration: 6 }, 172)
        .to(avenueWorld.current, { scale: 1.34, x: 22, y: -34, duration: 10 }, 171)
        .fromTo(districts.current[2], { opacity: 0, scale: .65 }, { opacity: 1, scale: 1, duration: 8 }, 178)
        .to(districts.current[1], { opacity: .2, duration: 6 }, 180)
        .to(avenueWorld.current, { scale: 1.52, x: -12, y: -52, duration: 9 }, 179)
        .fromTo(districts.current[3], { opacity: 0, scale: .62 }, { opacity: 1, scale: 1, duration: 7 }, 184)
        .to(districts.current[2], { opacity: .18, duration: 5 }, 186)
        .to(avenueWorld.current, { scale: 1.7, x: 18, y: -70, duration: 8 }, 185)
        .fromTo(districts.current[4], { opacity: 0, scale: .58 }, { opacity: 1, scale: 1, duration: 7 }, 189)
        .to(districts.current[3], { opacity: .15, duration: 5 }, 190)
        .fromTo(districts.current[5], { opacity: 0, scale: .55 }, { opacity: 1, scale: 1, duration: 6 }, 192)
        .to(districts.current[4], { opacity: .22, duration: 5 }, 194)
        .to(avenueWorld.current, { scale: 1.92, x: 0, y: -88, duration: 10, ease: "power1.inOut" }, 190)
        .fromTo(destination.current, { opacity: 0, scale: .25, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 5, ease: "power2.out" }, 195)
        .to(cityFog.current, { opacity: .22, duration: 5 }, 195);
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
        <div className="af-dissolve-particles" aria-hidden="true">{Array.from({ length: 30 }, (_, index) => <span ref={(node) => { if (node) dissolveParticles.current[index] = node; }} key={index}/>)}</div>

        <div ref={cityScene} className="financial-city" aria-label="Global financial landscape">
          <div ref={cityCamera} className="city-camera">
            <div ref={rotationChamber} className="rotation-chamber" aria-hidden="true">
              {rotationLabels.map((label, index) => <div ref={(node) => { if (node) rotationPlanes.current[index] = node; }} className="rotation-plane" style={{ "--r": `${index * 60}deg` } as React.CSSProperties} key={label}><span>{label}</span><i/><i/><i/></div>)}
            </div>

            <div ref={avenue} className="financial-avenue">
              <div ref={avenueWorld} className="avenue-world">
                <div ref={cityFog} className="city-fog"/>
                <div className="financial-road"><i/><i/><i/><div ref={roadPulse} className="road-pulse"/></div>
                <div className="city-sky-lines" aria-hidden="true"><span/><span/><span/><span/><span/></div>
                <div className="institution-districts">
                  {institutionDistricts.map((district, districtIndex) => <div ref={(node) => { if (node) districts.current[districtIndex] = node; }} className={`institution-district district-${districtIndex + 1}`} key={districtIndex}>
                    {district.map(([name, data], index) => <article className={`city-building side-${index % 2 ? "right" : "left"} building-${index + 1}`} key={name}>
                      <div className="building-crown"/><div className="building-windows"/><strong>{name}</strong><small>{data}</small><div className="building-ticker">{marketData[(districtIndex * 2 + index) % marketData.length]}</div>
                    </article>)}
                  </div>)}
                </div>
                <div ref={destination} className="arima-destination"><span>AF</span><strong>ARIMA FINANCE</strong></div>
              </div>
            </div>
          </div>
          <small className="institution-disclaimer">Institution names are shown as part of the global financial landscape and do not imply affiliation, partnership or endorsement.</small>
        </div>
      </div>
    </section>
  </main>;
}
