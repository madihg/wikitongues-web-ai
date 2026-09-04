// Post-build smoke test: proves the structured content actually rendered into
// the exported static HTML. Run after `next build` (see `npm run verify`).
import { readFileSync, existsSync } from "node:fs";

const file = "out/index.html";
if (!existsSync(file)) {
  console.error(`[smoke] FAIL: ${file} not found. Did the export build run?`);
  process.exit(1);
}

const html = readFileSync(file, "utf8");

// Each entry is content from a data file that must appear in the rendered page.
const required = [
  // hero
  "Teaching AI to speak the world",
  "Starting with Igala",
  // timeline (data-driven)
  "Kickoff with the Igala community",
  "Public launch in Ghana",
  "October 4-5, 2026",
  // evaluation buckets (data-driven)
  "Orthography",
  "Dialectal fidelity",
  "Authenticity vs translationese",
  // FAQ - lead rights question + visible draft handling
  "Who owns the data",
  "The community does",
  "Draft - pending sign-off",
  // leaderboard - clearly labelled sample + real model rows
  "Illustrative sample - not real results",
  "Claude",
  "Gemma",
  // support / donate path
  "donorsupport.co",
  // parent linkage
  "wikitongues.org",
];

// nav (rendered on every page) must carry the dedicated pages
required.push("How it works");

const missing = required.filter((needle) => !html.includes(needle));

if (missing.length > 0) {
  console.error("[smoke] FAIL: expected content missing from out/index.html:");
  for (const m of missing) console.error(`  - ${JSON.stringify(m)}`);
  process.exit(1);
}

if (html.length < 5000) {
  console.error(
    `[smoke] FAIL: out/index.html looks too small (${html.length} bytes).`,
  );
  process.exit(1);
}

// The dedicated Research page must also have exported to a static file with its
// key content (hero, diagram labels, findings, next steps) rendered in.
const researchFile = "out/research/index.html";
if (!existsSync(researchFile)) {
  console.error(
    `[smoke] FAIL: ${researchFile} not found. Did the /research route export?`,
  );
  process.exit(1);
}
const researchHtml = readFileSync(researchFile, "utf8");
const researchRequired = [
  // hero + why
  "The whole project, explained",
  "Frontier AI fails the world",
  // who (institutions, never individual annotators)
  "Igala Wikimedians",
  "New York University",
  // how - the three diagrams' headings + labels
  "Inside one annotation episode",
  "Write your own answer",
  "The data flywheel",
  "The method ladder",
  "The frozen exam",
  // findings + next
  "Early findings from the pilot",
  "A public launch in Ghana",
];
const researchMissing = researchRequired.filter(
  (n) => !researchHtml.includes(n),
);
if (researchMissing.length > 0) {
  console.error(
    "[smoke] FAIL: expected content missing from out/research/index.html:",
  );
  for (const m of researchMissing) console.error(`  - ${JSON.stringify(m)}`);
  process.exit(1);
}

// Aggregate-only guarantee: the statically built page must never inline any
// per-person data fields (it only ever fetches aggregate counts at runtime).
for (const forbidden of ["annotatorId", "passwordHash"]) {
  if (researchHtml.includes(forbidden)) {
    console.error(
      `[smoke] FAIL: research page unexpectedly contains ${JSON.stringify(forbidden)}`,
    );
    process.exit(1);
  }
}

// The How-it-works page: static story + verbatim prompts must be in the
// export; live numbers are fetched client-side so no score may appear here.
const hiwFile = "out/how-it-works/index.html";
if (!existsSync(hiwFile)) {
  console.error(
    `[smoke] FAIL: ${hiwFile} not found. Did the /how-it-works route export?`,
  );
  process.exit(1);
}
const hiwHtml = readFileSync(hiwFile, "utf8");
const hiwRequired = [
  // hero + system diagram
  "How it works",
  "The whole system",
  "The Igala community",
  "The packed prompt",
  "leak guard",
  // journey
  "v0 - plain models",
  "v3 - teach it the grammar",
  // assembly
  "The rules (system prompt)",
  "passes the leak guard",
  // the verbatim prompts + their provenance labels
  "You are a fluent native speaker of Igala",
  "CLOSED-CLASS GRAMMAR",
  "Answer in Igala only. Give the answer itself, nothing else.",
  "generation-prompt-v2.ts",
  "generation-prompt-v3.ts",
  "d1cec50cb417",
  // benchmark story (prose ships static; scores are live-only)
  "Community Agreement Score",
  "Why a bar could pass 100, what we fixed, and what it revealed.",
  "Sep 3, 2026",
  "scores higher than every real system",
  "Why it is measured on the leak-free subset, and who wrote the answers.",
  // open questions + the dated record
  "Two grammar questions only speakers can settle.",
  "What changed, when",
  "Aug 17, 2026",
  // the Aug 29 entry states documented facts only: GRN's signed agreement,
  // everything else outreach in progress (see how-it-works-page.test.ts)
  "Aug 29, 2026",
  "Sep 1, 2026",
  "mostly built in",
  "Global Recordings Network signed a copyright agreement (Aug 27)",
  "Outreach to other rights holders",
];
const hiwMissing = hiwRequired.filter((n) => !hiwHtml.includes(n));
if (hiwMissing.length > 0) {
  console.error(
    "[smoke] FAIL: expected content missing from out/how-it-works/index.html:",
  );
  for (const m of hiwMissing) console.error(`  - ${JSON.stringify(m)}`);
  process.exit(1);
}
// Aggregate-only guarantee, same as the research page.
for (const forbidden of ["annotatorId", "passwordHash", "@test.com"]) {
  if (hiwHtml.includes(forbidden)) {
    console.error(
      `[smoke] FAIL: how-it-works page unexpectedly contains ${JSON.stringify(forbidden)}`,
    );
    process.exit(1);
  }
}

console.log(
  `[smoke] OK: ${required.length} home + ${researchRequired.length} research + ${hiwRequired.length} how-it-works content checks passed ` +
    `(home ${html.length} bytes, research ${researchHtml.length} bytes, how-it-works ${hiwHtml.length} bytes).`,
);
