import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact } from "react-icons/si";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";
import { HeroIntro } from "@/components/effects/HeroIntro";
import { HeroSceneLoader } from "@/components/effects/HeroSceneLoader";

const socials = [
  { href: site.links.linkedin, label: "LinkedIn profile", Icon: FaLinkedinIn },
  { href: site.links.github, label: "GitHub profile", Icon: FaGithub },
];

/**
 * Tech badge floating beside the portrait. The outer element is positioned and
 * animated in by GSAP (data-hero-pop); the inner one carries the CSS float loop,
 * so the two animations never fight over `transform`.
 */
function FloatingChip({
  children,
  label,
  position,
  float,
  size = "size-14",
}: {
  children: React.ReactNode;
  label: string;
  position: string;
  float: string;
  size?: string;
}) {
  return (
    <div data-hero-pop className={`absolute ${position}`}>
      <div
        role="img"
        aria-label={label}
        className={`grid ${size} place-items-center rounded-2xl border border-line bg-card shadow-card ${float}`}
      >
        {children}
      </div>
    </div>
  );
}

function PhotoPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Profile photo placeholder"
      className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_35%,var(--color-royal-100),var(--color-royal-50)_55%,var(--color-surface))]"
    >
      <div className="grid size-40 place-items-center rounded-full border-4 border-surface bg-card/80 shadow-card sm:size-48">
        <span className="text-5xl font-extrabold tracking-tight text-accent sm:text-6xl">
          {site.monogram}
        </span>
      </div>
    </div>
  );
}

/** One word of the name, clipped by a mask so GSAP can slide it up into view. */
function Word({ children, className }: { children: string; className?: string }) {
  return (
    <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
      <span data-hero-word className={`inline-block ${className ?? ""}`}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const photo = getProfilePhoto();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-surface">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 -right-32 -z-10 size-136 rounded-full bg-royal-100/70 blur-3xl"
      />
      {/* Three.js orbit scene (lazy, browser-only). Anchors itself to [data-hero-photo]. */}
      <HeroSceneLoader />
      {/* GSAP entrance timeline for everything tagged data-hero-*. */}
      <HeroIntro />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pt-12 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-20 lg:pb-28">
        {/* Left: copy */}
        <div>
          <h1
            id="hero-title"
            className="text-4xl leading-[1.08] font-extrabold tracking-tight text-heading sm:text-5xl xl:text-6xl"
          >
            <span
              data-hero-greet
              className="mb-2 block text-lg font-semibold tracking-normal text-muted sm:text-xl"
            >
              Hello, I&apos;m
            </span>
            <Word>Geetanjali</Word> <Word className="text-accent">Chouhan</Word>
          </h1>

          <div data-hero-item>
            <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
              <span className="text-shimmer">{site.role}</span>
            </p>
          </div>
          <div data-hero-item>
            <p className="mt-4 max-w-xl text-xl leading-snug font-semibold text-ink sm:text-2xl">
              {site.headline}
            </p>
          </div>
          <div data-hero-item>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.intro}
            </p>
          </div>

          <div data-hero-item className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ResumeDownloadButton />
            <ButtonLink href="#projects" variant="gradient">
              View Projects
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <div data-hero-item className="mt-8 flex items-center gap-4">
            <ul className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-card text-heading shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-royal hover:text-accent hover:shadow-md"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <span aria-hidden className="h-6 w-px bg-line" />
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 text-accent" aria-hidden />
              {site.location}
            </p>
          </div>
        </div>

        {/* Right: portrait + developer-themed accents */}
        <div
          data-hero-frame
          // `top` (not a transform) so it doesn't fight the GSAP entrance on this element.
          className="relative -top-4 mx-auto w-full max-w-sm sm:max-w-md lg:-top-8 lg:max-w-none"
        >
          {/* The portrait is a transparent cut-out, so it sits on an arch instead of inside a framed card. */}
          <div
            aria-hidden
            className="absolute inset-x-[7%] top-[16%] bottom-0 rounded-t-full bg-linear-to-b from-royal-100 via-royal-50 to-surface"
          />
          <div
            data-hero-photo
            className={
              photo
                ? "relative aspect-4/5"
                : "relative aspect-4/5 overflow-hidden rounded-[2rem] border border-line bg-mist shadow-card"
            }
          >
            {photo ? (
              <Image
                src={photo}
                alt={`Portrait of ${site.name}`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
                // Fade the bottom and right edges: the shoulders are cut off by the photo's own frame.
                className="object-cover object-top mask-intersect mask-[linear-gradient(to_bottom,#000_88%,transparent),linear-gradient(to_right,#000_90%,transparent)]"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>

          <FloatingChip label="React" position="top-8 -left-2 sm:-left-7" float="animate-float">
            <SiReact className="size-7 text-[#0ea5e9]" aria-hidden />
          </FloatingChip>
          <FloatingChip label="Node.js" position="top-28 -right-2 sm:-right-7" float="animate-float-slow">
            <SiNodedotjs className="size-7 text-[#5fa04e]" aria-hidden />
          </FloatingChip>
          <FloatingChip
            label="MongoDB"
            position="top-60 hidden sm:-left-9 sm:block"
            float="animate-float-slow"
          >
            <SiMongodb className="size-7 text-[#47a248]" aria-hidden />
          </FloatingChip>
          <FloatingChip
            label="Next.js"
            position="top-4 right-10 hidden sm:block"
            float="animate-float"
            size="size-12"
          >
            <SiNextdotjs className="size-6 text-ink" aria-hidden />
          </FloatingChip>

          {/* Code card — only states facts that appear elsewhere on this site */}
          <div data-hero-card className="absolute -bottom-7 left-3 sm:-left-8">
            <div className="w-[17.5rem] animate-float rounded-2xl border border-line bg-card p-4 shadow-lift sm:w-72">
              <div aria-hidden className="mb-3 flex gap-1.5">
                <span className="size-2.5 rounded-full bg-royal-200" />
                <span className="size-2.5 rounded-full bg-royal-200" />
                <span className="size-2.5 rounded-full bg-royal-200" />
              </div>
              <pre className="overflow-hidden font-mono text-[11px] leading-5 text-muted sm:text-xs">
                <code>
                  <span className="text-accent">const</span> <span className="text-heading">dev</span> = {"{"}
                  {"\n"}  role: <span className="text-[#0f766e]">&quot;Full Stack&quot;</span>,
                  {"\n"}  stack: [<span className="text-[#0f766e]">&quot;React&quot;</span>,{" "}
                  <span className="text-[#0f766e]">&quot;Node&quot;</span>,
                  {"\n"}           <span className="text-[#0f766e]">&quot;MongoDB&quot;</span>],
                  {"\n"}  graduated: <span className="text-accent">2024</span>,
                  {"\n"}{"}"};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
