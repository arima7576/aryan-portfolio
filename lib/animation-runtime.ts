import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureAnimationPlugins() {
  if (typeof window === "undefined") return false;
  if (!registered) {
    console.log("[Arima Animation] runtime initialization", { browser: true });
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    registered = true;
    console.log("[Arima Animation] plugins registered", {
      gsap: Boolean(gsap),
      ScrollTrigger: Boolean(ScrollTrigger),
    });
  }
  return true;
}

// Client bundles evaluate this module before React runs scene effects. Registering
// here guarantees ScrollTrigger is available before any useGSAP callback executes.
if (typeof window !== "undefined") ensureAnimationPlugins();

export { gsap, ScrollTrigger };
