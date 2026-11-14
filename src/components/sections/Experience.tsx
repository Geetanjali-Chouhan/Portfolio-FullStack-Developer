import { Briefcase, CalendarClock, Check, Sparkles } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career Timeline"
      title="Professional Experience"
      description="Practical industry experience developing responsive web interfaces and client solutions."
    >
      <ol className="relative mx-auto max-w-3xl border-l-2 border-[#C5A46D]/40 pl-8 sm:pl-12">
        {experience.map((item) => (
          <li key={`${item.company}-${item.role}`} className="relative">
            {/* Timeline Golden Circular Node */}
            <span
              aria-hidden
              className="absolute top-8 -left-[45px] grid size-10 place-items-center rounded-full border-2 border-[#C5A46D] bg-[#0B1428] text-[#DFCA9F] shadow-gold sm:-left-[61px] sm:size-12"
            >
              <Briefcase className="size-4 sm:size-5" />
            </span>

            <Reveal>
              <TiltCard className="rounded-3xl border border-[#C5A46D]/35 bg-white p-6 shadow-card hover:border-[#C5A46D] sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#9A7B45] uppercase tracking-wider">
                      <Sparkles className="size-3" />
                      {item.type}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#0B1428] sm:text-3xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-[#142B50]">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/15 px-3.5 py-1 text-xs font-bold text-[#0B1428]">
                      <CalendarClock className="size-3.5 text-[#9A7B45]" aria-hidden />
                      {item.duration}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-base">
                  {item.summary}
                </p>

                {item.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-[#142B50]">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#C5A46D]" aria-hidden />
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
                        className="rounded-full border border-[#C5A46D]/30 bg-[#F6F3EE] px-3 py-1 font-mono text-xs text-[#0B1428]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
