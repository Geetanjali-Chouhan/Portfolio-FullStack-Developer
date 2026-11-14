import { Award, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background" tone="mist">
      <ul className="mx-auto grid max-w-3xl gap-5">
        {education.map((item, i) => (
          <li key={item.degree}>
            <Reveal delay={i * 0.08}>
              <article className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift sm:flex-row sm:items-center sm:p-8">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-royal text-white shadow-md shadow-royal/30">
                  <GraduationCap className="size-8" aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                    {item.level}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-heading sm:text-2xl">{item.degree}</h3>
                  <p className="mt-1 font-semibold text-muted">{item.institution}</p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="size-4 text-accent" aria-hidden />
                      {item.location}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 self-start sm:flex-col sm:items-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-50 px-4 py-1.5 text-sm font-bold text-accent">
                    <CalendarDays className="size-4" aria-hidden />
                    {item.startYear} – {item.endYear}
                  </span>
                  {item.grade && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-4 py-1.5 text-sm font-bold text-heading">
                      <Award className="size-4 text-accent" aria-hidden />
                      {item.grade}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
