import Image from "next/image";
import { Check, Sparkles, Trophy, UserCheck } from "lucide-react";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

const highlights = [
  "Frontend Architecture & Modern UI (React, Next.js, TypeScript, Tailwind CSS)",
  "Full-Stack APIs & Real-time Systems (Node.js, Express, Socket.IO, JWT)",
  "Database Modeling & State Management (MongoDB, Mongoose, Redux Toolkit)",
  "Completed 7-Month Frontend Internship at Vijay Mantra (Indore)",
  "Graduated in 2024 with MCA from School of Computer Science & IT (DAVV)",
];

export function About() {
  const photo = getProfilePhoto();

  return (
    <Section
      id="about"
      eyebrow="Personal Profile"
      title="Crafting Scalable Solutions with Care & Precision"
      description="A brief look into my background, core expertise, and engineering philosophy."
      tone="mist"
    >
      {/* Editorial Luxury Capsule Banner (Matches Reference Image) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C5A46D]/40 bg-[#0B1428] p-7 text-[#E8EDF5] shadow-lift sm:p-10 lg:p-12">
          {/* Subtle background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-radial from-[#C5A46D]/15 to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-radial from-[#142B50]/40 to-transparent blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr_0.8fr] lg:gap-8">
            {/* Left: Arched portrait with Gold Seal */}
            <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-[17rem]">
              <div className="relative aspect-4/5 overflow-hidden rounded-t-[10rem] rounded-b-2xl border-2 border-[#C5A46D]/50 bg-gradient-to-b from-[#142B50] to-[#0B1428] shadow-2xl">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 240px, 200px"
                    className="object-cover object-top mask-intersect mask-[linear-gradient(to_bottom,#000_85%,transparent)]"
                  />
                ) : (
                  <div className="grid h-full place-items-center font-editorial text-4xl text-[#DFCA9F]">
                    {site.monogram}
                  </div>
                )}
              </div>

              {/* Circular Gold Seal Badge (Matching Reference Mockup) */}
              <div className="absolute -bottom-4 -right-3 flex size-14 items-center justify-center rounded-full border-2 border-[#C5A46D] bg-[#0B1428] text-[#DFCA9F] shadow-gold">
                <Sparkles className="size-6 text-[#DFCA9F] animate-spin-slow" aria-hidden />
              </div>
            </div>

            {/* Center: Story & Bullet Points */}
            <div className="space-y-4">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#DFCA9F] uppercase">
                ✦ Developer Story
              </span>
              <h3 className="font-editorial text-2xl font-medium tracking-tight text-white sm:text-3xl">
                I&apos;m <span className="text-[#DFCA9F]">{site.name}</span> — full-stack developer based in {site.location}.
              </h3>
              <p className="text-sm leading-relaxed text-[#AAB5C5] sm:text-base">
                With a passion for intuitive digital interfaces and robust server architectures, I bridge the gap between design vision and technical execution. Having completed my graduation in {site.graduationYear} alongside a 7-month internship at Vijay Mantra, I specialize in building maintainable, high-speed applications.
              </p>

              <ul className="space-y-2.5 pt-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[#E8EDF5] sm:text-sm">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[#C5A46D]/20 text-[#DFCA9F]">
                      <Check className="size-3 text-[#DFCA9F]" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Floating Mission Quote Card (Matches Reference Image) */}
            <div className="h-full">
              <TiltCard className="flex h-full flex-col justify-between rounded-3xl border border-[#C5A46D]/30 bg-[#142B50]/80 p-6 text-[#E8EDF5] backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2 text-[#DFCA9F]">
                    <Sparkles className="size-4" aria-hidden />
                    <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                      My Philosophy
                    </span>
                  </div>
                  <blockquote className="font-editorial mt-4 text-base italic leading-relaxed text-white sm:text-lg">
                    &ldquo;My mission is simple: to engineer responsive web applications with clean architecture, intuitive UX, and code that remains effortlessly maintainable.&rdquo;
                  </blockquote>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-[#C5A46D]/20 pt-4">
                  <div className="grid size-9 place-items-center rounded-full bg-[#C5A46D]/20 text-[#DFCA9F]">
                    <UserCheck className="size-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{site.name}</p>
                    <p className="text-[11px] text-[#AAB5C5]">MERN Developer</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
