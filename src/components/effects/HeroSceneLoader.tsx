"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js is a sizeable bundle: load it as a separate chunk, browser-only.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Mounts the 3D scene only once the browser is idle, so the 3D code never
 * competes with first paint, the hero text or the GSAP entrance timeline.
 */
export function HeroSceneLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Safari doesn't implement requestIdleCallback, hence the timeout fallback.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  return ready ? <HeroScene /> : null;
}
