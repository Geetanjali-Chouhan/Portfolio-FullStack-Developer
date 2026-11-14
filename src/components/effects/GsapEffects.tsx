"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

/**
 * Page-wide GSAP + ScrollTrigger effects, driven by data attributes so the
 * section components can stay server components:
 *
 *   data-parallax       image layer drifts slower than the page
 *   data-stagger        children fade/rise in one after another
 *
 * RULE: only tag elements that are NOT inside a <Suspense> boundary. React
 * hydrates those boundaries lazily, i.e. after this effect has run, so styling
 * their elements from here causes hydration mismatches (this is why the count-up
 * numbers and section underlines are self-animating components — <CountUp /> and
 * <AccentBar /> — instead of data attributes handled in this file).
 *
 * Also renders the thin scroll-progress bar at the top of the viewport.
 */
export function GsapEffects() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      // Scroll progress bar (scrubbed to the whole document).
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );

      // Parallax for project screenshots: the image layer is taller than its
      // frame and slides within it while the card scrolls past.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Staggered children (skills grid, feature lists, ...).
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        // Tailwind hover transitions would fight GSAP's per-frame updates, so
        // they are switched off only while the entrance runs.
        gsap.fromTo(
          items,
          { opacity: 0, y: 18, transition: "none" },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            clearProps: "opacity,transform,transition",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          },
        );
      });

      // Layout shifts (web fonts, images) move trigger positions; recompute once settled.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={progress}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-royal"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
