import Image from "next/image";
import { Check, ExternalLink, ImageOff } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, type Project } from "@/data/projects";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

function Screenshot({ project, priority }: { project: Project; priority?: boolean }) {
  const hasImage = publicFileExists(project.image);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-500 group-hover:shadow-lift">
      <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-mist px-4 py-3">
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
        <span className="size-2.5 rounded-full bg-slate-300" />
      </div>
      <div className="relative aspect-16/10 overflow-hidden bg-mist">
        {hasImage ? (
          // Taller than its frame so GSAP (data-parallax) can slide it for a depth effect.
          <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          // Deliberately NOT a fake screenshot — just an honest placeholder.
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,var(--color-royal-50),var(--color-surface))] p-6 text-center">
            <div>
              <ImageOff className="mx-auto size-8 text-accent/60" aria-hidden />
              <p className="mt-3 text-sm font-semibold text-heading">{project.name}</p>
              <p className="mt-1 text-xs text-muted">Screenshot coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <Reveal className={cn(flip && "lg:order-2")}>
        <Screenshot project={project} priority={index === 0} />
      </Reveal>

      <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
          {String(index + 1).padStart(2, "0")} · {project.tagline}
        </p>
        <h3 id={`${project.slug}-title`} className="mt-2 text-2xl font-extrabold text-heading sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul data-stagger className="mt-6 space-y-2.5" aria-label={`${project.name} key features`}>
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technology stack`}>
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-royal-100 bg-royal-50 px-2.5 py-1 font-mono text-xs font-medium text-heading"
            >
              {s}
            </li>
          ))}
        </ul>

        {(project.repo || project.live) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.repo && (
              <ButtonLink
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                aria-label={`${project.name} on GitHub (opens in a new tab)`}
              >
                <FaGithub className="size-4" aria-hidden />
                GitHub Repository
              </ButtonLink>
            )}
            {project.live && (
              <ButtonLink
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                aria-label={`${project.name} live demo (opens in a new tab)`}
              >
                <ExternalLink className="size-4" aria-hidden />
                Live Demo
              </ButtonLink>
            )}
          </div>
        )}
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Things I've built"
      description="Selected work — every feature listed is in the code."
    >
      <div className="space-y-20 sm:space-y-28">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
