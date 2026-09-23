import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { howItWorks } from "@/content/en/howItWorks";
import {
  igalaSystemV2,
  igalaSystemV3,
  igalaSystemV4,
  igalaSystemV41,
  igalaTerminalContract,
  promptsCopiedOn,
  type PromptSnapshot,
} from "@/content/en/igalaPrompts";
import { ui } from "@/content/en/site";
import { methodMetricsApi } from "@/content/config";
import { isEnabled } from "@/lib/flags";
import {
  fill,
  fmtChrf,
  fmtSharePct,
  stripTokens,
} from "@/components/how-it-works/format";
import { liveValues } from "@/components/how-it-works/liveValues";
import { parseMethodMetrics } from "@/components/how-it-works/useMethodMetrics";
import type { PublicMethodMetrics } from "@/content/types";

const VERDICT_TOKENS = ["ceilingChrf", "count", "firstLabel", "firstNeitherPerTen", "frozenPrompts", "honestCeilingChrfAll", "latestDecided", "latestLabel", "latestNeitherPerTen", "latestOursOfDecided", "latestPlainOfDecided", "leakFreePrompts", "leakedPrompts", "lexEntries", "n", "noPreferencePct", "ours", "pairwiseComparisons", "plain", "poolBothInadequatePct", "poolComparisons", "shippedCeilingChrfAll"];

const sha256 = (s: string) =>
  createHash("sha256").update(s, "utf8").digest("hex");

function sampleMetrics(): PublicMethodMetrics {
  return {
    computedAt: "2026-08-28T00:00:00.000Z",
    humanRounds: [],
    corpus: {
      goldAnswers: 10,
      pairwiseComparisons: 20,
      pairwiseBothInadequate: 5,
      parallelPairs: 30907,
      lexEntries: 2104,
      annotators: 6,
    },
    benchmark: {
      frozenPrompts: 43,
      promptsWithGold: 40,
      leakedPrompts: 15,
      leakFreePrompts: 28,
    },
    ceilings: {
      asShipped: {
        chrfAll: 63.2,
        chrfClean: 60.1,
        nPromptsAll: 40,
        nPromptsClean: 28,
      },
      onePerAnnotator: {
        chrfAll: 46.0,
        chrfClean: 45.1,
        nPromptsAll: 38,
        nPromptsClean: 27,
      },
    },
    agreementCeilingChrf: 45.1,
    poolPreference: {
      poolComparisons: 4,
      poolBothInadequate: 1,
      poolDecided: 2,
      poolBothInadequateRate: 0.25,
    },
    candidates: [
      {
        name: "some-model",
        approach: "retrieval v2",
        n: 43,
        nClean: 28,
        strippedChrfAll: 30.5,
        strippedChrfClean: 29.1,
        agreementScore: 64.5,
        agreementCiLow: 58.0,
        agreementCiHigh: 71.2,
        agreementUnderpowered: false,
      },
    ],
  };
}

