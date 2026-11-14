import { Database, LayoutDashboard, Server, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

const categoryIcons = {
  Frontend: LayoutDashboard,
  Backend: Server,
  Database: Database,
  "Tools & Flow": Wrench,
} as const;

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Arsenal"
      title="Tailored Solutions. Technical Mastery."
      description="A full-stack toolkit engineered for high-performance frontend interfaces, robust APIs, and modern development standards."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        {skillCategories.map((category, i) => {
          const CategoryIcon =
            categoryIcons[category.title as keyof typeof categoryIcons] ?? Sparkles;

          return (
            <Reveal key={category.title} delay={i * 0.08} className="h-full">
              <TiltCard className="group flex h-full flex-col justify-between rounded-[2rem] border-2 border-[#C5A46D]/35 bg-white p-6 sm:p-7 shadow-card transition-all duration-300 hover:border-[#C5A46D] hover:shadow-gold">
                <div>
                  {/* Top Bar: Icon Emblem & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl border border-[#C5A46D]/60 bg-[#0B1428] text-[#DFCA9F] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <CategoryIcon className="size-5.5 text-[#DFCA9F]" aria-hidden />
                    </div>

                    <span className="rounded-full border border-[#C5A46D]/50 bg-[#C5A46D]/15 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-[#0B1428]">
                      {category.tag}
                    </span>
                  </div>

                  {/* Category Title & Description - 100% Crisp Visible Fonts */}
                  <div className="mt-5">
                    <h3 className="font-editorial text-2xl font-bold tracking-tight text-[#0B1428]">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#475569]">
                      {category.blurb}
                    </p>
                  </div>

                  {/* Skills Rows with High Contrast & Official Colors */}
                  <ul className="mt-6 space-y-2 border-t border-[#C5A46D]/25 pt-4">
                    {category.skills.map(({ name, Icon, color, level }) => (
                      <li
                        key={name}
                        className="group/item flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 transition-all duration-200 hover:border-[#C5A46D] hover:bg-white hover:shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className="size-4.5 shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                            style={{ color }}
                          />
                          <span className="text-xs font-bold text-[#0F172A] tracking-tight">
                            {name}
                          </span>
                        </div>

                        {level && (
                          <span className="font-mono text-[10px] font-semibold text-[#64748B] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-full group-hover/item:text-[#9A7B45] group-hover/item:border-[#C5A46D]/50">
                            {level}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Verified Badge */}
                <div className="mt-6 border-t border-[#C5A46D]/20 pt-4 flex items-center justify-between text-[11px] font-mono font-bold text-[#9A7B45]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#C5A46D]" />
                    Verified Expertise
                  </span>
                  <span className="text-[#64748B]">
                    {category.skills.length} Skills
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
