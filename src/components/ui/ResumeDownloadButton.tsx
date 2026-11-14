"use client";

import { m, type Variants } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const button: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 8px 20px -8px rgba(197, 164, 109, 0.5), 0 0 0 0 rgba(197, 164, 109, 0)",
    transition: { duration: 0.35, ease },
  },
  hover: {
    scale: 1.04,
    y: -2,
    boxShadow: "0 16px 32px -10px rgba(197, 164, 109, 0.7), 0 0 24px 2px rgba(223, 202, 159, 0.5)",
    transition: { duration: 0.35, ease },
  },
  tap: {
    scale: 0.96,
    y: 0,
    boxShadow: "0 4px 10px -6px rgba(197, 164, 109, 0.6)",
    transition: { duration: 0.12 },
  },
};

const shine: Variants = {
  rest: { x: "-160%", transition: { duration: 0 } },
  hover: { x: "520%", transition: { duration: 0.9, ease: "easeInOut", delay: 0.05 } },
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
  lg: "min-h-12 px-7 text-sm",
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-9 px-4 text-xs",
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
        "relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-[#DFCA9F]/60 bg-linear-to-r from-[#DFCA9F] via-[#C5A46D] to-[#9A7B45] text-sm font-bold whitespace-nowrap text-[#0B1428] select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]",
        sizes[size],
        className,
      )}
    >
      <m.span
        aria-hidden
        variants={shine}
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -skew-x-12 bg-white/40 blur-xs"
      />
      <span aria-hidden className="grid overflow-hidden py-0.5">
        <m.span variants={labelOut} className="col-start-1 row-start-1 flex items-center justify-center gap-2">
          <Download className="size-4 text-[#0B1428]" />
          Download Resume
        </m.span>
        <m.span variants={labelIn} className="col-start-1 row-start-1 flex items-center justify-center gap-2">
          <Sparkles className="size-4 text-[#0B1428]" />
          Get Full CV (PDF)
        </m.span>
      </span>
    </m.a>
  );
}
