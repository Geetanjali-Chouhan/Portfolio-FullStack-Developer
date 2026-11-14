"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * The short blue underline under every section title. It draws itself in (GSAP)
 * when scrolled into view.
 *
 * It animates only its own element, after this component has hydrated. The
 * GitHub section sits inside a <Suspense> boundary that React hydrates lazily,
 * so a global effect that styled this element earlier would cause a hydration
 * mismatch ("attributes of the server rendered HTML didn't match").
 */
export function AccentBar() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return <span ref={ref} aria-hidden className="mx-auto mt-4 block h-1 w-12 rounded-full bg-royal" />;
}
