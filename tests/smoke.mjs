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

console.log(
  `[smoke] OK: ${required.length} content checks passed (${html.length} bytes).`,
);
