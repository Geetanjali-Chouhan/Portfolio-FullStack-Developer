import { ArrowUpRight, BookMarked, CalendarDays, Code2, GitCommitHorizontal, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { getGitHubData } from "@/lib/github";
import { ContributionGraph } from "@/components/ContributionGraph";
import { CountUp } from "@/components/effects/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

const LANGUAGE_COLORS = ["#C5A46D", "#142B50", "#2563EB", "#0B1428", "#9A7B45", "#DFCA9F"];

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

function Stat({
  Icon,
  value,
  label,
  count,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  count?: number;
}) {
  return (
    <TiltCard className="flex items-center gap-4 rounded-3xl border border-[#C5A46D]/35 bg-white p-5 shadow-card hover:border-[#C5A46D]">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#C5A46D]/40 bg-[#0B1428] text-[#DFCA9F] shadow-xs">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="font-editorial text-2xl font-bold text-[#0B1428]">
          {count === undefined ? value : <CountUp value={count} />}
        </p>
        <p className="text-xs text-[#64748B]">{label}</p>
      </div>
    </TiltCard>
  );
}

export function GitHubSkeleton() {
  return (
    <Section id="github" eyebrow="Open Source" title="GitHub Activity & Contributions" tone="mist">
      <div aria-busy="true" className="grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-3xl border border-[#C5A46D]/20 bg-white" />
        ))}
        <div className="h-48 animate-pulse rounded-3xl border border-[#C5A46D]/20 bg-white sm:col-span-3" />
      </div>
    </Section>
  );
}

export async function GitHubActivity() {
  const data = await getGitHubData();

  const profileButton = (
    <ButtonLink href={site.links.github} target="_blank" rel="noopener noreferrer" variant="luxury" size="lg">
      <FaGithub className="size-4 text-[#DFCA9F]" aria-hidden />
      Explore My GitHub Profile
    </ButtonLink>
  );

  if (!data) {
    return (
      <Section
        id="github"
        eyebrow="Open Source"
        title="GitHub Activity & Contributions"
        description="Live GitHub metrics are temporarily synchronizing. Explore my repositories directly on GitHub."
        tone="mist"
      >
        <div className="flex justify-center">{profileButton}</div>
      </Section>
    );
  }

  const curated = new Map(
    projects.flatMap((p) => (p.repo ? [[p.repo.toLowerCase(), p.tagline] as const] : [])),
  );
  const topLanguage = data.languages[0];

  return (
    <Section
      id="github"
      eyebrow="Open Source"
      title="Verified GitHub Activity & Commits"
      description="Live data synchronized directly with my public GitHub repositories."
      tone="mist"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Reveal>
          <Stat
            Icon={BookMarked}
            value={String(data.publicRepos)}
            count={data.publicRepos}
            label="Public Repositories"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <Stat
            Icon={GitCommitHorizontal}
            value={data.contributions ? String(data.contributions.total) : "—"}
            count={data.contributions?.total}
            label="Contributions Past Year"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <Stat Icon={Code2} value={topLanguage?.name ?? "—"} label="Primary Language" />
        </Reveal>
      </div>

      {data.contributions && (
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-[#C5A46D]/35 bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-editorial mb-5 flex items-center gap-2 text-xl font-bold text-[#0B1428]">
              <CalendarDays className="size-5 text-[#9A7B45]" aria-hidden />
              Annual Contribution Heatmap
            </h3>
            <ContributionGraph days={data.contributions.days} total={data.contributions.total} />
          </div>
        </Reveal>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {data.languages.length > 0 && (
          <Reveal>
            <div className="h-full rounded-3xl border border-[#C5A46D]/35 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-editorial flex items-center gap-2 text-xl font-bold text-[#0B1428]">
                <Code2 className="size-5 text-[#9A7B45]" aria-hidden />
                Languages Used
              </h3>
              <div
                role="img"
                aria-label={`Language breakdown: ${data.languages
                  .map((l) => `${l.name} ${l.percent.toFixed(0)}%`)
                  .join(", ")}`}
                className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#EFECE6]"
              >
                {data.languages.map((l, i) => (
                  <span
                    key={l.name}
                    style={{
                      width: `${l.percent}%`,
                      background: LANGUAGE_COLORS[i % LANGUAGE_COLORS.length],
                    }}
                  />
                ))}
              </div>
              <ul className="mt-5 space-y-2.5">
                {data.languages.map((l, i) => (
                  <li key={l.name} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-2.5 font-medium text-[#0B1428]">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ background: LANGUAGE_COLORS[i % LANGUAGE_COLORS.length] }}
                      />
                      {l.name}
                    </span>
                    <span className="font-mono text-[#64748B]">{l.percent.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border border-[#C5A46D]/35 bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-editorial flex items-center gap-2 text-xl font-bold text-[#0B1428]">
              <BookMarked className="size-5 text-[#9A7B45]" aria-hidden />
              Recent Repositories
            </h3>
            <ul className="mt-4 divide-y divide-[#C5A46D]/20">
              {data.repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-[#F6F3EE]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-sm text-[#0B1428] group-hover:text-[#9A7B45]">
                        {repo.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[#64748B]">
                        {curated.get(repo.url.toLowerCase()) ?? repo.description ?? "Public repository"}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-[#64748B]">
                      <span className="hidden font-mono sm:block">{repo.language}</span>
                      <span className="hidden sm:block">{monthYear.format(new Date(repo.pushedAt))}</span>
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#9A7B45]"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 flex justify-center">{profileButton}</div>
    </Section>
  );
}
