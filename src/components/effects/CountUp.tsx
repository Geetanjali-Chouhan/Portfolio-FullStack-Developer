"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

/**
 * A number that counts up from 0 (GSAP) when scrolled into view.
 *
 * It renders the real value on the server, so with JavaScript off or with
 * "reduce motion" on it is simply correct. The animation only starts after this
 * component has hydrated — mutating server-rendered text before React hydrates
 * it would cause a hydration mismatch.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = ref.current?.firstChild;
    const el = ref.current;
    if (!el || !text) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const state = { value: 0 };
      let tween: gsap.core.Tween | undefined;
      text.nodeValue = "0";

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => {
          tween = gsap.to(state, {
            value,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              text.nodeValue = String(Math.round(state.value));
            },
            onComplete: () => {
              text.nodeValue = String(value);
            },
          });
        },
      });

      return () => {
        trigger.kill();
        tween?.kill();
        text.nodeValue = String(value);
      };
    });

    return () => mm.revert();
  }, [value]);

  return (
    <span ref={ref} data-count={value}>
      {value}
    </span>
  );
}
