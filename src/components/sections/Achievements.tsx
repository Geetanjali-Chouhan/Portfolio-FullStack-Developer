import Image from "next/image";
import {
  Award,
  Briefcase,
  ExternalLink,
  MessageSquareCode,
  Sparkles,
  Terminal,
} from "lucide-react";
import { certifications, milestones } from "@/data/achievements";
import { publicFileExists } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

// Unique custom icon and authentic color themes for each milestone card
const milestoneThemes = [
  {
    // Card 1: Frontend Developer Intern at Vijay Mantra
    Icon: Briefcase,
    iconColor: "text-[#38BDF8]",
    iconBorder: "border-[#38BDF8]/50",
    iconGlow: "shadow-[0_0_15px_rgba(56,189,248,0.25)]",
    tagLabel: "7 Months Internship",
    tagBg: "bg-[#E0F2FE]",
    tagText: "text-[#0369A1]",
    tagBorder: "border-[#7DD3FC]",
    dotBg: "bg-[#0284C7]",
  },
  {
    // Card 2: Real-time MERN Chatting App (Vibrant Emerald Green)
    Icon: MessageSquareCode,
    iconColor: "text-[#22C55E]",
    iconBorder: "border-[#22C55E]/50",
    iconGlow: "shadow-[0_0_16px_rgba(34,197,94,0.35)]",
    tagLabel: "MERN Stack",
    tagBg: "bg-[#DCFCE7]",
    tagText: "text-[#15803D]",
    tagBorder: "border-[#4ADE80]",
    dotBg: "bg-[#16A34A]",
    isPulsing: true,
  },
  {
    // Card 3: PulseCRUD in Vanilla JS
    Icon: Terminal,
    iconColor: "text-[#FACC15]",
    iconBorder: "border-[#FACC15]/50",
    iconGlow: "shadow-[0_0_15px_rgba(250,204,21,0.25)]",
    tagLabel: "Vanilla JS",
    tagBg: "bg-[#FEF08A]/90",
    tagText: "text-[#78350F]",
    tagBorder: "border-[#EAB308]",
    dotBg: "bg-[#CA8A04]",
    badgeText: "JS",
  },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Milestones & Accreditations"
      title="Proven Milestones. Continuous Growth."
      description="Key career milestones, internship achievements, and verified certifications."
      tone="mist"
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {milestones.map((m, i) => {
          const theme = milestoneThemes[i] ?? milestoneThemes[0];
          const CardIcon = theme.Icon;

          return (
            <li key={m.title} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard className="group flex h-full flex-col justify-between rounded-3xl border border-[#C5A46D]/35 bg-white p-5 sm:p-6 shadow-card hover:border-[#C5A46D]">
                  <div>
                    {/* Top Bar: Unique Icon & Authentic Colored Core Language/Tag */}
                    <div
                      className="flex items-center justify-between"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {/* Unique Category Icon */}
                      <span
                        className={`grid size-12 place-items-center rounded-2xl border ${theme.iconBorder} bg-[#0B1428] ${theme.iconColor} ${theme.iconGlow} shadow-xs transition-all duration-300 group-hover:scale-110`}
                      >
                        <CardIcon className="size-5" aria-hidden />
                      </span>

                      {/* Core Language/Tech Tag in Authentic Brand Color */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border ${theme.tagBorder} ${theme.tagBg} px-3 py-1 font-mono text-xs font-bold ${theme.tagText} shadow-xs`}
                      >
                        {theme.badgeText ? (
                          <span className="rounded-xs bg-[#EAB308] px-1 py-0.2 text-[9px] font-black text-[#0B1428]">
                            {theme.badgeText}
                          </span>
                        ) : (
                          <span
                            className={`size-2 rounded-full ${theme.dotBg} ${
                              theme.isPulsing ? "animate-pulse" : ""
                            }`}
                          />
                        )}
                        {theme.tagLabel}
                      </span>
                    </div>

                    {/* 3D Image Preview */}
                    {m.image && publicFileExists(m.image) && (
                      <div
                        className="mt-5 overflow-hidden rounded-2xl border border-[#C5A46D]/25 bg-[#F6F3EE] shadow-xs transition-transform duration-300"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        <div
                          aria-hidden
                          className="flex items-center gap-1.5 border-b border-[#C5A46D]/20 bg-[#F6F3EE] px-3 py-2"
                        >
                          <span className="size-2 rounded-full bg-[#EF4444]/70" />
                          <span className="size-2 rounded-full bg-[#EAB308]/70" />
                          <span className="size-2 rounded-full bg-[#22C55E]/70" />
                        </div>
                        <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EFECE6]">
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

                    {/* Content */}
                    <div
                      className="mt-5 flex flex-col"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <h3 className="font-editorial text-xl font-bold tracking-tight text-[#0B1428] transition-colors duration-200 group-hover:text-[#9A7B45]">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                        {m.detail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#C5A46D]/20 pt-3 flex items-center justify-between text-[11px] font-mono text-[#9A7B45]">
                    <span>✦ Verified Milestone</span>
                    <Sparkles className="size-3 text-[#C5A46D]" />
                  </div>
                </TiltCard>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Certifications Sub-section */}
      {certifications.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Award className="size-5 text-[#9A7B45]" aria-hidden />
            <h3 className="font-editorial text-2xl font-bold text-[#0B1428]">
              Accredited Certifications
            </h3>
          </div>

          <ul className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-1">
            {certifications.map((c) => (
              <li key={c.title} className="h-full">
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#C5A46D]/35 bg-white shadow-card hover:border-[#C5A46D]">
                  {c.image && publicFileExists(c.image) && (
                    <a
                      href={c.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View certificate image: ${c.title} (opens in a new tab)`}
                      className="group/img relative block aspect-16/9 overflow-hidden border-b border-[#C5A46D]/20 bg-[#F6F3EE]"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Image
                        src={c.image}
                        alt={c.imageAlt ?? `${c.title} certificate`}
                        fill
                        sizes="(min-width: 640px) 700px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                    </a>
                  )}
                  <div
                    className="flex flex-1 items-start justify-between gap-4 p-6"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D]/30 bg-[#C5A46D]/10 px-2.5 py-0.5 font-mono text-[11px] text-[#9A7B45]">
                        <Sparkles className="size-3" />
                        Verified Credential
                      </div>
                      <p className="font-editorial mt-2 text-xl font-bold text-[#0B1428]">{c.title}</p>
                      <p className="mt-1 text-xs text-[#64748B]">
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
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-[#C5A46D]/40 bg-[#0B1428] text-[#DFCA9F] shadow-xs transition-colors hover:bg-[#142B50] hover:scale-105"
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
