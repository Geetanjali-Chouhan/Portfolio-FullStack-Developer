import Image from "next/image";
import { Check, ExternalLink, ImageOff, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, type Project } from "@/data/projects";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

function Screenshot({ project, priority }: { project: Project; priority?: boolean }) {
  const hasImage = publicFileExists(project.image);

  return (
    <TiltCard className="overflow-hidden rounded-3xl border border-[#C5A46D]/40 bg-[#142B50] p-3 shadow-lift">
      <div className="overflow-hidden rounded-2xl border border-[#C5A46D]/20 bg-[#0B1428]">
        {/* Browser Mockup Top Bar */}
        <div aria-hidden className="flex items-center gap-1.5 border-b border-[#C5A46D]/20 bg-[#0B1428] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#EF4444]/80" />
          <span className="size-2.5 rounded-full bg-[#EAB308]/80" />
          <span className="size-2.5 rounded-full bg-[#22C55E]/80" />
          <span className="ml-3 font-mono text-[11px] text-[#AAB5C5]/70">
            https://{project.slug}.local
          </span>
        </div>

        <div className="relative aspect-16/10 overflow-hidden bg-[#0B1428]">
          {hasImage ? (
            <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ) : (
            <div className="grid h-full place-items-center bg-radial from-[#142B50] to-[#0B1428] p-6 text-center">
              <div>
                <ImageOff className="mx-auto size-8 text-[#DFCA9F]/60" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-white">{project.name}</p>
                <p className="mt-1 text-xs text-[#AAB5C5]">Screenshot coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TiltCard>
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/10 px-3 py-1">
          <Sparkles className="size-3 text-[#DFCA9F]" aria-hidden />
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-[#DFCA9F] uppercase">
            {String(index + 1).padStart(2, "0")} · {project.tagline}
          </p>
        </div>

        <h3
          id={`${project.slug}-title`}
          className="font-editorial mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl"
        >
          {project.name}
        </h3>

        <p className="mt-4 leading-relaxed text-[#AAB5C5] text-sm sm:text-base">
          {project.description}
        </p>

        <ul data-stagger className="mt-6 space-y-2.5" aria-label={`${project.name} key features`}>
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed text-[#E8EDF5]">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#C5A46D]/20 text-[#DFCA9F]">
                <Check className="size-3 text-[#DFCA9F]" aria-hidden />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technology stack`}>
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-[#C5A46D]/30 bg-[#142B50]/60 px-3 py-1 font-mono text-xs font-medium text-[#DFCA9F] backdrop-blur-xs"
            >
              {s}
            </li>
          ))}
        </ul>

        {(project.repo || project.live) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <ButtonLink
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                size="md"
                aria-label={`${project.name} live demo (opens in a new tab)`}
              >
                <ExternalLink className="size-4" aria-hidden />
                Live Demo
              </ButtonLink>
            )}
            {project.repo && (
              <ButtonLink
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                variant="luxury-outline"
                size="md"
                className="text-[#E8EDF5] border-[#C5A46D]/50 hover:bg-[#C5A46D]/20"
                aria-label={`${project.name} on GitHub (opens in a new tab)`}
              >
                <FaGithub className="size-4 text-[#DFCA9F]" aria-hidden />
                Source Code
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
      eyebrow="Selected Portfolio"
      title="Real Projects. Real Impact."
      description="Production-grade applications built with modern frontend frameworks and reliable backend logic."
      tone="dark"
    >
      <div className="space-y-20 sm:space-y-28">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
