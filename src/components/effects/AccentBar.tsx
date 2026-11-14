"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

export function AccentBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden className="mx-auto mt-4 flex items-center justify-center gap-2">
      <span className="h-px w-10 bg-linear-to-r from-transparent to-[#C5A46D]" />
      <span className="size-1.5 rotate-45 rounded-xs bg-[#C5A46D] shadow-[0_0_8px_#C5A46D]" />
      <span className="h-px w-10 bg-linear-to-l from-transparent to-[#C5A46D]" />
    </div>
  );
}
