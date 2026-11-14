"use client";

import { m, type Variants } from "framer-motion";
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/*
 * Dark royal blue button. Mouse hover and keyboard focus swap the label to
 * "Click on Me!", bounce the icon, brighten the gradient and add a glow. Touch
 * devices never get hover, so they see the default label with a tap squash.
 * MotionProvider's reducedMotion="user" drops the movement (scale / bounce /
 * slide) for visitors who ask for it, leaving only the fades.
 *
 * Palette: #142B65 deep · #1E40AF mid · #3B82F6 accent.
 */

const ease = [0.22, 1, 0.36, 1] as const;

const button: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 8px 18px -8px rgba(20,43,101,0.55), 0 0 0 0 rgba(59,130,246,0)",
    transition: { duration: 0.35, ease },
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0 16px 32px -10px rgba(30,64,175,0.7), 0 0 28px 2px rgba(59,130,246,0.45)",
    transition: { duration: 0.35, ease },
  },
  tap: {
    scale: 0.95,
    y: 0,
    boxShadow: "0 4px 10px -6px rgba(20,43,101,0.6), 0 0 16px 0 rgba(59,130,246,0.35)",
    transition: { duration: 0.12 },
  },
};

// The brighter gradient sits on top and fades in, because CSS gradients can't be tweened directly.
const brightLayer: Variants = {
  rest: { opacity: 0, transition: { duration: 0.35 } },
  hover: { opacity: 1, transition: { duration: 0.35 } },
};

const shine: Variants = {
  rest: { x: "-160%", transition: { duration: 0 } },
  hover: { x: "520%", transition: { duration: 0.9, ease: "easeInOut", delay: 0.05 } },
};

const bounce: Variants = {
  rest: { y: 0, transition: { duration: 0.25 } },
  hover: {
    y: [0, 3, 0],
    transition: { duration: 0.9, ease: "easeInOut", repeat: Infinity },
  },
};

const labelOut: Variants = {
  rest: { y: "0%", opacity: 1, transition: { duration: 0.3, ease } },
  hover: { y: "-120%", opacity: 0, transition: { duration: 0.3, ease } },
};

const labelIn: Variants = {
  rest: { y: "120%", opacity: 0, transition: { duration: 0.3, ease } },
  hover: { y: "0%", opacity: 1, transition: { duration: 0.3, ease } },
};

const sizes = {
  md: "min-h-12 px-6",
  sm: "min-h-11 px-4",
} as const;

export function ResumeDownloadButton({
  size = "md",
  className,
  onClick,
}: {
  size?: keyof typeof sizes;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <m.a
      href={site.resume.href}
      download={site.resume.filename}
      aria-label="Download resume (PDF)"
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="tap"
      variants={button}
      className={cn(
        // rounded-xl! keeps the corners under the global :focus-visible rule, which sets border-radius.
        "relative isolate inline-flex items-center justify-center overflow-hidden rounded-xl border border-transparent bg-linear-to-br from-[#142B65] to-[#1E40AF] text-sm font-semibold whitespace-nowrap text-white select-none focus-visible:rounded-xl!",
        sizes[size],
        className,
      )}
    >
      <m.span
        aria-hidden
        variants={brightLayer}
        className="absolute inset-0 -z-10 bg-linear-to-br from-[#1E40AF] via-[#2552CE] to-[#3B82F6]"
      />
      <m.span
        aria-hidden
        variants={shine}
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/4 -skew-x-12 bg-white/25 blur-md"
      />
      {/* Both labels share one grid cell, so the button keeps the width of the longer one. */}
      <span aria-hidden className="grid overflow-hidden py-0.5">
        <m.span variants={labelOut} className="col-start-1 row-start-1 flex items-center justify-center gap-2">
          <Download className="size-4" />
          Download Resume
        </m.span>
        <m.span variants={labelIn} className="col-start-1 row-start-1 flex items-center justify-center gap-2">
          <m.span variants={bounce} className="flex">
            <Download className="size-4" />
          </m.span>
          Click on Me!
        </m.span>
      </span>
    </m.a>
  );
}
