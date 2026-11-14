import { cacheLife } from "next/cache";
import { site } from "@/data/site";

export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  pushedAt: string;
};

export type LanguageShare = { name: string; bytes: number; percent: number };

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubData = {
  publicRepos: number;
  repos: GitHubRepo[];
  languages: LanguageShare[];
  contributions: { total: number; days: ContributionDay[] } | null;
};

type ApiUser = { public_repos: number };
type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};
type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

async function getJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com")) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json() as Promise<T>;
}

/**
 * Live public data from GitHub's REST API plus a community contributions
 * endpoint (github-contributions-api.jogruber.de) for the calendar, since
 * GitHub's REST API doesn't expose it. Returns null when GitHub can't be
 * reached; the UI then shows a graceful fallback — it never fabricates numbers.
 */
async function loadGitHubData(): Promise<GitHubData | null> {
  const user = site.githubUser;
  try {
    const [profile, apiRepos, contributions] = await Promise.all([
      getJson<ApiUser>(`https://api.github.com/users/${user}`),
      getJson<ApiRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
      getJson<ContributionsResponse>(
        `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      ).catch(() => null),
    ]);

    const owned = apiRepos.filter((r) => !r.fork);

    // Languages by bytes across all owned repos (individual failures are skipped).
    const totals = new Map<string, number>();
    const settled = await Promise.allSettled(
      owned
        .filter((r) => r.language)
        .map((r) =>
          getJson<Record<string, number>>(
            `https://api.github.com/repos/${user}/${r.name}/languages`,
          ),
        ),
    );
    for (const result of settled) {
      if (result.status !== "fulfilled") continue;
      for (const [lang, bytes] of Object.entries(result.value)) {
        totals.set(lang, (totals.get(lang) ?? 0) + bytes);
      }
    }
    const totalBytes = [...totals.values()].reduce((a, b) => a + b, 0);
    const languages: LanguageShare[] = [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: totalBytes ? (bytes / totalBytes) * 100 : 0,
      }));

    // "Recent projects": real code repos (GitHub detected a language), newest
    // first, excluding the profile README repo.
    const repos: GitHubRepo[] = owned
      .filter((r) => r.language && r.name.toLowerCase() !== user.toLowerCase())
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        pushedAt: r.pushed_at,
      }));

    return {
      publicRepos: profile.public_repos,
      repos,
      languages,
      contributions: contributions
        ? {
            total: contributions.total.lastYear ?? Object.values(contributions.total)[0] ?? 0,
            days: contributions.contributions,
          }
        : null,
    };
  } catch (error) {
    console.error("[github] Could not load GitHub data:", error);
    return null;
  }
}

/**
 * Cached so the page stays static and fast. Refreshed hourly on success; a
 * failure is only cached briefly so it is retried soon (exactly one cacheLife
 * call runs per invocation, as the Next.js docs require).
 */
export async function getGitHubData(): Promise<GitHubData | null> {
  "use cache";
  const data = await loadGitHubData();
  if (data) {
    cacheLife("hours");
  } else {
    cacheLife("minutes");
  }
  return data;
}
