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
- `npm run test` - vitest: the copy rules (caption length, sentence length, no dashes, one name for the system), the eight steps of the loop, the loop under autoplay, keyboard and reduced motion, both pages with the figures feed up and down, every old anchor, the pinned changelog and prompt hashes
- `npm run build` - static export to `./out`
- `npm run smoke` - asserts the real content rendered into `out/index.html`, `out/record/index.html` and the two redirect stubs

## Editing content (no code changes needed)

All project facts live as typed data under `content/en/`. Edit one file and the rendered section updates:

| File                       | What it controls                                                    |
| -------------------------- | ------------------------------------------------------------------- |
| `content/en/home.ts`       | The main page: hero, problem, results, corrections, who, take part, questions |
| `content/en/method.ts`     | The loop: the eight steps, their captions, notes and screen-reader text |
| `content/en/record.ts`     | The record: comparisons, exam, versions, instructions, open questions, the dated log |
| `content/en/reading.ts`    | Further reading (entries with a checked link only)                  |
| `content/en/site.ts`       | Nav labels, footer                                                  |
| `content/config.ts`        | Donate URL, site URL, the two live-figure endpoints                 |
| `lib/legacy.ts`            | Where each old link goes now                                        |

### Live figures

A sentence that carries a figure has two forms: `live`, with `{tokens}` filled from the platform's public endpoint when the page is read, and `fallback`, with no figure in it. No recorded figure is typed into a content file. The changelog in `record.ts` is fixed history and is pinned by a hash in the tests: add to it, never rewrite it.

## i18n

v1 is English-only but structured for translation: all strings live under `content/en/`. Add `content/ig/` and widen the `Locale` type to add a language later.

## Accessibility & performance

WCAG 2.1 AA: semantic landmarks, single `<h1>`, keyboard-operable nav and FAQ (native `<details>`), visible focus rings, `prefers-reduced-motion` honored, color is never the only signal (mistakes, picks and draws differ by shape). Nothing under 12px, targets 44px or more. The loop diagram works by keyboard, without motion and without JavaScript. Self-hosted fonts via `next/font`.
