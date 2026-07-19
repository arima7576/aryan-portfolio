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

const intelligenceStreams = ["VALUATION", "RESEARCH", "RISK", "ALLOCATION", "MARKET DATA", "EXECUTION"];
const divisionDetails = [
  {
    index: "01",
    title: "Investment Banking & Financial Intelligence",
    lead: "Institutional research and decision intelligence",
    items: ["Financial modelling", "Valuation", "Investment research", "Investment memoranda", "Market intelligence", "Company analysis", "Scenario analysis", "Forecasting", "Financial data engineering", "Risk analysis", "Quantitative modelling", "Capital market research", "Professional presentation materials"],
  },
  {
    index: "02",
    title: "Projects & Technology",
    lead: "Arima Finance Engine",
    items: ["Algorithmic trading systems", "Financial data platforms", "AI research", "Quantitative tools", "Trading automation", "Risk management systems", "Financial dashboards", "Portfolio analytics", "Technology prototypes", "Research projects", "Client and collaborative projects", "Personal Risk Management Core"],
  },
  {
    index: "03",
    title: "AF Portfolio Lab",
    lead: "Live-funded research environment",
    items: ["Equities", "IPO opportunities", "Options", "Cash", "Limited futures allocation", "Portfolio value", "Weekly return", "Total return", "Drawdown", "Allocation", "Risk score", "Open positions", "Asset allocation", "Performance charts", "Exposure"],
  },
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
  const headquarters = useRef<HTMLDivElement>(null);
  const entrance = useRef<HTMLDivElement>(null);
  const entranceDoors = useRef<HTMLDivElement[]>([]);
  const hall = useRef<HTMLDivElement>(null);
  const hallRing = useRef<HTMLDivElement>(null);
  const intelligenceCore = useRef<HTMLDivElement>(null);
  const coreShells = useRef<HTMLSpanElement[]>([]);
  const coreIdentity = useRef<HTMLDivElement>(null);
  const coreStreams = useRef<HTMLSpanElement[]>([]);
  const divisionOrbit = useRef<HTMLDivElement>(null);
  const divisionPlatforms = useRef<HTMLElement[]>([]);
  const portfolioDisclosure = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !stage.current || !ensureAnimationPlugins()) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([cityScene.current, avenue.current, headquarters.current, hall.current, divisionOrbit.current, portfolioDisclosure.current], { opacity: 1 });
        gsap.set(destination.current, { opacity: 0 });
        gsap.set([firstLight.current, candle.current, portal.current, dataCloud.current, convergence.current, afMark.current, identity.current, rotationChamber.current], { opacity: 0 });
        return;
      }

      const travel = innerWidth < 768 ? 16000 : 22000;
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
        .to(cityFog.current, { opacity: .22, duration: 5 }, 195)

        .fromTo(headquarters.current, { opacity: 0 }, { opacity: 1, duration: 8 }, 200)
        .to(destination.current, { scale: 3.4, y: 80, opacity: 0, filter: "blur(10px)", duration: 18, ease: "power2.in" }, 200)
        .to(avenueWorld.current, { scale: 2.55, y: -130, opacity: .18, duration: 18, ease: "power2.in" }, 200)
        .fromTo(entrance.current, { opacity: 0, scale: .35, z: -500 }, { opacity: 1, scale: 1, z: 0, duration: 18, ease: "power2.inOut" }, 200)
        .to(entrance.current, { filter: "brightness(1.5)", duration: 8 }, 212)
        .to(entranceDoors.current[0], { xPercent: -110, duration: 9, ease: "power2.inOut" }, 216)
        .to(entranceDoors.current[1], { xPercent: 110, duration: 9, ease: "power2.inOut" }, 216)
        .to(entrance.current, { scale: 5.4, opacity: 0, duration: 12, ease: "power3.in" }, 224)
        .fromTo(hall.current, { opacity: 0, scale: 1.45 }, { opacity: 1, scale: 1, duration: 12, ease: "power2.out" }, 226)
        .fromTo(hallRing.current, { rotateX: 68, rotateZ: -18, scale: .65 }, { rotateX: 58, rotateZ: 0, scale: 1, duration: 18 }, 228)
        .fromTo(coreStreams.current, { opacity: 0, scaleX: .15 }, { opacity: .78, scaleX: 1, duration: 15, stagger: .6 }, 230)

        .fromTo(intelligenceCore.current, { opacity: 0, scale: .18 }, { opacity: 1, scale: 1, duration: 16, ease: "power2.out" }, 230)
        .fromTo(coreShells.current, { rotate: -55, scale: .45, opacity: 0 }, { rotate: 0, scale: 1, opacity: 1, duration: 18, stagger: 1.2 }, 232)
        .to(coreShells.current[0], { x: -150, rotateY: -62, duration: 12, ease: "power2.inOut" }, 246)
        .to(coreShells.current[1], { x: 150, rotateY: 62, duration: 12, ease: "power2.inOut" }, 246)
        .fromTo(coreIdentity.current, { opacity: 0, scale: .7, letterSpacing: ".5em" }, { opacity: 1, scale: 1, letterSpacing: ".16em", duration: 12, ease: "power2.out" }, 246)
        .to(hall.current, { rotateY: -13, rotateX: 2, duration: 18, ease: "sine.inOut" }, 250)
        .to(hall.current, { rotateY: 12, rotateX: -2, duration: 18, ease: "sine.inOut" }, 268)

        .to([intelligenceCore.current, coreIdentity.current], { scale: .42, opacity: .32, duration: 12, ease: "power2.inOut" }, 270)
        .fromTo(divisionOrbit.current, { opacity: 0, scale: .5, rotateY: -26 }, { opacity: 1, scale: 1, rotateY: 0, duration: 14, ease: "power2.out" }, 272)
        .fromTo(divisionPlatforms.current, { opacity: 0, y: 160, rotateX: 18 }, { opacity: 1, y: 0, rotateX: 0, duration: 14, stagger: 3, ease: "power2.out" }, 274)
        .to(divisionOrbit.current, { rotateY: -18, rotateX: 2, duration: 17, ease: "sine.inOut" }, 284)
        .to(divisionOrbit.current, { rotateY: 18, rotateX: -2, duration: 17, ease: "sine.inOut" }, 301)
        .to(divisionPlatforms.current[0], { opacity: .28, scale: .88, duration: 8 }, 292)
        .to(divisionPlatforms.current[1], { opacity: .32, scale: .9, duration: 8 }, 302)
        .to(divisionPlatforms.current[2], { scale: 1.08, duration: 10 }, 302)
        .fromTo(portfolioDisclosure.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 10 }, 310);
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

        <div ref={headquarters} className="af-headquarters" aria-label="Arima Finance intelligence headquarters">
          <div ref={entrance} className="af-entrance">
            <div className="entrance-emblem"><span>AF</span><small>ARIMA FINANCE</small></div>
            <div ref={(node) => { if (node) entranceDoors.current[0] = node; }} className="entrance-door door-left"/>
            <div ref={(node) => { if (node) entranceDoors.current[1] = node; }} className="entrance-door door-right"/>
            <div className="entrance-floor"><i/><i/><i/></div>
          </div>

          <div ref={hall} className="intelligence-hall">
            <div className="hall-architecture" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
            <div ref={hallRing} className="hall-ring" aria-hidden="true"><i/><i/><i/></div>
            <div className="core-streams" aria-hidden="true">{intelligenceStreams.map((stream, index) => <span ref={(node) => { if (node) coreStreams.current[index] = node; }} style={{ "--stream": index } as React.CSSProperties} key={stream}><b>{stream}</b></span>)}</div>

            <div ref={intelligenceCore} className="intelligence-core">
              <span ref={(node) => { if (node) coreShells.current[0] = node; }} className="core-shell shell-a"/>
              <span ref={(node) => { if (node) coreShells.current[1] = node; }} className="core-shell shell-b"/>
              <i className="core-light"/>
            </div>
            <div ref={coreIdentity} className="core-identity">
              <span>AF</span><strong>ARIMA FINANCE</strong><small>Financial Intelligence</small>
              <div><b>Research</b><b>Portfolio Solutions</b></div>
            </div>

            <div ref={divisionOrbit} className="division-orbit">
              {divisionDetails.map((division, divisionIndex) => <article ref={(node) => { if (node) divisionPlatforms.current[divisionIndex] = node; }} className={`division-platform division-${divisionIndex + 1}`} key={division.title}>
                <div className="platform-surface"><span>{division.index}</span><small>{division.lead}</small><h2>{division.title}</h2>
                  {divisionIndex === 1 && <strong className="engine-emphasis">ARIMA FINANCE ENGINE</strong>}
                  {divisionIndex === 2 && <p>A live-funded research environment using the founder&apos;s own capital to study structured allocation and risk management.</p>}
                  <div className="division-data">{division.items.map((item) => <i key={item}>{item}</i>)}</div>
                  {divisionIndex === 2 && <div className="portfolio-metrics"><b>PORTFOLIO VALUE</b><b>WEEKLY RETURN</b><b>DRAWDOWN</b><b>RISK SCORE</b><svg viewBox="0 0 420 80"><path d="M0 65 C45 48 72 62 105 39 S168 51 202 24 S264 41 300 20 S364 27 420 5"/></svg></div>}
                </div>
              </article>)}
            </div>

            <div ref={portfolioDisclosure} className="model-disclosure"><strong>Model Portfolio Disclosure</strong><span>The investor profiles presented are internal research models. The underlying capital belongs to the founder. Arima Finance does not currently manage external client assets through these profiles. Information is presented for research, demonstration and technology-development purposes only.</span></div>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
