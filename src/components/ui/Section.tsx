import { cn } from "@/lib/cn";
import { AccentBar } from "@/components/effects/AccentBar";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Alternate white / off-white backgrounds down the page. */
  tone?: "white" | "mist";
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, description, tone = "white", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-28", tone === "mist" ? "bg-mist" : "bg-surface")}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl"
          >
            {title}
          </h2>
          <AccentBar />
          {description && <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
