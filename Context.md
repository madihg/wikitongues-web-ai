# Context - Wikitongues AI marketing site

Living memory for this project. Read on startup.

## What this is

The externally-facing marketing mini-site for the Wikitongues AI initiative (Igala pilot). Built from the "Wikitongues AI - Marketing Website PRD" (X0. Earn). It is the presentation surface, NOT the platform (the annotation/benchmark tool, which lives in the separate repo `madihg/wikitongues-ai` on Postgres/Neon).

Two tracks the site explains: (1) an Igala tutor, (2) the first public benchmark/leaderboard of how well AI models speak Igala. The benchmark is the headline lever. Community-led by design; pilot partner is Agnes (Ikala Wikimedians, Abuja).

## Stack & deploy

- Next.js App Router, static export (`output: 'export'`), Tailwind, TypeScript.
- Repo: https://github.com/madihg/wikitongues-web-ai
- Vercel: connected to that repo, deploys the static export.
- Content is data: everything editable under `content/en/*` and `content/config.ts`.

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
