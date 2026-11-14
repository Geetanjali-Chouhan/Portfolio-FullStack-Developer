import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gradient" | "outline" | "navy";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-sm",
  sm: "min-h-11 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-royal text-white shadow-sm hover:-translate-y-0.5 hover:bg-royal-700 hover:shadow-lg hover:shadow-royal/25",
  gradient:
    "bg-linear-to-br from-royal via-royal-700 to-[#1e3a8a] text-white shadow-md shadow-royal/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-royal/35",
  outline:
    "border border-line bg-card text-heading shadow-sm hover:-translate-y-0.5 hover:border-royal hover:text-accent hover:shadow-md",
  navy: "bg-navy text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#1e3a8a] hover:shadow-lg hover:shadow-navy/25",
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
