import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { howItWorks } from "@/content/en/howItWorks";
import {
  igalaSystemV2,
  igalaSystemV3,
  igalaTerminalContract,
  promptsCopiedOn,
  type PromptSnapshot,
} from "@/content/en/igalaPrompts";
import { ui } from "@/content/en/site";
import { methodMetricsApi } from "@/content/config";
import {
  fill,
  fmtChrf,
  fmtSharePct,
  stripTokens,
} from "@/components/how-it-works/format";
import { liveValues } from "@/components/how-it-works/liveValues";
import { parseMethodMetrics } from "@/components/how-it-works/useMethodMetrics";
import type { PublicMethodMetrics } from "@/content/types";

const sha256 = (s: string) =>
  createHash("sha256").update(s, "utf8").digest("hex");

function sampleMetrics(): PublicMethodMetrics {
  return {
    computedAt: "2026-08-28T00:00:00.000Z",
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
    expect(howItWorks.journey.stages).toHaveLength(4);
    expect(howItWorks.assembly.steps).toHaveLength(6);
    expect(
      howItWorks.assembly.steps.filter((s) => s.guarded),
    ).toHaveLength(3);
    expect(howItWorks.benchmark.explainer).toHaveLength(5);
    expect(howItWorks.testedNow.items).toHaveLength(3);
    expect(howItWorks.changelog.entries).toHaveLength(6);
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
    for (const snap of [igalaSystemV2, igalaSystemV3, igalaTerminalContract]) {
      expect(sha256(snap.text)).toBe(snap.sha256);
    }
  });

  it("labels every prompt snapshot with real provenance", () => {
    expect(promptsCopiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const snaps: PromptSnapshot[] = [
      igalaSystemV2,
      igalaSystemV3,
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
      // digits directly after a letter are version names (v1, v2), not counts
      for (const m of fallback.matchAll(/(?<![A-Za-z\d])\d[\d,]*/g)) {
        expect(
          allowed.has(m[0]),
          `unexpected number "${m[0]}" in fallback copy: ${fallback.slice(0, 60)}...`,
        ).toBe(true);
      }
    }
  });
});
