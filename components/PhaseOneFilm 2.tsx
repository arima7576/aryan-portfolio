"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ensureAnimationPlugins, gsap, ScrollTrigger } from "@/lib/animation-runtime";
import { UniverseHall } from "@/components/cinematic/UniverseHall";

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
  const router = useRouter();
  const [universeMode, setUniverseMode] = useState(false);
  const gsapContextRef = useRef<gsap.Context | null>(null);
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
  const transitionBeam = useRef<HTMLDivElement>(null);
  const transitionDarkness = useRef<HTMLDivElement>(null);

  // ─── New: Scene darkness overlays (Acts 5-9) ───
  const sceneDarkness1 = useRef<HTMLDivElement>(null);
  const sceneDarkness2 = useRef<HTMLDivElement>(null);
  const sceneDarkness3 = useRef<HTMLDivElement>(null);
  const sceneDarkness4 = useRef<HTMLDivElement>(null);
  const sceneDarkness5 = useRef<HTMLDivElement>(null);
  const lastMarketDarkness = useRef<HTMLDivElement>(null);
  const afMomentGlow = useRef<HTMLDivElement>(null);

  // ─── Preserved architectural assets ───
  const finalAfReveal = useRef<HTMLDivElement>(null);
  const finalActions = useRef<HTMLDivElement>(null);
  const postAfHeadquarters = useRef<HTMLDivElement>(null);
  const postAfDust = useRef<HTMLSpanElement[]>([]);
  const postAfColumns = useRef<HTMLElement[]>([]);
  const postAfLight = useRef<HTMLDivElement>(null);
  const postAfBridge = useRef<HTMLDivElement>(null);
  const grandCentral = useRef<HTMLDivElement>(null);
  const grandAtmosphere = useRef<HTMLDivElement>(null);
  const hallNarrative = useRef<HTMLDivElement>(null);
  const grandDoors = useRef<HTMLElement[]>([]);
  const directorSequence = useRef<HTMLDivElement>(null);
  const directorCamera = useRef<HTMLDivElement>(null);
  const directorWalls = useRef<HTMLElement[]>([]);
  const directorBridge = useRef<HTMLDivElement>(null);
  const directorVault = useRef<HTMLDivElement>(null);
  const directorGateways = useRef<HTMLElement[]>([]);
  const directorLabels = useRef<HTMLDivElement>(null);
  const directorAf = useRef<HTMLDivElement>(null);

  const cleanupCinematicPinning = () => {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.id === 'arima-film-master') st.kill();
    });
    const spacers = document.querySelectorAll('.gsap-spacer, [data-gsap-spacer]');
    spacers.forEach((el) => el.remove());
    if (root.current) gsap.set(root.current, { clearProps: 'all' });
    if (stage.current) gsap.set(stage.current, { clearProps: 'all' });
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.height = '';
    document.documentElement.style.height = '';
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
      gsapContextRef.current = null;
    }
    ScrollTrigger.refresh();
  };

  const replayJourney = () => {
    setUniverseMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enterUniverse = () => {
    cleanupCinematicPinning();
    setUniverseMode(true);
    window.setTimeout(() => {
      const el = document.getElementById("arima-central-hall");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const enterGateway = (path: string) => router.push(path);

  useLayoutEffect(() => {
    if (!root.current || !stage.current || !ensureAnimationPlugins()) return;
    if (universeMode) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([cityScene.current, avenue.current, headquarters.current, hall.current, divisionOrbit.current, portfolioDisclosure.current, finalAfReveal.current, postAfHeadquarters.current, grandCentral.current], { opacity: 1 });
        gsap.set(destination.current, { opacity: 0 });
        gsap.set([firstLight.current, candle.current, portal.current, dataCloud.current, convergence.current, afMark.current, identity.current, rotationChamber.current, lastMarketDarkness.current], { opacity: 0 });
        return;
      }

      const travel = innerWidth < 768 ? 41500 : 56440;
      const C = "power4.out";
      const CI = "power2.in";
      const CIN = "power3.in";
      const grandDoorText = grandDoors.current.flatMap((door) => Array.from(door.querySelectorAll<HTMLElement>("small, strong, em")));

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
        // ─── ACT 1: THE VOID ───
        .set(stage.current, { backgroundColor: "#000" }, 0)
        .set([
          universe.current,
          convergence.current,
          afMark.current,
          identity.current,
          cityScene.current,
          headquarters.current,
          hall.current,
          postAfHeadquarters.current,
          grandCentral.current,
          grandAtmosphere.current,
          directorSequence.current,
          finalAfReveal.current,
          finalActions.current,
          sceneDarkness1.current,
          sceneDarkness2.current,
          sceneDarkness3.current,
          sceneDarkness4.current,
          sceneDarkness5.current,
          lastMarketDarkness.current,
          afMomentGlow.current,
        ], { opacity: 0 }, 0)
        .set(stage.current, { attr: { "data-acoustic": "intimate", "data-story-act": "void" } }, 0)
        .fromTo(firstLight.current, { opacity: 0, scale: .05 }, { opacity: 1, scale: 1, duration: 10, ease: C }, 0)
        .fromTo(ambient.current, { opacity: 0 }, { opacity: .45, duration: 10, ease: C }, 0)
        .fromTo(candle.current, { opacity: 0, scale: .08, rotate: -5 }, { opacity: 1, scale: .42, rotate: 0, duration: 7, ease: C }, 10)
        .fromTo(candleBody.current, { height: 2, width: 22, borderRadius: 30 }, { height: 230, width: 82, borderRadius: 5, duration: 11, ease: C }, 10)
        .fromTo(candleWick.current, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 9, ease: C }, 13)
        .to(candle.current, { rotate: -0.5, duration: 3, ease: "sine.inOut" }, 18)
        .to(candle.current, { rotate: 0.5, duration: 3, ease: "sine.inOut" }, 21)
        .to(firstLight.current, { opacity: .35, scale: 2.6, duration: 10, ease: C }, 15)
        .to(candle.current, { scale: 4.2, z: 200, duration: 4, ease: CI }, 25)
        .to(candle.current, { scale: 5.5, z: 500, duration: 16, ease: "power2.in" }, 29)
        .to(candleBody.current, { boxShadow: "0 0 140px 45px rgba(123,190,255,.52)", duration: 20 }, 25)
        .to(ambient.current, { opacity: .9, scale: 1.7, duration: 20 }, 25)
        .fromTo(portal.current, { opacity: 0, scale: .1, rotateZ: -2 }, { opacity: 1, scale: 9, rotateZ: 2, duration: 15, ease: CIN }, 45)
        .to(candle.current, { scale: 24, opacity: 0, filter: "blur(8px)", duration: 15, ease: CIN }, 45)
        .to(stage.current, { backgroundColor: "#020817", duration: 15 }, 45)
        .to(ambient.current, { opacity: .72, scale: 1.12, duration: 4, ease: "sine.inOut" }, 58)
        .set(stage.current, { attr: { "data-acoustic": "outdoor", "data-story-act": "market" } }, 58)

        // ─── ACT 2: THE MARKET ───
        .fromTo(universe.current, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 8, ease: C }, 62)
        .fromTo(grid.current, { opacity: 0, rotateX: 72, yPercent: 42 }, { opacity: .8, rotateX: 58, yPercent: 5, duration: 18, ease: C }, 64)
        .fromTo(dataCloud.current, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 8, ease: C }, 64)
        .fromTo(dataItems.current, { opacity: 0, z: -900, yPercent: 80 }, { opacity: .88, z: 260, yPercent: -35, duration: 20, stagger: { each: .35, from: "random" }, ease: C }, 64)
        .fromTo(chartPaths.current, { strokeDashoffset: 1200, opacity: 0 }, { strokeDashoffset: 0, opacity: .75, duration: 18, stagger: 1.5, ease: C }, 66)
        .to(universe.current, { rotateZ: 0.8, duration: 8, ease: "sine.inOut" }, 72)
        .to(universe.current, { rotateZ: -0.5, duration: 8, ease: "sine.inOut" }, 80)
        .to(dataItems.current, { x: 0, y: 0, z: 0, scale: .12, opacity: 0, duration: 15, stagger: { each: .18, from: "edges" }, ease: CI }, 84)
        .to(chartPaths.current, { scale: .12, opacity: 0, transformOrigin: "50% 50%", duration: 12, ease: CI }, 85)
        .set(stage.current, { attr: { "data-story-act": "data-universe" } }, 84)
        .fromTo(convergence.current, { opacity: 0, scale: .1 }, { opacity: 1, scale: 2.4, duration: 12, ease: C }, 84)
        // ─── ACT 3: THE DATA UNIVERSE → ACT 4: AF ───
        .fromTo(afMark.current, { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: 12, ease: C }, 87)
        .set(stage.current, { attr: { "data-story-act": "af" } }, 87)
        .fromTo(afPaths.current, { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 13, stagger: .7, ease: C }, 86)
        .to([grid.current, dataCloud.current], { opacity: 0, duration: 10, ease: C }, 89)
        .to(convergence.current, { opacity: .36, scale: 2.8, duration: 3, ease: "sine.inOut" }, 94)
        .fromTo(identity.current, { opacity: 0, y: 36, letterSpacing: ".6em" }, { opacity: 1, y: 0, letterSpacing: ".28em", duration: 5, ease: C }, 98)
        .to(convergence.current, { opacity: .22, scale: 3.3, duration: 5, ease: C }, 98)
        .to(identity.current, { y: -2, duration: 6, ease: "sine.inOut" }, 101)
        .to(identity.current, { y: 1, duration: 6, ease: "sine.inOut" }, 107)
        .to([afMark.current, identity.current], { opacity: 0, scale: 1.35, filter: "blur(14px)", duration: 15, ease: CI }, 106)
        .fromTo(dissolveParticles.current, { opacity: 0, x: 0, y: 0, scale: .2 }, {
          opacity: .82,
          x: (index: number) => Math.cos(index * .73) * (220 + index * 13),
          y: (index: number) => Math.sin(index * .73) * (170 + index * 9),
          scale: 1, duration: 15, stagger: .08, ease: C,
        }, 106)
        .to(convergence.current, { opacity: 0, scale: 7, duration: 15, ease: C }, 106)
        // ─── POST-AF: ONE CONTINUOUS FILM ───
        .set(stage.current, { attr: { "data-acoustic": "outdoor", "data-story-act": "financial-city" } }, 114)
        .fromTo(cityScene.current, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: 10, ease: C }, 114)
        .fromTo(rotationChamber.current, { opacity: 0, scale: .56, rotateY: -28 }, { opacity: .9, scale: 1, rotateY: 360, duration: 34, ease: "power1.inOut" }, 118)
        .fromTo(rotationPlanes.current, { opacity: 0, z: -260, scale: .7 }, { opacity: .82, z: 0, scale: 1, duration: 18, stagger: 1.2, ease: C }, 120)
        .fromTo(avenue.current, { opacity: 0, scale: .34, rotateY: -30 }, { opacity: .92, scale: 1, rotateY: 0, duration: 22, ease: C }, 134)
        .fromTo(cityCamera.current, { rotateZ: -8, rotateX: 4, y: 24 }, { rotateZ: 7, rotateX: -3, y: -12, duration: 18, ease: "sine.inOut" }, 126)
        .to(cityCamera.current, { rotateZ: -5, rotateX: 2, x: 22, duration: 18, ease: "sine.inOut" }, 144)
        .fromTo(avenueWorld.current, { scale: .7, y: 90 }, { scale: 1.55, y: -42, duration: 28, ease: CIN }, 146)
        .fromTo(cityFog.current, { opacity: 0, scale: .7 }, { opacity: .52, scale: 1.3, duration: 20, ease: C }, 148)
        .fromTo(roadPulse.current, { yPercent: 110, opacity: 0 }, { yPercent: -180, opacity: .9, duration: 9, repeat: 2, ease: "none" }, 150)
        .fromTo(districts.current, { opacity: 0, y: 100, scale: .62 }, { opacity: 1, y: 0, scale: 1, duration: 10, stagger: 3, ease: C }, 152)
        .to(rotationChamber.current, { opacity: 0, scale: 1.7, duration: 12, ease: CI }, 166)
        .to(cityCamera.current, { rotateZ: 3, rotateX: -2, x: -18, duration: 16, ease: "sine.inOut" }, 166)
        .fromTo(destination.current, { opacity: 0, scale: .2, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 10, ease: C }, 174)
        .to(avenueWorld.current, { scale: 2.2, y: -112, opacity: .22, duration: 22, ease: CIN }, 176)
        .to(destination.current, { scale: 3.2, y: 70, opacity: 0, filter: "blur(12px)", duration: 18, ease: CI }, 178)

        .set(stage.current, { attr: { "data-story-act": "headquarters", "data-acoustic": "outdoor" } }, 190)
        .fromTo(headquarters.current, { opacity: 0 }, { opacity: 1, duration: 9, ease: C }, 190)
        .fromTo(entrance.current, { opacity: 0, scale: .28, z: -620 }, { opacity: 1, scale: 1, z: 0, duration: 22, ease: "power2.inOut" }, 190)
        .to(cityScene.current, { opacity: 0, scale: 1.12, duration: 18, ease: CI }, 190)
        .to(entrance.current, { filter: "brightness(1.6)", scale: 1.08, duration: 14, ease: C }, 210)
        .to(entranceDoors.current[0], { xPercent: -110, duration: 10, ease: "power2.inOut" }, 220)
        .to(entranceDoors.current[1], { xPercent: 110, duration: 10, ease: "power2.inOut" }, 220)
        .to(entrance.current, { scale: 4.8, opacity: 0, duration: 14, ease: CIN }, 228)
        .set(stage.current, { attr: { "data-acoustic": "cathedral" } }, 236)
        .fromTo(hall.current, { opacity: 0, scale: 1.5, rotateY: -8 }, { opacity: 1, scale: 1, rotateY: 0, duration: 16, ease: C }, 236)
        .fromTo(hallRing.current, { opacity: 0, rotateX: 70, rotateZ: -20, scale: .55 }, { opacity: 1, rotateX: 58, rotateZ: 0, scale: 1, duration: 22, ease: C }, 238)
        .fromTo(coreStreams.current, { opacity: 0, scaleX: .12 }, { opacity: .8, scaleX: 1, duration: 18, stagger: .8, ease: C }, 242)
        .fromTo(intelligenceCore.current, { opacity: 0, scale: .14 }, { opacity: 1, scale: 1, duration: 18, ease: C }, 244)
        .fromTo(coreShells.current, { opacity: 0, scale: .35, rotate: -50 }, { opacity: 1, scale: 1, rotate: 0, duration: 20, stagger: 1.3, ease: C }, 246)
        .fromTo(coreIdentity.current, { opacity: 0, scale: .72, letterSpacing: ".5em" }, { opacity: 1, scale: 1, letterSpacing: ".16em", duration: 14, ease: C }, 260)
        .to(hall.current, { rotateY: -10, rotateX: 2, scale: 1.08, duration: 18, ease: "sine.inOut" }, 258)
        .to(hall.current, { rotateY: 10, rotateX: -2, scale: 1.13, duration: 18, ease: "sine.inOut" }, 276)
        .to([intelligenceCore.current, coreIdentity.current, hallRing.current, coreStreams.current], { opacity: 0, scale: .84, duration: 14, ease: CI }, 288)

        .set(stage.current, { attr: { "data-story-act": "headquarters-approach" } }, 290)
        .fromTo(postAfHeadquarters.current, { opacity: 0, scale: 1.3, y: 68 }, { opacity: 1, scale: 1, y: 0, duration: 16, ease: C }, 290)
        .fromTo(postAfColumns.current, { opacity: 0, y: 180, scaleY: .42 }, { opacity: 1, y: 0, scaleY: 1, duration: 18, stagger: 1, ease: C }, 294)
        .fromTo(postAfLight.current, { opacity: 0, scaleY: .1 }, { opacity: 1, scaleY: 1, duration: 18, ease: C }, 300)
        .fromTo(postAfDust.current, { opacity: 0, y: 90, scale: .25 }, { opacity: .7, y: -120, scale: 1, duration: 26, stagger: .16, ease: "none" }, 298)
        .fromTo(postAfBridge.current, { opacity: 0, scale: .38, y: 140 }, { opacity: 1, scale: 1, y: 0, duration: 20, ease: C }, 312)
        .to(postAfHeadquarters.current, { scale: 1.22, x: -18, y: -52, rotateY: -3, duration: 24, ease: CIN }, 306)

        .set(stage.current, { attr: { "data-story-act": "bridge-vault" } }, 326)
        .fromTo(directorSequence.current, { opacity: 0 }, { opacity: 1, duration: 10, ease: C }, 326)
        .fromTo(directorCamera.current, { scale: .7, x: -30, y: 38, rotateY: -5 }, { scale: 1, x: 0, y: 0, rotateY: 0, duration: 22, ease: C }, 326)
        .fromTo(directorWalls.current, { opacity: 0, y: 200, scaleY: .36 }, { opacity: 1, y: 0, scaleY: 1, duration: 18, stagger: 1, ease: CIN }, 330)
        .fromTo(directorBridge.current, { opacity: 0, scale: .42, y: 150 }, { opacity: 1, scale: 1, y: 0, duration: 20, ease: C }, 338)
        .to(directorCamera.current, { x: 26, y: -18, rotateY: 4, duration: 16, ease: "sine.inOut" }, 344)
        .fromTo(directorVault.current, { opacity: 0, scale: 1.34 }, { opacity: 1, scale: 1, duration: 20, ease: C }, 354)
        .to(directorCamera.current, { scale: 1.18, x: -14, y: -44, rotateX: 3, rotateY: -2, duration: 20, ease: CIN }, 358)
        .to([postAfHeadquarters.current, directorSequence.current], { opacity: 0, duration: 12, ease: CI }, 374)

        .set(stage.current, { attr: { "data-story-act": "grand-hall" } }, 374)
        .set(grandDoors.current, { pointerEvents: "none" }, 374)
        .fromTo(grandCentral.current, { opacity: 0, scale: 1.36, y: 110, rotateX: 8 }, { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 22, ease: C }, 374)
        .fromTo(grandAtmosphere.current, { opacity: .04, scale: .62 }, { opacity: .72, scale: 1.18, duration: 24, ease: C }, 374)
        .fromTo(hallNarrative.current, { opacity: 0, y: 42, z: 180, letterSpacing: ".3em" }, { opacity: .92, y: 0, z: 0, letterSpacing: ".12em", duration: 14, ease: C }, 388)
        .to(hallNarrative.current, { y: -18, z: 80, opacity: .62, duration: 18, ease: "sine.inOut" }, 402)
        .fromTo(grandDoors.current, { opacity: 0, y: 240, z: -240, scale: .52 }, { opacity: 1, y: 0, z: 0, scale: 1, duration: 18, stagger: { each: 2.8, from: "center" }, ease: C }, 400)
        .fromTo(grandDoorText, { opacity: 0, y: 32, z: 140, letterSpacing: ".3em" }, { opacity: 1, y: 0, z: 0, letterSpacing: ".1em", duration: 12, stagger: .8, ease: C }, 410)
        .to(hallNarrative.current, { opacity: 0, y: -48, z: 120, duration: 12, ease: CI }, 426)
        .to(grandCentral.current, { rotateY: -5, x: -20, duration: 16, ease: "sine.inOut" }, 430)
        .to(grandCentral.current, { rotateY: 5, x: 20, duration: 16, ease: "sine.inOut" }, 448)
        .to(grandCentral.current, { rotateY: 0, x: 0, scale: 1.04, duration: 16, ease: "sine.inOut" }, 466)

        .set(stage.current, { attr: { "data-story-act": "decision" } }, 470)
        .to(grandAtmosphere.current, { opacity: .42, scale: 1.06, duration: 18, ease: "sine.inOut" }, 470)
        .to(grandDoors.current, { y: -8, scale: 1.015, duration: 12, stagger: { each: .5, from: "center" }, ease: "sine.inOut" }, 474)
        .to(grandDoorText, { y: -10, opacity: .78, duration: 14, stagger: .4, ease: "sine.inOut" }, 482)
        .to(grandDoors.current, { y: 0, scale: 1, duration: 14, stagger: { each: .5, from: "center" }, ease: "sine.inOut" }, 496)
        .to(grandDoorText, { y: 0, opacity: 1, duration: 14, stagger: .4, ease: "sine.inOut" }, 502)
        .set(grandDoors.current, { pointerEvents: "auto" }, 516)
        .to(grandCentral.current, { scale: .96, y: -18, rotateY: -2, duration: 20, ease: "power2.inOut" }, 516)
        .to(grandAtmosphere.current, { opacity: .24, scale: .92, duration: 20, ease: "sine.inOut" }, 516)
        .to(grandCentral.current, { scale: .9, y: -30, rotateY: 0, duration: 18, ease: "power2.inOut" }, 538)
        .fromTo(finalAfReveal.current, { opacity: 0, scale: .68, y: 26, letterSpacing: ".36em" }, { opacity: .92, scale: 1, y: 0, letterSpacing: ".16em", duration: 14, ease: C }, 542)
        .fromTo(finalActions.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 10, ease: C }, 552)
        .to(grandAtmosphere.current, { opacity: .12, scale: .84, duration: 10, ease: "sine.inOut" }, 554)
        .set(grandDoors.current, { pointerEvents: "auto" }, 564);
    }, root);
    gsapContextRef.current = context;

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
      ScrollTrigger.refresh();
    };
  }, [universeMode]);

  return (
    <main className={`phase-one-root ${universeMode ? "is-universe-mode" : ""}`}>
      <section ref={root} className="phase-one-film" aria-label="Arima Finance cinematic identity sequence">
        <div ref={stage} className="film-stage">
          <div ref={ambient} className="film-ambient" aria-hidden="true" />
          <div ref={firstLight} className="first-light" aria-hidden="true" />

          <div ref={candle} className="film-candle" aria-hidden="true">
            <div ref={candleWick} className="film-candle-wick" />
            <div ref={candleBody} className="film-candle-body" />
          </div>
          <div ref={portal} className="candle-portal" aria-hidden="true" />

          <div ref={universe} className="data-universe" aria-hidden="true">
            <div ref={grid} className="depth-grid" />
            <svg className="market-chart chart-a" viewBox="0 0 1200 400">
              <path ref={(node) => { if (node) chartPaths.current[0] = node; }} pathLength="1200" d="M0 315 C90 260 145 340 220 250 S360 130 430 205 S570 330 650 190 S800 85 875 165 S1020 260 1200 60" />
            </svg>
            <svg className="market-chart chart-b" viewBox="0 0 1200 400">
              <path ref={(node) => { if (node) chartPaths.current[1] = node; }} pathLength="1200" d="M0 210 C110 120 180 300 285 180 S450 90 530 240 S700 300 770 150 S950 80 1200 205" />
            </svg>
            <div ref={dataCloud} className="market-data-cloud">
              {marketData.map((value, index) => (
                <span
                  ref={(node) => { if (node) dataItems.current[index] = node; }}
                  style={{ "--x": `${(index * 47) % 92 + 4}%`, "--y": `${(index * 31) % 82 + 8}%`, "--d": index % 5 } as React.CSSProperties}
                  key={value}
                >{value}</span>
              ))}
            </div>

          </div>

          <div ref={convergence} className="data-convergence" aria-hidden="true" />
          <div className="film-identity">
            <svg ref={afMark} className="af-film-mark" viewBox="0 0 520 300" role="img" aria-label="AF">
              <path ref={(node) => { if (node) afPaths.current[0] = node; }} pathLength="900" d="M55 245 L165 45 L275 245 M105 158 H225" />
              <path ref={(node) => { if (node) afPaths.current[1] = node; }} pathLength="900" d="M305 245 V45 H475 M305 142 H442" />
            </svg>
            <div ref={identity} className="af-film-name">
              <strong>ARIMA FINANCE</strong>
              <span>QUANTITATIVE INTELLIGENCE</span>
            </div>
          </div>
          <div className="af-dissolve-particles" aria-hidden="true">
            {Array.from({ length: 30 }, (_, index) => (
              <span ref={(node) => { if (node) dissolveParticles.current[index] = node; }} key={index} />
            ))}
          </div>

          <div ref={cityScene} className="financial-city" aria-label="Global financial landscape">
            <div ref={cityCamera} className="city-camera">
              <div ref={rotationChamber} className="rotation-chamber" aria-hidden="true">
                {rotationLabels.map((label, index) => (
                  <div ref={(node) => { if (node) rotationPlanes.current[index] = node; }} className="rotation-plane" style={{ "--r": `${index * 60}deg` } as React.CSSProperties} key={label}>
                    <span>{label}</span><i /><i /><i />
                  </div>
                ))}
              </div>
              <div ref={avenue} className="financial-avenue">
                <div ref={avenueWorld} className="avenue-world">
                  <div ref={cityFog} className="city-fog" />
                  <div className="financial-road">
                    <i /><i /><i />
                    <div ref={roadPulse} className="road-pulse" />
                  </div>
                  <div className="city-sky-lines" aria-hidden="true"><span /><span /><span /><span /><span /></div>
                  <div className="institution-districts">
                    {institutionDistricts.map((district, districtIndex) => (
                      <div ref={(node) => { if (node) districts.current[districtIndex] = node; }} className={`institution-district district-${districtIndex + 1}`} key={districtIndex}>
                        {district.map(([name, data], index) => (
                          <article className={`city-building side-${index % 2 ? "right" : "left"} building-${index + 1}`} key={name}>
                            <div className="building-crown" /><div className="building-windows" />
                            <strong>{name}</strong><small>{data}</small>
                            <div className="building-ticker">{marketData[(districtIndex * 2 + index) % marketData.length]}</div>
                          </article>
                        ))}
                      </div>
                    ))}
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
              <div ref={(node) => { if (node) entranceDoors.current[0] = node; }} className="entrance-door door-left" />
              <div ref={(node) => { if (node) entranceDoors.current[1] = node; }} className="entrance-door door-right" />
              <div className="entrance-floor"><i /><i /><i /></div>
            </div>
            <div ref={hall} className="intelligence-hall">
              <div className="hall-architecture" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
              <div ref={hallRing} className="hall-ring" aria-hidden="true"><i /><i /><i /></div>
              <div className="core-streams" aria-hidden="true">
                {intelligenceStreams.map((stream, index) => (
                  <span ref={(node) => { if (node) coreStreams.current[index] = node; }} style={{ "--stream": index } as React.CSSProperties} key={stream}><b>{stream}</b></span>
                ))}
              </div>
              <div ref={intelligenceCore} className="intelligence-core">
                <span ref={(node) => { if (node) coreShells.current[0] = node; }} className="core-shell shell-a" />
                <span ref={(node) => { if (node) coreShells.current[1] = node; }} className="core-shell shell-b" />
                <i className="core-light" />
              </div>
              <div ref={coreIdentity} className="core-identity">
                <span>AF</span><strong>ARIMA FINANCE</strong><small>RESEARCH · TECHNOLOGY · RISK DISCIPLINE</small>
                <div><b>Financial Intelligence</b><b>Systems Architecture</b></div>
              </div>
              <div ref={divisionOrbit} className="division-orbit">
                {divisionDetails.map((division, divisionIndex) => (
                  <article ref={(node) => { if (node) divisionPlatforms.current[divisionIndex] = node; }} className={`division-platform division-${divisionIndex + 1}`} key={division.title}>
                    <div className="platform-surface">
                      <span>{division.index}</span><small>{division.lead}</small><h2>{division.title}</h2>
                      {divisionIndex === 1 && <strong className="engine-emphasis">ARIMA FINANCE ENGINE</strong>}
                      {divisionIndex === 2 && <p>A live-funded research environment using the founder's own capital to study structured allocation and risk management.</p>}
                      <div className="division-data">{division.items.map((item) => <i key={item}>{item}</i>)}</div>
                      {divisionIndex === 2 && (
                        <div className="portfolio-metrics">
                          <b>PORTFOLIO VALUE</b><b>WEEKLY RETURN</b><b>DRAWDOWN</b><b>RISK SCORE</b>
                          <svg viewBox="0 0 420 80"><path d="M0 65 C45 48 72 62 105 39 S168 51 202 24 S264 41 300 20 S364 27 420 5" /></svg>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <div ref={portfolioDisclosure} className="model-disclosure">
                <strong>Model Portfolio Disclosure</strong>
                <span>The investor profiles presented are internal research models. The underlying capital belongs to the founder. Arima Finance does not currently manage external client assets through these profiles. Information is presented for research, demonstration and technology-development purposes only.</span>
              </div>
            </div>
            <div ref={transitionBeam} className="founder-transition-beam" aria-hidden="true" />
            <div ref={transitionDarkness} className="phase-three-darkness" aria-hidden="true" />
          </div>

          {/* Scene darkness overlays */}
          <div ref={sceneDarkness1} className="scene-darkness-overlay" aria-hidden="true" />
          <div ref={sceneDarkness2} className="scene-darkness-overlay" aria-hidden="true" />
          <div ref={sceneDarkness3} className="scene-darkness-overlay" aria-hidden="true" />
          <div ref={sceneDarkness4} className="scene-darkness-overlay" aria-hidden="true" />
          <div ref={sceneDarkness5} className="scene-darkness-overlay" aria-hidden="true" />
          <div ref={lastMarketDarkness} className="last-market-darkness" aria-hidden="true" />
          <div ref={afMomentGlow} className="af-moment-glow" aria-hidden="true" />

          {/* Preserved architectural assets */}
          <div ref={finalAfReveal} className="final-af-reveal">
            <strong>AF</strong><h2>ARIMA FINANCE</h2><p>Research.<br />Technology.<br />Risk Discipline.</p>
          </div>
          <div ref={postAfHeadquarters} className="post-af-headquarters" aria-label="Arima headquarters discovery">
            <div className="post-af-fog" aria-hidden="true" />
            <div ref={postAfLight} className="post-af-lightwell" aria-hidden="true" />
            <div className="post-af-columns" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => (
                <i ref={(node) => { if (node) postAfColumns.current[index] = node; }} key={index} />
              ))}
            </div>
            <div className="post-af-dust" aria-hidden="true">
              {Array.from({ length: 28 }, (_, index) => (
                <span ref={(node) => { if (node) postAfDust.current[index] = node; }} style={{ left: `${(index * 31 + 4) % 94}%`, bottom: `${(index * 17 + 5) % 43}%` }} key={index} />
              ))}
            </div>
            <div ref={postAfBridge} className="post-af-bridge" aria-hidden="true"><i /><i /><i /><span /></div>
          </div>
          <div ref={grandCentral} className="grand-central" aria-label="Arima Grand Central Hall">
            <div className="grand-ceiling" aria-hidden="true"><i /><i /><i /></div>
            <div className="grand-floor" aria-hidden="true" />
            <div ref={grandAtmosphere} className="grand-atmosphere" aria-hidden="true" />
            <div ref={hallNarrative} className="hall-narrative">
              <span>THE ARIMA FINANCE SYSTEM</span>
              <strong>Research becomes infrastructure.</strong>
              <small>Technology, capital and risk discipline move as one.</small>
            </div>
            <div className="grand-door-field">
              {[
                ["WORK WITH US", "Human potential", "warm", "/work-with-us"],
                ["CLIENT PORTFOLIO", "Private intelligence", "secure", "/client-portfolio"],
                ["RESEARCH", "Knowledge in motion", "research", "/research-projects"],
              ].map(([title, subtitle, tone, path], index) => (
                <article
                  ref={(node) => { if (node) grandDoors.current[index] = node; }}
                  className={`grand-door grand-door-${tone}`}
                  key={title}
                  tabIndex={0}
                  role="button"
                  aria-label={`Enter ${title}`}
                  onClick={() => enterGateway(path)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") enterGateway(path); }}
                >
                  <div className="grand-door-arch"><i /><i /><span /></div>
                  <small>GATEWAY 0{index + 1}</small>
                  <strong>{title}</strong>
                  <em>{subtitle}</em>
                </article>
              ))}
            </div>
          </div>
          <div ref={directorSequence} className="director-sequence" aria-label="Arima headquarters, continuous second act">
            <div ref={directorCamera} className="director-camera">
              <div className="director-light" />
              <div className="director-fog" />
              <div ref={directorAf} className="director-af">
                <strong>AF</strong><h2>ARIMA FINANCE</h2><p>Research.<br />Technology.<br />Risk Discipline.</p>
              </div>
              <div className="director-walls">
                {Array.from({ length: 6 }, (_, index) => (
                  <i ref={(node) => { if (node) directorWalls.current[index] = node; }} key={index} />
                ))}
              </div>
              <div ref={directorBridge} className="director-bridge"><i /><i /><i /><span /></div>
              <div ref={directorVault} className="director-vault">
                <i /><i /><i />
                <div className="director-dust">
                  {Array.from({ length: 20 }, (_, index) => <b key={index} />)}
                </div>
              </div>
              <div className="director-gateways">
                {[["warm", "WORK WITH US", "/work-with-us"], ["secure", "CLIENT PORTFOLIO", "/client-portfolio"], ["research", "RESEARCH & OPEN PROJECTS", "/research-projects"]].map(([tone, label, path], index) => (
                  <article
                    ref={(node) => { if (node) directorGateways.current[index] = node; }}
                    className={`director-gateway ${tone}`}
                    key={label}
                    tabIndex={0}
                    role="button"
                    aria-label={`Enter ${label}`}
                    onClick={() => enterGateway(path)}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') enterGateway(path); }}
                  >
                    <div><i /><i /><span /></div>
                    <strong>{label}</strong>
                  </article>
                ))}
              </div>
              <div ref={directorLabels} className="director-labels">
                <span>ARIMA HEADQUARTERS</span>
                <small>THE GRAND CENTRAL HALL</small>
              </div>
            </div>
          </div>
          <div ref={finalActions} className="final-actions">
            <button type="button" onClick={enterUniverse}>Enter Arima Universe</button>
            <button type="button" onClick={replayJourney}>Replay Journey</button>
          </div>
        </div>
      </section>
      {universeMode && <div id="arima-central-hall"><UniverseHall embedded /></div>}
    </main>
  );
}
