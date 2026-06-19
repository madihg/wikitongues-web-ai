# Wikitongues AI - marketing site

The externally-facing mini-site for the Wikitongues AI initiative (Igala pilot): a tutor and the first public benchmark of how well AI models speak Igala, led by the community that speaks it.

This is the **marketing site**, not the platform (the annotation + benchmark tool lives in a separate repo). It is a presentation surface only - no auth, no scoring back-end.

## Stack

- Next.js (App Router) with **static export** (`output: 'export'`)
- Tailwind CSS + TypeScript
- Deployed on Vercel as a fully static site (no server runtime)

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Verify (the proof it works)

```bash
npm run verify       # typecheck + unit tests + static build + post-build smoke test
```

- `npm run typecheck` - TypeScript, no emit
- `npm run test` - vitest content-integrity tests (8 buckets, timeline parses, no draft FAQ leaks into structured data, leaderboard labelled as sample)
- `npm run build` - static export to `./out`
- `npm run smoke` - asserts the real content rendered into `out/index.html`

## Editing content (no code changes needed)

All project facts live as typed data under `content/en/`. Edit one file and the rendered section updates:

| File | What it controls |
|---|---|
| `content/en/timeline.ts` | The milestone timeline |
| `content/en/buckets.ts` | The eight evaluation dimensions |
| `content/en/research.ts` | Annotated research entries, grouped by theme |
| `content/en/faq.ts` | FAQ items + per-answer sign-off status |
| `content/en/leaderboard.ts` | Leaderboard snapshot (illustrative until real results) |
| `content/en/site.ts` | Hero copy, nav labels, section titles, footer |
| `content/config.ts` | Feature flags, donate URL, site URL, draft-FAQ toggle |

### FAQ sign-off

Each FAQ answer has `signOffStatus: 'draft' | 'approved'`. Draft answers are shown with a visible "Draft - pending sign-off" badge (set `site.showDraftFaq = false` in `content/config.ts` to withhold them entirely). Only `approved` answers ever appear in the FAQ structured data / search results. Flip the language-rights answer to `approved` once Daniel and the community sign off on the wording.

### Leaderboard

The leaderboard is feature-flagged (`flags.leaderboard`) and currently shows an **illustrative sample, clearly labelled "not real results."** Replace `content/en/leaderboard.ts` rows and set `kind: 'live'` once the first real Igala benchmark exists (launching October 2026).

## i18n

v1 is English-only but structured for translation: all strings live under `content/en/`. Add `content/ig/` and widen the `Locale` type to add a language later.

## Accessibility & performance

WCAG 2.1 AA: semantic landmarks, single `<h1>`, keyboard-operable nav and FAQ (native `<details>`), visible focus rings, `prefers-reduced-motion` honored, color is never the only signal (timeline markers, leaderboard cells). Near-zero client JS; self-hosted fonts via `next/font`.
