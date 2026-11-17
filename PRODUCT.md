# Wikitongues AI - marketing site

**What it is.** The public face of the Wikitongues AI research program: an Igala-language pilot where native speakers teach and judge AI models. The site tells the story to funders, allies, and community members; the annotation platform (a separate app) does the work.

**Register.** Brand. Design communicates credibility and care; the audience is smart but not ML-literate. Copy is written in Halim Madi's plain, warm, concrete voice: short sentences, no jargon unless named and defined once, no em dashes, no hype vocabulary.

**Audience.** Funders and program officers, linguists, journalists, Igala community members. Most have never read an ML paper. They should leave understanding the loop (community teaches, models answer, community judges) and trusting the numbers.

**Non-negotiables.**
- Static export (`output: 'export'`): no server code. Live numbers come client-side from the annotation app's public aggregate endpoint and are never hardcoded; when the feed is down the page says so.
- The changelog is shared history with the app, byte-pinned by a sha256 test. Never paraphrase it here.
- Claims about data permissions state only what is documented.
- Copy lives as typed data under `content/en/*.ts`, never inline in JSX.

**Design system.** The Wikitongues AI design language, v1 (2026-11-13), shared with the annotation platform. Tokens in `styles/tokens.css` (light only: warm paper #fbf8f2, ink #26211c, one accent, the parent brand's violet #3814a5); the Tailwind mapping in `styles/tailwind.site.ts`. Inter is self-hosted as one file (`app/fonts/InterVariable-wt.woff2`) so an Igala letter and its tone mark come from the same font; Fraunces is for English headings only. Nothing under 12px, targets 44px or more, two radii, no shadows on things that sit on the page. `Section` primitive for page sections. Build gate: `npm run verify` (tsc + vitest + next build + smoke).

**Structure (since 2026-11-13).** Two pages. `/` is the explanation: what it is, the problem, how it works (the loop diagram, `components/method`), results, what we got wrong, who does the work, take part, questions. `/record/` is the evidence: every blind comparison, the exam, each version, how one answer is built, the exact instructions, the questions by area, open questions, further reading, the dated log. `/how-it-works/` and `/research/` are stubs that forward old links, anchors included (`lib/legacy.ts`). One name for our system everywhere: the language layer.
