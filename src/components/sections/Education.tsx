import { Award, CalendarDays, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { education } from "@/data/education";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Academic Background"
      title="Education & Qualifications"
      tone="mist"
      description="Foundational degrees and continuous academic excellence."
    >
      <ul className="mx-auto grid max-w-3xl gap-6">
        {education.map((item, i) => (
          <li key={item.degree}>
            <Reveal delay={i * 0.08}>
              <TiltCard className="flex flex-col gap-6 rounded-3xl border border-[#C5A46D]/35 bg-white p-6 shadow-card hover:border-[#C5A46D] sm:flex-row sm:items-center sm:p-8">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl border border-[#C5A46D]/40 bg-[#0B1428] text-[#DFCA9F] shadow-gold">
                  <GraduationCap className="size-8" aria-hidden />
                </span>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#9A7B45] uppercase">
                    <Sparkles className="size-3" />
                    {item.level}
                  </div>
                  <h3 className="font-editorial mt-1 text-2xl font-bold text-[#0B1428] sm:text-2xl">
                    {item.degree}
                  </h3>
                  <p className="mt-1 font-semibold text-[#142B50]">{item.institution}</p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#64748B]">
                      <MapPin className="size-3.5 text-[#9A7B45]" aria-hidden />
                      {item.location}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 self-start sm:flex-col sm:items-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/15 px-3.5 py-1 text-xs font-bold text-[#0B1428]">
                    <CalendarDays className="size-3.5 text-[#9A7B45]" aria-hidden />
                    {item.startYear} – {item.endYear}
                  </span>
                  {item.grade && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D]/20 bg-[#F6F3EE] px-3.5 py-1 text-xs font-bold text-[#0B1428]">
                      <Award className="size-3.5 text-[#9A7B45]" aria-hidden />
                      {item.grade}
                    </span>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
