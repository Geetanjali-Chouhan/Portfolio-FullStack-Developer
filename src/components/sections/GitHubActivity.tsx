import { ArrowUpRight, BookMarked, CalendarDays, Code2, GitCommitHorizontal } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { getGitHubData } from "@/lib/github";
import { ContributionGraph } from "@/components/ContributionGraph";
import { CountUp } from "@/components/effects/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

// CSS variables (globals.css) so the bar colours live in one place.
const LANGUAGE_COLORS = [0, 1, 2, 3, 4, 5].map((i) => `var(--lang-${i})`);

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
  /** Numeric stats count up from 0 via GSAP (data-count). */
  count?: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 shadow-card">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal-50 text-accent">
        <Icon className="size-6" aria-hidden />
      </span>
      <div>
        <p className="text-2xl font-extrabold text-heading">
          {count === undefined ? value : <CountUp value={count} />}
        </p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}

export function GitHubSkeleton() {
  return (
    <Section id="github" eyebrow="Open source" title="GitHub activity" tone="mist">
      <div aria-busy="true" className="grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-card" />
        ))}
        <div className="h-48 animate-pulse rounded-2xl border border-line bg-card sm:col-span-3" />
      </div>
    </Section>
  );
}

export async function GitHubActivity() {
  const data = await getGitHubData();

  const profileButton = (
    <ButtonLink href={site.links.github} target="_blank" rel="noopener noreferrer" variant="navy">
      <FaGithub className="size-4" aria-hidden />
      View GitHub profile
    </ButtonLink>
  );

  if (!data) {
    return (
      <Section
        id="github"
        eyebrow="Open source"
        title="GitHub activity"
        description="Live GitHub statistics are temporarily unavailable. My repositories are always on GitHub."
        tone="mist"
      >
        <div className="flex justify-center">{profileButton}</div>
      </Section>
    );
  }

  // Prefer the curated one-liner for repos that are featured above.
  const curated = new Map(
    projects.flatMap((p) => (p.repo ? [[p.repo.toLowerCase(), p.tagline] as const] : [])),
  );
  const topLanguage = data.languages[0];

  return (
    <Section
      id="github"
      eyebrow="Open source"
      title="GitHub activity"
      description="Live data from my public GitHub profile, refreshed hourly."
      tone="mist"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Reveal>
          <Stat
            Icon={BookMarked}
            value={String(data.publicRepos)}
            count={data.publicRepos}
            label="Public repositories"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <Stat
            Icon={GitCommitHorizontal}
            value={data.contributions ? String(data.contributions.total) : "—"}
            count={data.contributions?.total}
            label="Contributions in the last year"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <Stat Icon={Code2} value={topLanguage?.name ?? "—"} label="Most-used language" />
        </Reveal>
      </div>

      {data.contributions && (
        <Reveal className="mt-5">
          <div className="rounded-2xl border border-line bg-card p-5 shadow-card sm:p-7">
            <h3 className="mb-5 flex items-center gap-2 font-bold text-heading">
              <CalendarDays className="size-5 text-accent" aria-hidden />
              Contribution graph
            </h3>
            <ContributionGraph days={data.contributions.days} total={data.contributions.total} />
          </div>
        </Reveal>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
        {data.languages.length > 0 && (
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-card p-5 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 font-bold text-heading">
                <Code2 className="size-5 text-accent" aria-hidden />
                Languages used
              </h3>
              <div
                role="img"
                aria-label={`Language breakdown: ${data.languages
                  .map((l) => `${l.name} ${l.percent.toFixed(0)}%`)
                  .join(", ")}`}
                className="mt-5 flex h-3 overflow-hidden rounded-full bg-mist"
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
                  <li key={l.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2.5 font-medium text-ink">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ background: LANGUAGE_COLORS[i % LANGUAGE_COLORS.length] }}
                      />
                      {l.name}
                    </span>
                    <span className="font-mono text-muted">{l.percent.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-line bg-card p-5 shadow-card sm:p-7">
            <h3 className="flex items-center gap-2 font-bold text-heading">
              <BookMarked className="size-5 text-accent" aria-hidden />
              Recent public projects
            </h3>
            <ul className="mt-4 divide-y divide-line">
              {data.repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-royal-50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-heading group-hover:text-accent">
                        {repo.name}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        {curated.get(repo.url.toLowerCase()) ?? repo.description ?? "Public repository"}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-muted">
                      <span className="hidden font-mono sm:block">{repo.language}</span>
                      <span className="hidden sm:block">{monthYear.format(new Date(repo.pushedAt))}</span>
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
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
