"use client";

import { useEffect, useState } from "react";
import { ScrollController } from "./ScrollController";
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

const STORAGE_KEY = "arima-cinematic-complete-v1";

export function CinematicExperience() {
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIntroComplete(localStorage.getItem(STORAGE_KEY) === "true"));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { localStorage.setItem(STORAGE_KEY, "true"); setIntroComplete(true); }
    }, { threshold: 0.15 });
    observer.observe(contact); return () => observer.disconnect();
  }, [introComplete]);
  const skip = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIntroComplete(true);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
      document.getElementById("company")?.scrollIntoView({ behavior: "auto", block: "start" });
    }));
  };
  const replay = () => { localStorage.removeItem(STORAGE_KEY); setIntroComplete(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const completed = introComplete === true;
  return <main className="cinematic-root">
    {introComplete === null && <div className="loading-screen"><span className="loading-line"/><p>INITIALISING ARIMA FINANCE</p></div>}
    <ScrollController />
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
