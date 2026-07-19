"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  ["Home", "intro"], ["Company", "company"], ["Solutions", "capabilities"], ["Research", "research"],
  ["Portfolio", "portfolio"], ["Projects", "portfolio"], ["Founder", "founder"], ["Insights", "research"],
  ["Latest Project", "engine"], ["Contact", "contact"],
] as const;

export function CinematicNavigation({ introComplete, onSkip, onReplay }: { introComplete: boolean; onSkip: () => void; onReplay: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const sections = [...new Set(links.map(([, id]) => id))].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-45% 0px -45%" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return <>
    <motion.header className={`cinematic-nav ${introComplete ? "is-visible" : ""}`} initial={false} animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : -20 }}>
      <button className="nav-brand" onClick={() => go("intro")} aria-label="Arima Finance home"><span>AF</span><small>ARIMA FINANCE</small></button>
      <nav className={open ? "is-open" : ""} aria-label="Experience navigation">
        {links.map(([label, id]) => <button key={label} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
      </nav>
      <div className="nav-controls"><button onClick={introComplete ? onReplay : onSkip}>{introComplete ? "Replay Experience" : "Skip Intro"}</button><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? "Close" : "Menu"}</button></div>
    </motion.header>
    {!introComplete && <button className="skip-intro" onClick={onSkip}>Skip Intro <span>→</span></button>}
  </>;
}
