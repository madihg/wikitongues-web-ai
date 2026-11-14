// Post-build smoke test: proves the structured content actually rendered into
// the exported static HTML. Run after `next build` (see `npm run verify`).
//
// The site is two pages and two redirect stubs:
//   out/index.html               the main page: the explanation
//   out/record/index.html        the record: the evidence
//   out/how-it-works/index.html  a stub that forwards old links
//   out/research/index.html      a stub that forwards old links
import { readFileSync, existsSync } from "node:fs";

function read(file) {
  if (!existsSync(file)) {
    console.error(`[smoke] FAIL: ${file} not found. Did the export build run?`);
    process.exit(1);
  }
  return readFileSync(file, "utf8");
}

// The static HTML escapes apostrophes; compare on the unescaped text.
const plain = (html) =>
  html.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

function check(name, html, required, forbidden = []) {
  const text = plain(html);
  const missing = required.filter((needle) => !text.includes(needle));
  if (missing.length > 0) {
    console.error(`[smoke] FAIL: expected content missing from ${name}:`);
    for (const m of missing) console.error(`  - ${JSON.stringify(m)}`);
    process.exit(1);
  }
  for (const f of forbidden) {
    if (text.includes(f)) {
      console.error(`[smoke] FAIL: ${name} unexpectedly contains ${JSON.stringify(f)}`);
      process.exit(1);
    }
  }
}

// ── The main page ───────────────────────────────────────────────────────
const home = read("out/index.html");
const homeRequired = [
  // what it is
  "Speakers teach AI models their own language.",
  "Wikitongues AI is a method and a platform.",
  "about 1.6 million people",
  // the no-figure result line is what the static file carries
  "So far they prefer the answer made with their own corrections.",
  // the problem
  "Most languages are missing from AI",
  // the loop: the still and all eight steps are in the HTML as text
  "How it works",
  "The whole loop. Press play, or read the steps below.",
  "A speaker gets a question and writes their own answer in Igala.",
  "Two AI models answer the same question.",
  "The speaker picks the better answer without knowing which model wrote it.",
  "The speaker corrects the mistakes by hand and says why.",
  "The correction is saved in the language layer, next to rules that linguists have checked.",
  "The next question goes to the model with matching pieces from the language layer.",
  "Every pick is counted. The counts show how well each model writes Igala.",
  "Speech uses the same loop: record a clip, check it, listen to the model.",
  'viewBox="0 0 360 400"',
  // results, with the caveat beside the starting figure
  "Results",
  "99 of every 100",
  "not a before and after",
  "What this does not show",
  // corrections
  "What we got wrong",
  "Our first score rewarded missing tone marks",
  "We described a permission we did not have",
  // who, and ownership
  "Who does the work",
  "they are paid for their time",
  "Who owns the data",
  // take part
  "Take part",
  "You speak a language that AI gets wrong",
  "donorsupport.co",
  "hello@wikitongues.org",
  // questions
  "Do you retrain the AI models?",
  // nav and parent
  "The record",
  "wikitongues.org",
  // old home anchors kept as aliases
  'id="project"',
  'id="support"',
  'id="faq"',
];
// Retired content must be gone. (Live templates with {tokens} do appear in the
// file, inside the data React sends to the browser; that no token reaches a
// reader is proved by tests/home-render.test.tsx.)
const homeForbidden = [
  "Illustrative sample",
  "Gemma",
  "Two tracks, one principle",
  "Draft - pending sign-off",
  "To be annotated",
  "Public launch in Ghana",
  "—",
  "–",
];
check("out/index.html", home, homeRequired, homeForbidden);
if (home.length < 5000) {
  console.error(`[smoke] FAIL: out/index.html looks too small (${home.length} bytes).`);
  process.exit(1);
}

// ── The record ──────────────────────────────────────────────────────────
// Static story + verbatim prompts must be in the export; live figures are
// fetched client-side so no score may appear here.
const record = read("out/record/index.html");
const recordRequired = [
  "The record",
  "On this page",
  // the nine sections, in order of trust
  "Every blind comparison",
  "The exam",
  "Each version of the language layer",
  "How one answer is built",
  "The exact instructions the models receive",
  "The questions, by area",
  "Open questions",
  "Further reading",
  "What changed, when",
  // versions run to the current one
  "v0, plain models",
  "v4.5, tone marks left off",
  "The current version is 4.5",
  // assembly
  "The rules (system prompt)",
  "checked before exam questions",
  // the verbatim prompts + their provenance labels
  "You are a fluent native speaker of Igala",
  "CLOSED-CLASS GRAMMAR",
  "Answer in Igala only. Give the answer itself, nothing else.",
  "generation-prompt-v2.ts",
  "generation-prompt-v3.ts",
  "d1cec50cb417",
  // exam story (prose ships static; scores are live-only)
  "Community Agreement Score",
  "Why a bar could pass 100, what we fixed, and what it revealed.",
  "scores higher than every real system",
  "Why it is measured on the leak-free subset, and who wrote the answers.",
  // open questions
  "Two grammar questions only speakers can settle.",
  "Tone marks.",
  // further reading: real links only
  "arxiv.org/abs/2402.19167",
  // the dated log, verbatim
  "Aug 17, 2026",
  "Aug 29, 2026",
  "Sep 1, 2026",
  "Sep 3, 2026",
  "mostly built in",
  "Global Recordings Network signed a copyright agreement (Aug 27)",
  "Outreach to other rights holders",
  // old anchors kept as aliases
  'id="journey"',
  'id="further-reading"',
];
const recordForbidden = [
  // aggregate-only guarantee
  "annotatorId",
  "passwordHash",
  "@test.com",
  // stale lines that this change removed
  "This is the version serving today",
  "The whole system",
  "To be annotated",
];
check("out/record/index.html", record, recordRequired, recordForbidden);

// ── The redirect stubs ──────────────────────────────────────────────────
// Each must carry the forwarding script with its anchor map, a noindex tag,
// and plain links for a browser where the script does not run.
const stubs = [
  {
    file: "out/how-it-works/index.html",
    required: [
      "location.replace",
      '"fallback":"/#how-it-works"',
      '"changelog":"/record/#changelog"',
      '"journey":"/record/#versions"',
      "noindex",
      "This page has moved",
      'href="/record/"',
    ],
  },
  {
    file: "out/research/index.html",
    required: [
      "location.replace",
      '"fallback":"/"',
      '"findings":"/#results"',
      '"how":"/#how-it-works"',
      "noindex",
      "This page has moved",
    ],
  },
];
for (const stub of stubs) check(stub.file, read(stub.file), stub.required);

// The main page forwards the two old home sections that moved to the record.
check("out/index.html (legacy anchors)", home, [
  '"timeline":"/record/#changelog"',
  '"research":"/record/#reading"',
]);

// The sitemap lists the two real pages and neither stub.
const sitemap = read("out/sitemap.xml");
check("out/sitemap.xml", sitemap, ["/record/"], ["/how-it-works/", "/research/"]);

console.log(
  `[smoke] OK: ${homeRequired.length} main page + ${recordRequired.length} record + ` +
    `${stubs.reduce((n, s) => n + s.required.length, 0)} stub content checks passed ` +
    `(main ${home.length} bytes, record ${record.length} bytes).`,
);
