import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, and only in the browser (these modules are imported by client
// components, which are still evaluated on the server during prerender).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Animations only run for visitors who haven't asked the OS to reduce motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
