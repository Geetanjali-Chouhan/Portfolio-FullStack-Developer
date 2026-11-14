# Geetanjali Chouhan — Developer Portfolio

A fast, accessible, single-page portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Three.js**, **Framer Motion** and **Lucide / React Icons**. Clean-professional design: white and off-white surfaces with royal-blue accents.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY (see "Contact form")
npm run dev                  # http://localhost:3000
```

| Script                                    | What it does                                                      |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                             | Start the dev server                                              |
| `npm run build`                           | Production build (first prints a **pre-deploy checklist**)        |
| `npm start`                               | Serve the production build                                        |
| `npm run lint`                            | ESLint                                                            |
| `node scripts/generate-placeholder-resume.mjs` | Re-creates the placeholder resume PDF (only if you deleted it) |

> **Working inside OneDrive?** `node_modules` and `.next` contain tens of thousands of small files that OneDrive will try to sync, which is slow and can cause file-lock errors. Either move the project outside OneDrive (e.g. `C:\dev\portfolio`) or right-click those two folders → *Free up space / Always keep off this device*.

## What you must replace before sharing

The build prints a warning for each item that is still unfinished.

| Item | Where | Status |
| ---- | ----- | ------ |
| **Resume PDF** | `public/resume/Geetanjali-Chouhan-Resume.pdf` | A clearly-labelled **placeholder**. Overwrite it with your real resume, keeping the filename. All three Download buttons (navbar, hero, contact) use this file. |
| **Profile photo** | `public/images/profile.jpg` (`.png` / `.webp` also work) | Not added yet — a monogram placeholder is shown. Drop the file in; no code change needed. Portrait 4:5, ≥ 880 × 1100 px recommended. |
| **Chatting App screenshot** | `public/images/projects/chatting-app.webp` | Not added yet — the card shows an honest "Screenshot coming soon" panel. Add a 16:10 image (≈ 1400 × 875). |
| **Experience details** | `src/data/experience.ts` → `highlights` | Empty on purpose. Add real bullet points and they appear on the timeline. |
| **Degree / college** | `src/data/education.ts` | Only the graduation year (2024) is known. Add `degree`, `institution`, `location`. |
| **Certifications** | `src/data/achievements.ts` → `certifications` | Empty on purpose; the block appears once you add entries. |
| **Live demo links** | `src/data/projects.ts` → `live` | None set. The Chatting App deployment is behind Vercel Authentication, so visitors can't open it. Turn off *Deployment Protection* in Vercel (or deploy it elsewhere), then add its URL as `live`. |
| **FoodFleet** | `src/data/projects.ts` | Not found in your public GitHub repos, so it isn't listed. Make the repo public (or send details) and add a project entry. |

## Contact form

The form posts to `POST /api/contact` ([`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)), which sends email through [Resend](https://resend.com). It reports success **only** after Resend accepts the message; otherwise the visitor sees an honest error with your email as a fallback.

1. Create a free account and an API key at <https://resend.com/api-keys>.
2. Set `RESEND_API_KEY` (locally in `.env.local`, in production in your host's environment variables).
3. With Resend's shared test sender (`onboarding@resend.dev`), mail can only be delivered to **the email address your Resend account was created with** — set `CONTACT_TO_EMAIL` to that address. To deliver anywhere, verify your own domain in Resend and set `CONTACT_FROM_EMAIL`.

Validation runs in the browser **and** again on the server. A hidden honeypot field and a small per-IP rate limit reduce spam.

## Editing content

All copy lives in `src/data/`, so you rarely need to touch components:

```
src/data/
  site.ts          name, role, links, email, resume path, nav
  skills.ts        skill categories and icons
  projects.ts      project cards (features, stack, repo, screenshot)
  experience.ts    timeline entries
  education.ts     education cards
  achievements.ts  milestones and certifications
```

Only add facts you can stand behind — the site deliberately omits anything that couldn't be verified.

## GitHub activity section

`src/lib/github.ts` reads your public repositories and languages from the GitHub REST API and the contribution calendar from `github-contributions-api.jogruber.de`, cached and refreshed hourly. If GitHub is unreachable the section degrades to a link to your profile — it never shows invented numbers. Unauthenticated requests are limited to 60/hour per IP; set `GITHUB_TOKEN` (a token with **no scopes**) if you ever hit that limit.

## Deploying (Vercel — recommended)

1. Push the project to a GitHub repository (`.env.local` is git-ignored, so secrets stay out).
2. Go to <https://vercel.com/new>, import the repository. Framework preset: **Next.js** (auto-detected). Leave build settings as they are.
3. Under **Environment Variables** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (and optionally `CONTACT_FROM_EMAIL`, `GITHUB_TOKEN`).
4. Click **Deploy**.
5. (Optional) Add a custom domain under *Project → Settings → Domains*, then set `NEXT_PUBLIC_SITE_URL=https://your-domain` so canonical links, the sitemap and social previews use it. On the default `*.vercel.app` domain this is detected automatically.
6. After deploying, test the contact form once, download the resume from each of the three buttons, and paste the URL into LinkedIn and GitHub.

Other hosts work too (`npm run build && npm start` on any Node 20+ server or container). This app uses Cache Components, which isn't compatible with a pure static export (`output: "export"`).

## Animation

Three libraries, each with one job (all code in `src/components/effects/`):

| Library | Used for | Files |
| ------- | -------- | ----- |
| **Three.js** | 3D orbit system around the portrait: tilted rings, wireframe satellites, particle field, mouse parallax | `HeroScene.tsx`, `HeroSceneLoader.tsx` |
| **GSAP** | Hero entrance timeline (name words rise out of masks, chips pop in), scroll-progress bar, ScrollTrigger effects (underline draw, project-screenshot parallax, staggered skill cards / feature lists), count-up numbers | `HeroIntro.tsx`, `GsapEffects.tsx`, `CountUp.tsx`, `src/lib/gsap.ts` |
| **Framer Motion** | Simple fade/slide reveal of each section as it scrolls into view | `ui/Reveal.tsx` |

How it behaves:

- **Reduced motion:** with the OS setting on, nothing animates — the hero shows instantly, counters show their final values, and the 3D scene renders a single still frame.
- **Performance:** Three.js is a separate ~0.5 MB (minified) chunk that loads only once the browser is idle, so it never delays first paint. The render loop pauses while the hero is off-screen or the tab is hidden. If WebGL isn't available the normal hero is shown.
- **Failsafe:** the hero's hidden start state is released after 5 s even if JavaScript fails, so the page can never stay blank.
- **Tuning:** orbit sizes, colours and speeds are the constants at the top of `HeroScene.tsx`; GSAP timings are in `HeroIntro.tsx` / `GsapEffects.tsx`. To remove the 3D scene, delete `<HeroSceneLoader />` from `src/components/sections/Hero.tsx` (and `three` from `package.json`).
- Most GSAP effects are driven by data attributes (`data-hero-*`, `data-parallax`, `data-stagger`), so sections stay server components. Anything inside a `<Suspense>` boundary (the GitHub section) must animate itself from its own client component (`CountUp`, `AccentBar`): React hydrates those boundaries lazily, and styling their HTML from a global effect causes hydration mismatches.

## Performance, SEO and accessibility

- Server-rendered sections with minimal client JavaScript; Framer Motion is loaded lazily (`LazyMotion`) and respects *prefers-reduced-motion*.
- Self-hosted fonts via `next/font`, optimised images via `next/image`.
- Metadata, Open Graph / Twitter card, generated social image, JSON-LD `Person` data, `robots.txt` and `sitemap.xml`.
- Semantic landmarks, skip link, visible focus rings, keyboard-accessible mobile menu (Esc closes), ARIA labels on icon-only links, 44 px minimum touch targets, WCAG AA colour contrast.

## Design tokens

Royal `#2563EB` · Navy `#172554` · Ink `#0F172A` · Slate `#64748B` · White `#FFFFFF` · Off-white `#F8FAFC` — defined once in `src/app/globals.css` (`@theme`).
