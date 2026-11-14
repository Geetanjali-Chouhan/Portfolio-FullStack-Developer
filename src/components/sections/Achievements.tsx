import Image from "next/image";
import { Award, ExternalLink, Flag } from "lucide-react";
import { certifications, milestones } from "@/data/achievements";
import { publicFileExists } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Milestones"
      title="Achievements & certifications"
      description="Milestones and certifications from my journey so far."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {milestones.map((m, i) => (
          <li key={m.title} className="h-full">
            <Reveal delay={i * 0.08} className="h-full">
              <TiltCard className="group flex h-full flex-col p-5 sm:p-6">
                <div
                  className="flex items-center justify-between"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-royal-50 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-royal group-hover:text-white shadow-xs">
                    <Flag className="size-5" aria-hidden />
                  </span>
                  <span className="rounded-full border border-line/60 bg-mist px-3 py-1 font-mono text-xs font-semibold text-heading shadow-xs">
                    {m.tag}
                  </span>
                </div>

                {m.image && publicFileExists(m.image) && (
                  <div
                    className="mt-5 overflow-hidden rounded-xl border border-line bg-mist shadow-xs transition-transform duration-300"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <div
                      aria-hidden
                      className="flex items-center gap-1.5 border-b border-line/70 bg-mist/90 px-3 py-2"
                    >
                      <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                    </div>
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-mist">
                      <Image
                        src={m.image}
                        alt={m.imageAlt ?? m.title}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                <div
                  className="mt-5 flex flex-1 flex-col"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <h3 className="text-lg font-bold text-heading transition-colors duration-200 group-hover:text-accent">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {m.detail}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>

      {certifications.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-heading">
            <Award className="size-5 text-accent" aria-hidden />
            Certifications
          </h3>
          <ul className="grid gap-5 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.title} className="h-full">
                <TiltCard className="group flex h-full flex-col overflow-hidden">
                  {c.image && publicFileExists(c.image) && (
                    <a
                      href={c.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View certificate image: ${c.title} (opens in a new tab)`}
                      className="group/img relative block aspect-16/10 overflow-hidden border-b border-line bg-mist"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Image
                        src={c.image}
                        alt={c.imageAlt ?? `${c.title} certificate`}
                        fill
                        sizes="(min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                    </a>
                  )}
                  <div
                    className="flex flex-1 items-start justify-between gap-4 p-5"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <div>
                      <p className="font-bold text-heading">{c.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {c.issuer}
                        {c.date ? ` · ${c.date}` : ""}
                      </p>
                    </div>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View credential: ${c.title}`}
                        className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-royal hover:text-accent"
                      >
                        <ExternalLink className="size-4" aria-hidden />
                      </a>
                    )}
                  </div>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
