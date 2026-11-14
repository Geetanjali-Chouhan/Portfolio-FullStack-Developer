import Image from "next/image";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact } from "react-icons/si";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { ButtonLink } from "@/components/ui/Button";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";
import { HeroIntro } from "@/components/effects/HeroIntro";
import { HeroSceneLoader } from "@/components/effects/HeroSceneLoader";
import { TypewriterText } from "@/components/effects/TypewriterText";

const socials = [
  { href: site.links.linkedin, label: "LinkedIn profile", Icon: FaLinkedinIn },
  { href: site.links.github, label: "GitHub profile", Icon: FaGithub },
];

function FloatingChip({
  children,
  label,
  position,
  float,
  size = "size-13",
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
        className={`grid ${size} place-items-center rounded-2xl border border-[#C5A46D]/40 bg-[#0B1428]/90 text-white shadow-lift backdrop-blur-md transition-transform duration-300 hover:scale-110 ${float}`}
      >
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const photo = getProfilePhoto();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#F6F3EE] pt-8 pb-20 sm:pt-14 sm:pb-28"
    >
      {/* Background radial atmosphere */}
      <div
        aria-hidden
        className="absolute top-0 right-1/4 -z-10 size-160 rounded-full bg-radial from-[#C5A46D]/15 via-[#142B50]/5 to-transparent blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 -z-10 size-140 rounded-full bg-radial from-[#142B50]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* 3D Three.js Interactive Luxury Scene */}
      <HeroSceneLoader />
      {/* GSAP entrance timeline */}
      <HeroIntro />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="pt-4 lg:pt-0">
            {/* Top Eyebrow */}
            <div data-hero-greet className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/12 px-4 py-1.5 backdrop-blur-xs">
              <Sparkles className="size-3.5 text-[#9A7B45]" aria-hidden />
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-[#0B1428] uppercase">
                Geetanjali Chouhan · 2024 Graduate
              </span>
            </div>

            {/* Editorial Heading with Running Typewriter Text for MERN Full Stack */}
            <h1
              id="hero-title"
              className="font-editorial text-4xl leading-[1.08] font-medium tracking-tight text-[#0B1428] sm:text-6xl lg:text-[4.2rem]"
            >
              <span className="block italic text-[#9A7B45] font-normal text-2xl sm:text-3xl md:text-4xl mb-1">
                Engineering
              </span>
              <span className="block min-h-[1.18em] font-bold text-[#0B1428]">
                <TypewriterText
                  words={[
                    "MERN Full Stack Apps",
                    "Full Stack Solutions",
                    "React & Node Systems",
                    "High-Impact Web Products",
                  ]}
                  className="text-[#0B1428] font-bold"
                />
              </span>
              <span className="block mt-1 font-editorial text-3xl sm:text-5xl lg:text-6xl">
                that <span className="underline decoration-[#C5A46D]/50 decoration-2 underline-offset-8 text-[#142B50]">Inspire</span> &amp; <span className="text-[#9A7B45] italic font-normal">Scale.</span>
              </span>
            </h1>

            {/* Subtitle / Intro */}
            <div data-hero-item className="mt-6 max-w-xl">
              <p className="text-base leading-relaxed text-[#4A5568] sm:text-lg">
                I&apos;m <strong className="font-semibold text-[#0B1428]">{site.name}</strong>, a MERN Full Stack Developer who crafts
                high-performance, intuitive web applications with modern architecture, responsive design, and clean code.
              </p>
            </div>

            {/* Action Buttons */}
            <div data-hero-item className="mt-8 flex flex-wrap items-center gap-4">
              <ResumeDownloadButton size="lg" className="shadow-gold" />
              <ButtonLink href="#projects" variant="luxury" size="lg" className="group">
                View My Work
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 text-[#DFCA9F]" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="#contact"
                variant="luxury-outline"
                size="lg"
                className="group relative inline-flex items-center justify-center gap-0 overflow-hidden rounded-full border-2 border-[#C5A46D] bg-transparent text-[#0B1428] transition-all duration-300 hover:bg-linear-to-r hover:from-[#DFCA9F] hover:via-[#C5A46D] hover:to-[#9A7B45] hover:text-[#0B1428] hover:border-[#C5A46D] hover:shadow-gold hover:scale-105"
              >
                <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
                  Let&apos;s Connect
                </span>
                <span className="inline-flex max-w-0 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-6 group-hover:opacity-100 group-hover:translate-x-1">
                  <ArrowRight className="size-4 shrink-0 text-[#0B1428] transition-transform duration-300 -translate-x-3 group-hover:translate-x-0" />
                </span>
              </ButtonLink>
            </div>

            {/* Socials & Location */}
            <div data-hero-item className="mt-8 flex items-center gap-4">
              <ul className="flex items-center gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full border border-[#C5A46D]/40 bg-white/80 text-[#0B1428] shadow-xs transition-all duration-300 hover:scale-110 hover:border-[#C5A46D] hover:bg-[#0B1428] hover:text-[#DFCA9F]"
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <span aria-hidden className="h-5 w-px bg-[#C5A46D]/30" />
              <p className="flex items-center gap-1.5 font-mono text-xs font-medium text-[#64748B]">
                <MapPin className="size-3.5 text-[#9A7B45]" aria-hidden />
                {site.location}
              </p>
            </div>

            {/* Horizontal Stats Bar (Matching Reference Mockup) */}
            <div
              data-hero-item
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-3xl border border-[#C5A46D]/30 bg-white/70 p-4 shadow-card backdrop-blur-md"
            >
              <div className="text-center border-r border-[#C5A46D]/20 last:border-none px-2">
                <span className="block font-editorial text-2xl font-bold text-[#0B1428] sm:text-3xl">
                  {site.graduationYear}
                </span>
                <span className="block text-[11px] font-mono font-medium tracking-wider text-[#64748B] uppercase">
                  Graduation
                </span>
              </div>
              <div className="text-center sm:border-r border-[#C5A46D]/20 last:border-none px-2">
                <span className="block font-editorial text-2xl font-bold text-[#0B1428] sm:text-3xl">
                  {site.internshipMonths} Mos+
                </span>
                <span className="block text-[11px] font-mono font-medium tracking-wider text-[#64748B] uppercase">
                  Internship
                </span>
              </div>
              <div className="text-center border-r border-[#C5A46D]/20 last:border-none px-2">
                <span className="block font-editorial text-2xl font-bold text-[#9A7B45] sm:text-3xl">
                  MERN
                </span>
                <span className="block text-[11px] font-mono font-medium tracking-wider text-[#64748B] uppercase">
                  Core Stack
                </span>
              </div>
              <div className="text-center px-2">
                <span className="block font-editorial text-2xl font-bold text-[#0B1428] sm:text-3xl">
                  100%
                </span>
                <span className="block text-[11px] font-mono font-medium tracking-wider text-[#64748B] uppercase">
                  Clean Code
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Arched Luxury Portrait + 3D Glass Badges */}
          <div
            data-hero-frame
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            {/* Arched Photo Frame */}
            <div className="relative mx-auto w-full max-w-sm p-3 rounded-t-[14rem] rounded-b-[2.5rem] border-2 border-[#C5A46D]/40 bg-gradient-to-b from-[#142B50]/15 via-white/50 to-white/90 shadow-2xl backdrop-blur-xs">
              <div
                data-hero-photo
                className="relative aspect-4/5 w-full overflow-hidden rounded-t-[13rem] rounded-b-[2rem] bg-gradient-to-b from-[#142B50] to-[#0B1428]"
              >
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Portrait of ${site.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
                    className="object-cover object-top mask-intersect mask-[linear-gradient(to_bottom,#000_88%,transparent)] transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-5xl font-editorial font-bold text-[#DFCA9F]">
                    {site.monogram}
                  </div>
                )}
              </div>

              {/* Floating Tech Chips */}
              <FloatingChip label="React" position="-top-3 -left-3 sm:-left-5" float="animate-float">
                <SiReact className="size-6 text-[#38bdf8]" aria-hidden />
              </FloatingChip>
              <FloatingChip label="Node.js" position="top-24 -right-3 sm:-right-5" float="animate-float-slow">
                <SiNodedotjs className="size-6 text-[#4ade80]" aria-hidden />
              </FloatingChip>
              <FloatingChip
                label="MongoDB"
                position="top-64 -left-3 sm:-left-6 hidden sm:grid"
                float="animate-float-slow"
              >
                <SiMongodb className="size-6 text-[#22c55e]" aria-hidden />
              </FloatingChip>
              <FloatingChip
                label="Next.js"
                position="-top-2 right-10"
                float="animate-float"
                size="size-11"
              >
                <SiNextdotjs className="size-5 text-white" aria-hidden />
              </FloatingChip>

              {/* Editorial Luxury Dark Floating Card */}
              <div data-hero-card className="absolute -bottom-8 -right-2 sm:-right-6 max-w-[19rem]">
                <div className="glass-panel-dark rounded-2xl p-4 shadow-lift border border-[#C5A46D]/50">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rotate-45 bg-[#DFCA9F] shadow-[0_0_8px_#DFCA9F]" />
                    <p className="font-mono text-[11px] font-semibold tracking-wider text-[#DFCA9F] uppercase">
                      Architecture &amp; Code
                    </p>
                  </div>
                  <p className="font-editorial mt-2 text-base font-medium leading-snug text-white">
                    &ldquo;Building with Purpose. Code that Scales.&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-[#AAB5C5]">
                    React · Next.js · Node.js · MongoDB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
