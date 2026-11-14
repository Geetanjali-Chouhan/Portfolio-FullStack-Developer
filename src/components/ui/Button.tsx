import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "gradient"
  | "outline"
  | "navy"
  | "gold"
  | "luxury"
  | "luxury-outline";
type Size = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer";

const sizes: Record<Size, string> = {
  lg: "min-h-12 px-7 text-base tracking-wide",
  md: "min-h-11 px-5 text-sm tracking-wide",
  sm: "min-h-9 px-4 text-xs tracking-wider uppercase",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#142B50] text-[#E8EDF5] border border-[#C5A46D]/40 shadow-card hover:-translate-y-0.5 hover:bg-[#1D3F70] hover:border-[#C5A46D] hover:shadow-gold",
  gradient:
    "bg-linear-to-r from-[#DFCA9F] via-[#C5A46D] to-[#9A7B45] text-[#0B1428] font-bold shadow-gold hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg",
  gold: "bg-linear-to-r from-[#DFCA9F] via-[#C5A46D] to-[#9A7B45] text-[#0B1428] font-bold shadow-gold hover:-translate-y-0.5 hover:brightness-105",
  luxury:
    "bg-[#0B1428] text-[#E8EDF5] border border-[#C5A46D]/50 shadow-md hover:-translate-y-0.5 hover:bg-[#142B50] hover:border-[#C5A46D] hover:shadow-gold",
  "luxury-outline":
    "border border-[#C5A46D] bg-transparent text-[#0B1428] hover:-translate-y-0.5 hover:bg-[#C5A46D]/15 hover:border-[#9A7B45]",
  outline:
    "border border-[#C5A46D]/30 bg-card text-heading shadow-xs hover:-translate-y-0.5 hover:border-[#C5A46D] hover:text-[#0B1428] hover:shadow-sm",
  navy: "bg-[#0B1428] text-[#E8EDF5] border border-white/10 shadow-sm hover:-translate-y-0.5 hover:bg-[#142B50] hover:border-[#C5A46D]/50",
};

type Common = { variant?: Variant; size?: Size };

export function buttonClasses({ variant = "primary", size = "md" }: Common, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<"a">) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size }, className)} {...props} />;
}
