"use client";

import { useEffect, useState } from "react";
import { ScrollController } from "./ScrollController";
import { AnimationDiagnostics } from "./AnimationDiagnostics";
import { CinematicNavigation } from "./CinematicNavigation";
import { IntroScene } from "./scenes/IntroScene";
import { DataUniverseScene } from "./scenes/DataUniverseScene";
import { InstitutionScene } from "./scenes/InstitutionScene";
import { AFRevealScene } from "./scenes/AFRevealScene";
import { CompanyScene } from "./scenes/CompanyScene";
import { LightTransitionScene } from "./scenes/LightTransitionScene";
import { FounderScene } from "./scenes/FounderScene";
import { PortfolioScene } from "./scenes/PortfolioScene";
import { EngineScene } from "./scenes/EngineScene";
import { ContactScene } from "./scenes/ContactScene";
import { ensureAnimationPlugins, ScrollTrigger } from "@/lib/animation-runtime";

const STORAGE_KEY = "arima-cinematic-complete-v1";

export function CinematicExperience() {
  console.log("[Arima Animation] CinematicExperience render");
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);
  const [runtimeVersion, setRuntimeVersion] = useState(0);
  useEffect(() => {
    document.body.dataset.arimaHydrated = "true";
    console.log("[Arima Animation] hydration effect", { hydrated: document.body.dataset.arimaHydrated });
    const frame = requestAnimationFrame(() => setIntroComplete(localStorage.getItem(STORAGE_KEY) === "true"));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && introComplete !== true) {
        localStorage.setItem(STORAGE_KEY, "true");
        setIntroComplete(true);
        setRuntimeVersion((version) => version + 1);
      }
    }, { threshold: 0.15 });
    observer.observe(contact); return () => observer.disconnect();
  }, [introComplete]);
  const skip = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIntroComplete(true);
    setRuntimeVersion((version) => version + 1);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
      document.getElementById("company")?.scrollIntoView({ behavior: "auto", block: "start" });
    }));
  };
  const replay = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIntroComplete(false);
    setRuntimeVersion((version) => version + 1);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      if (ensureAnimationPlugins()) {
        ScrollTrigger.clearScrollMemory("manual");
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      }
    }));
  };

  const completed = introComplete === true;
  return <main className="cinematic-root">
    {introComplete === null && <div className="loading-screen"><span className="loading-line"/><p>INITIALISING ARIMA FINANCE</p></div>}
    <ScrollController runtimeVersion={runtimeVersion} introCompleted={completed} />
    <AnimationDiagnostics />
    <CinematicNavigation introComplete={completed} onSkip={skip} onReplay={replay} />
    <div className="progress-rail" aria-hidden="true"><span /></div>
    <IntroScene compact={completed} />
    <DataUniverseScene compact={completed} />
    <InstitutionScene compact={completed} />
    <AFRevealScene compact={completed} />
    <CompanyScene />
    <LightTransitionScene />
    <FounderScene />
    <PortfolioScene />
    <EngineScene />
    <ContactScene />
  </main>;
}
