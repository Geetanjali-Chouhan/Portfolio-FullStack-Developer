import { Database, LayoutDashboard, Server, Wrench } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const categoryIcons = {
  Frontend: LayoutDashboard,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
} as const;

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="The tools I build with"
      description="A full-stack toolkit, from pixel-level UI to databases and deployment workflow."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, i) => {
          const CategoryIcon = categoryIcons[category.title as keyof typeof categoryIcons];
          return (
            <Reveal key={category.title} delay={(i % 2) * 0.08} className="h-full">
              <section
                aria-labelledby={`skills-${category.title}`}
                className="h-full rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-royal text-white shadow-md shadow-royal/25">
                    <CategoryIcon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 id={`skills-${category.title}`} className="text-lg font-extrabold text-heading">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted">{category.blurb}</p>
                  </div>
                </div>

                <ul data-stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {category.skills.map(({ name, Icon, color }) => (
                    <li
                      key={name}
                      className="group flex flex-col items-center gap-2.5 rounded-xl border border-line bg-mist px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:bg-card hover:shadow-lift"
                    >
                      <Icon
                        className="size-8 transition-transform duration-300 group-hover:scale-110"
                        style={{ color }}
                      />
                      <span className="text-sm font-semibold text-heading">{name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
