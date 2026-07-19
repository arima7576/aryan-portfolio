import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureAnimationPlugins() {
  if (typeof window === "undefined") return false;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    registered = true;
  }
  return true;
}

export { gsap, ScrollTrigger };
