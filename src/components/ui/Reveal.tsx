"use client";

import { m } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Animate on mount instead of when scrolled into view (for the hero). */
  immediate?: boolean;
};

export function Reveal({ children, delay = 0, y = 18, className, immediate }: RevealProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
