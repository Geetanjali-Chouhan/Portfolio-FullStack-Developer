"use client";

import { useEffect } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * GSAP entrance timeline for the hero. Renders nothing; it animates elements
 * that Hero.tsx tags with data-hero-* attributes. Those elements start hidden
 * through CSS (see globals.css) only when motion is allowed, so there is no
 * flash of unstyled content and reduced-motion visitors see everything at once.
 */
export function HeroIntro() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo("[data-hero-greet]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        // Name: each word rises out of its own mask.
        .fromTo("[data-hero-word]", { yPercent: 115 }, { yPercent: 0, duration: 0.95, stagger: 0.12 }, "-=0.3")
        .fromTo(
          "[data-hero-item]",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, clearProps: "transform" },
          "-=0.55",
        )
        // Portrait frame lands slightly after the copy starts, then the extras pop in.
        .fromTo(
          "[data-hero-frame]",
          { y: 44, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out" },
          0.25,
        )
        .fromTo(
          "[data-hero-pop]",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.8)" },
          "-=0.55",
        )
        .fromTo("[data-hero-card]", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
