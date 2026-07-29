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
const researchMissing = researchRequired.filter((n) => !researchHtml.includes(n));
if (researchMissing.length > 0) {
  console.error("[smoke] FAIL: expected content missing from out/research/index.html:");
  for (const m of researchMissing) console.error(`  - ${JSON.stringify(m)}`);
  process.exit(1);
}

// Aggregate-only guarantee: the statically built page must never inline any
// per-person data fields (it only ever fetches aggregate counts at runtime).
for (const forbidden of ["annotatorId", "passwordHash"]) {
  if (researchHtml.includes(forbidden)) {
    console.error(`[smoke] FAIL: research page unexpectedly contains ${JSON.stringify(forbidden)}`);
    process.exit(1);
  }
}

console.log(
  `[smoke] OK: ${required.length} home + ${researchRequired.length} research content checks passed ` +
    `(home ${html.length} bytes, research ${researchHtml.length} bytes).`,
);
