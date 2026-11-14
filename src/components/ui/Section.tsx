import { cn } from "@/lib/cn";
import { AccentBar } from "@/components/effects/AccentBar";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "white" | "mist" | "dark";
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = "white",
  className,
  children,
}: SectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative py-24 sm:py-32 transition-colors duration-500",
        tone === "dark"
          ? "bg-[#0B1428] text-[#E8EDF5]"
          : tone === "mist"
            ? "bg-[#EFECE6] text-[#0B1428]"
            : "bg-[#F6F3EE] text-[#0B1428]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/35 bg-[#C5A46D]/10 px-3.5 py-1 backdrop-blur-xs">
            <span className="size-1.5 rotate-45 bg-[#C5A46D]" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#9A7B45] dark:text-[#DFCA9F] uppercase">
              {eyebrow}
            </p>
            <span className="size-1.5 rotate-45 bg-[#C5A46D]" />
          </div>
          <h2
            id={`${id}-title`}
            className={cn(
              "font-editorial mt-4 text-3xl font-medium tracking-tight sm:text-5xl md:text-5xl",
              isDark ? "text-[#E8EDF5]" : "text-[#0B1428]"
            )}
          >
            {title}
          </h2>
          <AccentBar />
          {description && (
            <p
              className={cn(
                "mt-5 text-base leading-relaxed sm:text-lg",
                isDark ? "text-[#AAB5C5]" : "text-[#64748B]"
              )}
            >
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
