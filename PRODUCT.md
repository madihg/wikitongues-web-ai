# Wikitongues AI - marketing site

**What it is.** The public face of the Wikitongues AI research program: an Igala-language pilot where native speakers teach and judge AI models. The site tells the story to funders, allies, and community members; the annotation platform (a separate app) does the work.

**Register.** Brand. Design communicates credibility and care; the audience is smart but not ML-literate. Copy is written in Halim Madi's plain, warm, concrete voice: short sentences, no jargon unless named and defined once, no em dashes, no hype vocabulary.

**Audience.** Funders and program officers, linguists, journalists, Igala community members. Most have never read an ML paper. They should leave understanding the loop (community teaches, models answer, community judges) and trusting the numbers.

**Non-negotiables.**
- Static export (`output: 'export'`): no server code. Live numbers come client-side from the annotation app's public aggregate endpoint and are never hardcoded; when the feed is down the page says so.
- The changelog is shared history with the app, byte-pinned by a sha256 test. Never paraphrase it here.
- Claims about data permissions state only what is documented.
- Copy lives as typed data under `content/en/*.ts`, never inline in JSX.

**Design system.** Tokens in `app/globals.css` (light-only: background #fafaf8, ink #1a1a1a, single deep-teal accent #0C6B6B, danger #b42318); semantic Tailwind names in `tailwind.config.ts` (ink, muted, line, line-strong, surface, surface-sunken, accent, danger); Fraunces for serif headings, Inter for body, via next/font; `.overline` for section eyebrows (established house pattern); `Section` primitive for page sections. Build gate: `npm run verify` (tsc + vitest + next build + smoke).
