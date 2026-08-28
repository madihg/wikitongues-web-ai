# Context - Wikitongues AI marketing site

Living memory for this project. Read on startup.

## What this is

The externally-facing marketing mini-site for the Wikitongues AI initiative (Igala pilot). Built from the "Wikitongues AI - Marketing Website PRD" (X0. Earn). It is the presentation surface, NOT the platform (the annotation/benchmark tool, which lives in the separate repo `madihg/wikitongues-ai` on Postgres/Neon).

Two tracks the site explains: (1) an Igala tutor, (2) the first public benchmark/leaderboard of how well AI models speak Igala. The benchmark is the headline lever. Community-led by design; pilot partner is Agnes (Ikala Wikimedians, Abuja).

## Stack & deploy

- Next.js App Router, static export (`output: 'export'`), Tailwind, TypeScript.
- Repo: https://github.com/madihg/wikitongues-web-ai
- Vercel project: **`wikitongues-ai-site`** -> https://wikitongues-ai-site.vercel.app
- Git-connected: pushes to `main` auto-deploy.
- Content is data: everything editable under `content/en/*` and `content/config.ts`.

## READ THIS: the two URLs (do not confuse them)

Three near-identical names caused a real mix-up on 2026-08-11. The mapping:

| URL                              | What it serves                                                                                              | Vercel project        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------- |
| `wikitongues-ai-site.vercel.app` | **THIS marketing site**                                                                                     | `wikitongues-ai-site` |
| `wikitongues-ai-web.vercel.app`  | **The ANNOTATOR PLATFORM** (`/login`, `/annotator`, `/learner`) - annotators depend on this, never touch it | `wikitongues-ai`      |
| `web-three-rho-89.vercel.app`    | Platform's stable alias; the site's stats API reads from it                                                 | `wikitongues-ai`      |

How to tell them apart in one command: the marketing site 404s `/login`; the platform returns 200.

History: the first Vercel project was named after the local folder (`wikitongues-ai-web`), one letter-swap from the repo (`wikitongues-web-ai`) and confusingly close to the platform (`wikitongues-ai`). It was later renamed, which freed `wikitongues-ai-web.vercel.app` for the platform to take. Resolved by creating the distinctly-named `wikitongues-ai-site` project. The old `wikitongues-web-ai` project still exists and still serves an older build - safe to delete via the Vercel dashboard.

## Key decisions (made 2026-06-18)

- **Design:** match wikitongues.org (neutral, human-first, generous whitespace, all-sans) and evolve it - editorial **Fraunces** serif headlines + **Inter** body, one restrained accent **deep teal #0C6B6B** (AA-verified), used for CTAs, timeline markers, leaderboard.
- **Rights FAQ:** "labeled drafts, visible" - principled answers shown with a "Draft - pending sign-off" badge. Flip to `approved` in `content/en/faq.ts` once Daniel + community sign off. `getApprovedFaq` ensures drafts never leak into structured data.
- **Leaderboard:** illustrative sample, clearly labelled "not real results." Replace with live data + `kind:'live'` for the October launch.
- **Donation:** links to the existing Wikitongues flow (donorsupport.co) with a note to direct the gift to the AI initiative. Confirm exact mechanism with Daniel.

## Timeline shipped on the site (source of truth: PRD + Gmail + hmart todos)

June 2026 kickoff (past) -> By June 22 prototype+corpus to advisory council -> July lock rubric + baseline benchmark -> August SF working session + dataset expansion -> September site live + data-ownership menu + first funder update -> Oct 4-5 public launch + first leaderboard at Wikimedia Foundation conference, Ghana.

## Verification

`npm run verify` = typecheck + vitest (10 content tests) + static build + smoke test (16 content checks against out/index.html). All green as of build. Visually verified desktop + mobile via preview.

## Open items / next steps

- Get final language-rights wording signed off by Daniel + community, flip those FAQ items to `approved`.
- Confirm donation mechanism with Daniel (donorsupport.co checkbox vs PayPal Giving Fund).
- Add real leaderboard data when the benchmark runs (July baseline / October launch).
- Hero media slot is text-forward; drop in the community video/photography when ready (`MediaSlot`).
- Consider custom domain / reverse-proxy to wikitongues.org/ai for the September public launch.
- i18n: add an Igala (`content/ig/`) version if needed for launch.

## Session State (2026-06-18)

- **Task:** Build + deploy the marketing site. DONE - scaffolded, content populated from Supabase (hmart todos) + Gmail + PRD, verified, and being pushed to GitHub + Vercel.
- **Files:** full Next.js app under app/, components/, content/, lib/, tests/. Config: next.config.mjs (export), tailwind.config.ts, vercel.json.
- **Next:** monitor first Vercel production deploy; then the open items above.

## Session State (2026-08-28) - the /how-it-works page

- **Task:** DONE - added the public, funder/ally-facing `/how-it-works/` page: full content parity with the platform's researcher-gated How-it-works page, in THIS site's design language.
- **Live numbers:** client-side fetch of `https://web-three-rho-89.vercel.app/api/public/method-metrics` (new aggregate-only endpoint in the platform repo; override with `NEXT_PUBLIC_METHOD_METRICS_API_URL`). Three honest states only - "loading", live, or "live numbers unavailable". NO recorded fallback scores anywhere: a stale benchmark presented as current is the exact failure the page warns against (contrast: the Research page's StatsGrid does keep a labelled fallback snapshot). The payload is runtime-validated (`parseMethodMetrics`); malformed data renders as unavailable.
- **Verbatim prompts:** the platform's system prompts v2 + v3 + terminal contract ship as a build-time copy in `content/en/igalaPrompts.ts`, labelled on the page with source file + commit + copy date. sha256 integrity hashes are test-enforced - to update, re-copy from the app repo (`web/src/lib/generation-prompt-v2.ts` / `-v3.ts`) and refresh hashes + provenance, never hand-edit.
- **New files:** `app/how-it-works/page.tsx`, `content/en/howItWorks.ts` (all copy as data, live templates carry `{tokens}`), `content/en/igalaPrompts.ts`, `components/how-it-works/*` (MethodStats, SystemDiagram - HTML/CSS diagram, not SVG - JourneyStages, AgreementBoard with benchmark bars + raw chrF table, PromptBlock, LiveFilledText, useMethodMetrics, liveValues, format). Touched: nav + footer (`content/en/site.ts`), `content/config.ts` (methodMetricsApi), `content/types.ts` (PublicMethodMetrics mirror), `app/sitemap.ts`, `app/globals.css` + `tailwind.config.ts` (new `--color-danger` #b42318, AA), tests (`tests/how-it-works-page.test.ts`, smoke checks for `out/how-it-works/index.html`).
- **House adaptations for the public page:** no individual annotators named (community/role phrasing), no em dashes, no links into the private app repo (provenance as plain text).
- **Next:** when the platform endpoint's payload grows, extend `content/types.ts` + `parseMethodMetrics` in lockstep; refresh prompt snapshots when v4 ships publicly.
