import { GraduationCap, Briefcase, Layers, Rocket, Sprout, Puzzle } from "lucide-react";
import { site } from "@/data/site";
import { CountUp } from "@/components/effects/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type Stat = {
  value: string;
  label: string;
  Icon: typeof Layers;
  /** If set, `count` is animated from 0 by GSAP and `suffix` follows it. */
  count?: number;
  suffix?: string;
};

const stats: Stat[] = [
  { value: String(site.graduationYear), label: "Graduated", Icon: GraduationCap },
  {
    value: `${site.internshipMonths} months`,
    count: site.internshipMonths,
    suffix: " months",
    label: "Frontend internship",
    Icon: Briefcase,
  },
  { value: "MERN", label: "Core stack", Icon: Layers },
];

const values = [
  {
    title: "Scalable web applications",
    text: "Structuring code and APIs so a project stays easy to extend as it grows.",
    Icon: Rocket,
  },
  {
    title: "Always learning",
    text: "Actively deepening React, Next.js, Node.js, REST APIs, Redux and AI-assisted development.",
    Icon: Sprout,
  },
  {
    title: "Problem solving",
    text: "Breaking tricky problems into small, testable steps and enjoying the puzzle.",
    Icon: Puzzle,
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title="Turning ideas into reliable web applications"
      tone="mist"
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I&apos;m a <strong className="font-semibold text-heading">Full Stack Developer</strong>{" "}
              who enjoys transforming ideas into real-world solutions — building responsive,
              scalable web applications with the MERN stack, integrating APIs and creating
              seamless user experiences.
            </p>
            <p>
              I graduated in <strong className="font-semibold text-heading">{site.graduationYear}</strong>{" "}
              and completed a{" "}
              <strong className="font-semibold text-heading">
                {site.internshipMonths}-month Frontend Developer internship
              </strong>{" "}
              at Vijay Mantra. My projects on GitHub include a real-time chat app, a
              team-management dashboard and a browser-based voice assistant.
            </p>
            <p>
              I&apos;m passionate about learning new technologies and solving problems, and I
              use AI-assisted tools such as Claude to speed up my workflow while keeping the
              code clean and maintainable.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map(({ value, label, Icon, count, suffix }) => (
              <div
                key={label}
                className="rounded-2xl border border-line bg-card p-4 text-center shadow-card sm:p-5"
              >
                <Icon className="mx-auto size-5 text-accent" aria-hidden />
                {/* <dt> must precede <dd> in the DOM; flex-col-reverse keeps the value on top visually. */}
                <div className="mt-2 flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-muted sm:text-sm">{label}</dt>
                  <dd className="text-xl font-extrabold text-heading sm:text-2xl">
                    {count === undefined ? (
                      value
                    ) : (
                      <>
                        <CountUp value={count} />
                        {suffix}
                      </>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="grid gap-4">
          {values.map(({ title, text, Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08}>
                <div className="group flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal-50 text-accent transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-heading">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
