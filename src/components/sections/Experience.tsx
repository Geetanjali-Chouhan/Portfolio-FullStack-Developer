import { Briefcase, CalendarClock, Check } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional experience"
      description="My professional experience so far."
      tone="mist"
    >
      <ol className="relative mx-auto max-w-3xl border-l-2 border-royal-100 pl-8 sm:pl-10">
        {experience.map((item) => (
          <li key={`${item.company}-${item.role}`} className="relative">
            <span
              aria-hidden
              className="absolute top-7 -left-[53px] grid size-10 place-items-center rounded-full border-4 border-mist bg-royal text-white shadow-md shadow-royal/30 sm:-left-[61px]"
            >
              <Briefcase className="size-4" />
            </span>

            <Reveal>
              <article className="rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-heading sm:text-2xl">{item.role}</h3>
                    <p className="mt-1 text-base font-semibold text-accent">{item.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold text-accent">
                      <CalendarClock className="size-3.5" aria-hidden />
                      {item.duration}
                    </span>
                    <span className="rounded-full border border-line bg-mist px-3 py-1 text-xs font-semibold text-muted">
                      {item.type}
                    </span>
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-muted">{item.summary}</p>

                {item.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {item.stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-line bg-mist px-2.5 py-1 font-mono text-xs text-heading"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
