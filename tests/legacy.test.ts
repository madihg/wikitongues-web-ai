import { describe, expect, it } from "vitest";
import { legacy, legacyScript, resolveLegacy } from "@/lib/legacy";
import { home } from "@/content/en/home";
import { record } from "@/content/en/record";

// Every anchor the three old pages carried on 2026-11-13 (commit 8381d8e):
// the ids passed to <Section> on /, /research/ and /how-it-works/.
const OLD_HOW_IT_WORKS = ["system", "journey", "assembly", "prompts", "verdicts", "benchmark", "tested-now", "changelog"];
const OLD_RESEARCH = ["why", "who", "how", "findings", "next", "further-reading"];
const OLD_HOME = ["overview", "project", "timeline", "research", "faq", "support"];

// Where an id lives today: on the main page, or on the record.
const MAIN_IDS = new Set([
  "overview",
  home.problem.id,
  home.howItWorks.id,
  home.results.id,
  home.corrections.id,
  home.who.id,
  home.takePart.id,
  home.questions.id,
  // aliases kept on the new sections (app/page.tsx)
  "project",
  "support",
  "faq",
]);
const RECORD_IDS = new Set([
  record.verdicts.id,
  record.benchmark.id,
  record.journey.id,
  record.assembly.id,
  record.prompts.id,
  record.areas.id,
  record.testedNow.id,
  record.reading.id,
  record.changelog.id,
]);

function exists(target: string): boolean {
  const [path, anchor] = target.split("#");
  if (path === "/") return anchor === undefined || MAIN_IDS.has(anchor);
  if (path === "/record/") return anchor === undefined || RECORD_IDS.has(anchor);
  return false;
}

/** Run the inlined script the way a browser would, with a fake location. */
function runScript(path: string, hash: string): string | null {
  let went: string | null = null;
  const location = { hash, replace: (t: string) => (went = t) };
  new Function("location", legacyScript(path))(location);
  return went;
}

describe("old links keep working", () => {
  it("routes every old /how-it-works/ anchor to a section that exists", () => {
    for (const a of OLD_HOW_IT_WORKS) {
      const to = resolveLegacy("/how-it-works/", `#${a}`);
      expect(to, a).not.toBeNull();
      expect(exists(to as string), `${a} -> ${to}`).toBe(true);
    }
    expect(resolveLegacy("/how-it-works/", "")).toBe("/#how-it-works");
    expect(resolveLegacy("/how-it-works/", "#changelog")).toBe("/record/#changelog");
    expect(resolveLegacy("/how-it-works/", "#journey")).toBe("/record/#versions");
    expect(resolveLegacy("/how-it-works/", "#system")).toBe("/#how-it-works");
  });

  it("routes every old /research/ anchor to a section that exists", () => {
    for (const a of OLD_RESEARCH) {
      const to = resolveLegacy("/research/", `#${a}`);
      expect(to, a).not.toBeNull();
      expect(exists(to as string), `${a} -> ${to}`).toBe(true);
    }
    expect(resolveLegacy("/research/", "")).toBe("/");
    expect(resolveLegacy("/research/", "#how")).toBe("/#how-it-works");
  });

  it("keeps every old home anchor: still on the page, or forwarded to the record", () => {
    for (const a of OLD_HOME) {
      const to = resolveLegacy("/", `#${a}`);
      if (to === null) expect(MAIN_IDS.has(a), a).toBe(true);
      else expect(exists(to), `${a} -> ${to}`).toBe(true);
    }
    expect(resolveLegacy("/", "#timeline")).toBe("/record/#changelog");
    // the main page never forwards a visitor who came for the main page
    expect(resolveLegacy("/", "")).toBeNull();
    expect(resolveLegacy("/", "#results")).toBeNull();
  });

  it("sends an unknown anchor to the page's default, and ignores the old -heading suffix", () => {
    expect(resolveLegacy("/how-it-works/", "#nonsense")).toBe("/#how-it-works");
    expect(resolveLegacy("/how-it-works/", "#changelog-heading")).toBe("/record/#changelog");
    expect(resolveLegacy("/nowhere/", "#x")).toBeNull();
  });

  it("inlines a script that makes the same decisions as the function", () => {
    for (const path of Object.keys(legacy)) {
      const anchors = ["", "#nonsense", ...Object.keys(legacy[path].anchors).map((a) => `#${a}`)];
      for (const hash of anchors) {
        expect(runScript(path, hash), `${path}${hash}`).toBe(resolveLegacy(path, hash));
      }
    }
  });

  it("points every target at a section that exists", () => {
    for (const rule of Object.values(legacy)) {
      if (rule.fallback) expect(exists(rule.fallback), rule.fallback).toBe(true);
      for (const to of Object.values(rule.anchors)) expect(exists(to), to).toBe(true);
    }
  });
});