describe("how-it-works page content", () => {
  it("has the shapes the components expect", () => {
    expect(howItWorks.journey.stages).toHaveLength(6);
    expect(howItWorks.assembly.steps).toHaveLength(7);
    expect(
      howItWorks.assembly.steps.filter((s) => s.guarded),
    ).toHaveLength(4);
    expect(howItWorks.benchmark.explainer).toHaveLength(5);
    expect(howItWorks.testedNow.items).toHaveLength(3);
    expect(howItWorks.changelog.entries).toHaveLength(11);
    expect(howItWorks.live.stats).toHaveLength(6);
    for (const e of howItWorks.changelog.entries) {
      // fixed history: a dated label like "Aug 17, 2026"
      expect(e.date).toMatch(/^[A-Z][a-z]{2} \d{1,2}, 20\d{2}$/);
      expect(e.text.trim().length).toBeGreaterThan(0);
    }
  });

  it("obeys the house style: no em or en dashes in the copy", () => {
    const serialized = JSON.stringify(howItWorks);
    expect(serialized).not.toContain("—"); // em dash
    expect(serialized).not.toContain("–"); // en dash
  });

  it("keeps the changelog byte-identical to the app's CHANGELOG constant", () => {
    // The record is shared history with the annotation app's how-it-works
    // page (web/src/app/how-it-works/page.tsx, const CHANGELOG). This hash
    // was computed from that constant at copy time. If it breaks, re-copy the
    // entries verbatim from the app - never paraphrase them here, and never
    // add a claim (especially about permissions) beyond the app's exact text.
    const pairs = howItWorks.changelog.entries.map((e) => [e.date, e.text]);
    expect(sha256(JSON.stringify(pairs))).toBe(
      "095bd6eec611243cf375e5453543b2bee88d9a9d4638cb6c1f7c8e959adfe966",
    );
  });

  it("states only documented facts about source permissions (Aug 29)", () => {
    const aug29 = howItWorks.changelog.entries.find(
      (e) => e.date === "Aug 29, 2026",
    );
    expect(aug29).toBeDefined();
    // The one permission actually on file: GRN's signed agreement.
    expect(aug29?.text).toContain(
      "Global Recordings Network signed a copyright agreement (Aug 27)",
    );
    // Everything else is outreach in progress, never a granted permission.
    expect(aug29?.text).toContain("Outreach to other rights holders");
    expect(aug29?.text).toContain(
      "none of their text enters the corpus before written permission is on file",
    );
    expect(aug29?.text).not.toContain("Permission arrived");
  });

  it("records the Sep 1 audit corrections and the BSN correction", () => {
    const aug12 = howItWorks.changelog.entries.find(
      (e) => e.date === "Aug 12, 2026",
    );
    const sep1 = howItWorks.changelog.entries.find(
      (e) => e.date === "Sep 1, 2026",
    );
    expect(aug12?.text).toContain("no permission is on file");
    // The uncorrected wording joined the claim to the lexicon in one breath.
    expect(aug12?.text).not.toContain("pairs ingested under BSN permission -");
    expect(sep1?.text).toContain("mostly built in");
    expect(sep1?.text).toContain("No speaker has yet judged v4 or v4.1");
    expect(sep1?.text).toContain("change of models, not from the method");
    // The retracted sentence appears only inside quotation marks, as a retraction.
    expect(sep1?.text).toContain("was not supported and has been removed");
  });

  it("records the Sep 3 tone-control finding without softening it", () => {
    const sep3 = howItWorks.changelog.entries.find(
      (e) => e.date === "Sep 3, 2026",
    );
    expect(sep3).toBeDefined();
    // The control beat every real system. If that sentence ever goes missing,
    // the page is overselling the scoreboard again.
    expect(sep3?.text).toContain("scores higher than every real system");
    expect(sep3?.text).toContain("tone-insensitive column");
    // And the human result must stay attached to it.
    expect(sep3?.text).toContain("still prefer the v3 package");
  });

  it("no longer claims the grammar lifts Gemini measurably, anywhere", () => {
    const serialized = JSON.stringify(howItWorks);
    expect(serialized).not.toContain("lifts Gemini measurably hurts Claude");
    // The community box used to assert every answer was written cold; the
    // phrase may survive only as a quoted retraction in the explainer.
    expect(howItWorks.system.diagram.communityBoxes[0].line1).not.toContain(
      "written before seeing any model",
    );
  });

  it("ships behind an enabled feature flag, like the research route", () => {
    expect(isEnabled("howItWorksRoute")).toBe(true);
  });

  it("wires the nav and footer to the dedicated /how-it-works page", () => {
    const nav = ui.nav.find((n) => n.label === "How it works");
    expect(nav?.href).toBe("/how-it-works/");
    const footerLinks = ui.footer.columns.flatMap((c) => c.links);
    expect(
      footerLinks.some((l) => l.href === "/how-it-works/"),
    ).toBe(true);
  });

  it("resolves an absolute method-metrics API URL for the client fetch", () => {
    expect(() => new URL(methodMetricsApi.url)).not.toThrow();
    expect(methodMetricsApi.url).toContain("/api/public/method-metrics");
  });

  it("keeps the prompt snapshots byte-identical to what was copied from the app", () => {
    // The sha256 values were computed from the app's serving modules at copy
    // time. If anyone edits the snapshot text in THIS repo, the hash breaks:
    // refresh the copy from the app instead of editing it here.
    for (const snap of [
      igalaSystemV2,
      igalaSystemV3,
      igalaSystemV4,
      igalaSystemV41,
      igalaTerminalContract,
    ]) {
      expect(sha256(snap.text)).toBe(snap.sha256);
    }
  });

  it("labels every prompt snapshot with real provenance", () => {
    expect(promptsCopiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const snaps: PromptSnapshot[] = [
      igalaSystemV2,
      igalaSystemV3,
      igalaSystemV4,
      igalaSystemV41,
      igalaTerminalContract,
    ];
    for (const snap of snaps) {
      expect(snap.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
      expect(snap.sourceCommitDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(snap.sourceFile).toMatch(/^web\/src\/lib\//);
      expect(snap.text.trim().length).toBeGreaterThan(0);
    }
    // v2 and v3 are genuinely different prompts; the terminal contract is the
    // one line under every question.
    expect(igalaSystemV2.text).not.toBe(igalaSystemV3.text);
    // v4 rewrote the method around meaning; v4.1 layers the mined rules on v4.
    expect(igalaSystemV4.text).not.toBe(igalaSystemV3.text);
    expect(igalaSystemV41.text).not.toBe(igalaSystemV4.text);
    expect(igalaSystemV41.text.length).toBeGreaterThan(igalaSystemV4.text.length);
    expect(igalaSystemV3.text).toContain("CLOSED-CLASS GRAMMAR");
    expect(igalaTerminalContract.text).toContain("Answer in Igala only");
  });

  it("covers every {token} in the content with a live value", () => {
    // Collect every {token} used anywhere in the content...
    const tokens = new Set<string>();
    const walk = (value: unknown): void => {
      if (typeof value === "string") {
        for (const m of value.matchAll(/\{(\w+)\}/g)) tokens.add(m[1]);
      } else if (Array.isArray(value)) {
        value.forEach(walk);
      } else if (value && typeof value === "object") {
        Object.values(value).forEach(walk);
      }
    };
    walk(howItWorks);
    // ...and check each against the one live-values map (plus the few tokens
    // filled locally: prompt provenance and the chart's model count).
    const known = new Set([
      ...Object.keys(liveValues(sampleMetrics())),
      "file",
      "commit",
      "commitDate",
      "copiedOn",
      "count",
      // The human-verdict chart fills its own tokens from the humanRounds
      // payload (HumanVerdicts.tsx: readingFor), not from liveValues.
      ...VERDICT_TOKENS,
    ]);
    const unknown = [...tokens].filter((t) => !known.has(t));
    expect(unknown).toEqual([]);
  });

  it("fills and strips templates predictably", () => {
    expect(fill("{a} of {b} prompts", { a: "15", b: "43" })).toBe(
      "15 of 43 prompts",
    );
    // unknown tokens stay visible instead of vanishing silently
    expect(fill("{missing} prompts", {})).toBe("{missing} prompts");
    expect(stripTokens("{goldAnswers} question-answer pairs")).toBe(
      "question-answer pairs",
    );
    expect(fmtChrf(null)).toBe("n/a");
    expect(fmtChrf(45.06)).toBe("45.1");
    expect(fmtSharePct(1, 4)).toBe("25.0%");
    expect(fmtSharePct(0, 0)).toBe("n/a");
  });

  it("accepts a well-formed live payload and rejects malformed ones", () => {
    const good = sampleMetrics();
    expect(parseMethodMetrics(good)).toEqual(good);
    // extra fields are tolerated (the app may grow its payload)
    expect(
      parseMethodMetrics({ ...good, futureField: 123 }),
    ).toEqual(good);
    // missing or mistyped sections mean "unavailable", never garbage rendered
    expect(parseMethodMetrics(null)).toBeNull();
    expect(parseMethodMetrics({})).toBeNull();
    const noCandidates = { ...good, candidates: undefined };
    expect(parseMethodMetrics(noCandidates)).toBeNull();
    const badCandidate = {
      ...good,
      candidates: [{ name: 42 }],
    };
    expect(parseMethodMetrics(badCandidate)).toBeNull();
    const badCorpus = {
      ...good,
      corpus: { ...good.corpus, goldAnswers: "many" },
    };
    expect(parseMethodMetrics(badCorpus)).toBeNull();
  });

  it("never hardcodes a benchmark score into the fallback copy", () => {
    // The fallback variants render when the live feed is down. They must not
    // carry anything that reads as a current count or score of the benchmark:
    // no standalone numerals except the scale anchors (0, 100, 85 in the
    // worked explanation of what the scale MEANS) and the published 5,000
    // headword size of a printed dictionary.
    const allowed = new Set(["0", "100", "85", "5,000"]);
    for (const block of [
      ...howItWorks.benchmark.explainer,
      ...howItWorks.testedNow.items,
      howItWorks.benchmark.intro,
      howItWorks.benchmark.table.note2,
    ]) {
      const fallback = "fallback" in block ? block.fallback : "";
      // version names (v1, v4.1) are not counts: strip them before scanning
      const scanned = fallback.replace(/\bv\d+(?:\.\d+)?/g, "");
      for (const m of scanned.matchAll(/(?<![A-Za-z\d])\d[\d,]*/g)) {
        expect(
          allowed.has(m[0]),
          `unexpected number "${m[0]}" in fallback copy: ${fallback.slice(0, 60)}...`,
        ).toBe(true);
      }
    }
  });
});

// ─── The human verdict chart (added 2026-09-23) ──────────────────────────────
import { tenSlots } from "@/components/how-it-works/format";
import { parseHumanRounds } from "@/components/how-it-works/useMethodMetrics";
import { pickPair, readingFor } from "@/components/how-it-works/HumanVerdicts";
import type { HumanRoundsPair } from "@/content/types";

function roundFixture(
  key: string,
  label: string,
  c: { a: number; b: number; tie: number; neither: number },
) {
  const n = c.a + c.b + c.tie + c.neither;
  const per = (x: number) => (n === 0 ? 0 : Math.round((100 * x) / n) / 10);
  return {
    key,
    label,
    from: "2026-08-20T00:00:00.000Z",
    to: null,
    n,
    aWins: c.a,
    bWins: c.b,
    ties: c.tie,
    bothInadequate: c.neither,
    perTen: { a: per(c.a), b: per(c.b), tie: per(c.tie), neither: per(c.neither) },
  };
}

function pairFixture(): HumanRoundsPair {
  // Plain sorts first by name, so the plain arm is "a" and ours is "b".
  const r1 = roundFixture("round-1", "Aug 20 to Sep 12", { a: 22, b: 82, tie: 25, neither: 119 });
  const r2 = roundFixture("round-2", "Since Sep 13", { a: 66, b: 96, tie: 77, neither: 33 });
  return {
    a: { name: "Gemini 3.1 Pro", approach: "untouched" },
    b: { name: "Gemini 3.1 Pro + Igala RAG v3", approach: "retrieval v3" },
    rounds: [r1, r2],
    all: roundFixture("all", "All rounds", { a: 88, b: 178, tie: 102, neither: 152 }),
  };
}

describe("the human verdict chart", () => {
  it("has the content shapes the component expects", () => {
    expect(howItWorks.verdicts.legend).toEqual(
      expect.objectContaining({ ours: expect.any(String), plain: expect.any(String), tie: expect.any(String), neither: expect.any(String) }),
    );
    expect(howItWorks.verdicts.reading.twoRounds).toContain("{latestNeitherPerTen}");
    expect(howItWorks.verdicts.reading.oneRound).not.toContain("{firstLabel}");
    for (const s of [howItWorks.verdicts.intro, howItWorks.verdicts.unjudgedNote]) {
      expect(s).not.toContain("—");
    }
  });

  it("tenSlots always sums to 10 for a non-empty round and to 0 for an empty one", () => {
    expect(tenSlots([96, 66, 77, 33]).reduce((s, x) => s + x, 0)).toBe(10);
    expect(tenSlots([96, 66, 77, 33])).toEqual([4, 2, 3, 1]);
    expect(tenSlots([82, 22, 25, 119])).toEqual([3, 1, 1, 5]);
    expect(tenSlots([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
    expect(tenSlots([1, 0, 0, 0])).toEqual([10, 0, 0, 0]);
    // Largest remainder, deterministic on ties.
    expect(tenSlots([1, 1, 1])).toEqual([4, 3, 3]);
  });

  it("parses the rounds tolerantly: absent means [], malformed pairs are dropped", () => {
    expect(parseHumanRounds(undefined)).toEqual([]);
    expect(parseHumanRounds("nope")).toEqual([]);
    const good = pairFixture();
    const bad = { ...good, all: { ...good.all, perTen: { a: "x" } } };
    const parsed = parseHumanRounds([bad, good]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].b.name).toBe("Gemini 3.1 Pro + Igala RAG v3");
    // And the strict parser accepts a payload WITHOUT the field (older app).
    const m = parseMethodMetrics(sampleMetrics());
    expect(m).not.toBeNull();
    expect(m!.humanRounds).toEqual([]);
  });

  it("draws the plain-vs-package pair and reads it in plain words", () => {
    const picked = pickPair([pairFixture()]);
    expect(picked).not.toBeNull();
    expect(picked!.oursIsA).toBe(false);
    const reading = readingFor(picked!.pair, picked!.oursIsA)!;
    expect(reading.latest.key).toBe("round-2");
    expect(reading.text).toContain("1.2 times in ten");
    expect(reading.text).toContain("against 4.8");
    // The rounds are different question batches, never a version-to-version
    // comparison, and the lead is thin: the copy says both.
    expect(reading.text).toContain("read each row on its own");
    expect(reading.text).toContain("preferred ours 96 times and the plain model 66 times, out of 162: ahead, not far ahead");
    expect(reading.text).not.toContain("{");
  });

  it("never draws a pair of two plain models or two packages", () => {
    const p = pairFixture();
    const twoPlain = { ...p, b: { ...p.b, approach: "untouched" } };
    expect(pickPair([twoPlain])).toBeNull();
  });
});
