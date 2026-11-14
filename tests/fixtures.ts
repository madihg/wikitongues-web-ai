import type { HumanRoundCounts, PublicMethodMetrics } from "@/content/types";

// Invented figures for tests. None of them is a real result.

export function round(
  key: string,
  from: string,
  n: number,
  aWins: number,
  bWins: number,
  ties: number,
  bothInadequate: number,
): HumanRoundCounts {
  return {
    key,
    label: key,
    from,
    to: null,
    n,
    aWins,
    bWins,
    ties,
    bothInadequate,
    perTen: { a: 0, b: 0, tie: 0, neither: 0 },
  };
}

const empty = round("all", "2026-01-01T00:00:00.000Z", 0, 0, 0, 0, 0);

export function sampleMetrics(): PublicMethodMetrics {
  return {
    computedAt: "2026-11-13T12:00:00.000Z",
    humanRounds: [
      // plain against version 3: older than the current layer, not counted
      {
        a: { name: "Plain", approach: "untouched" },
        b: { name: "Layer v3", approach: "retrieval v3" },
        rounds: [round("r1", "2026-08-20T00:00:00.000Z", 50, 10, 20, 10, 10)],
        all: empty,
      },
      // plain against version 4.4: counted, the layer is side b
      {
        a: { name: "Plain", approach: "untouched" },
        b: { name: "Layer v4.4", approach: "retrieval v4.4" },
        rounds: [
          round("r3", "2026-10-08T12:00:00.000Z", 2, 0, 2, 0, 0),
          round("r4", "2026-10-09T16:00:00.000Z", 20, 2, 12, 3, 3),
        ],
        all: empty,
      },
      // version 4.5 against plain: counted, the layer is side a
      {
        a: { name: "Layer v4.5", approach: "retrieval v4.5" },
        b: { name: "Plain", approach: "untouched" },
        rounds: [round("r4", "2026-10-09T16:00:00.000Z", 10, 6, 1, 2, 1)],
        all: empty,
      },
      // two versions head to head: not counted
      {
        a: { name: "Layer v4.4", approach: "retrieval v4.4" },
        b: { name: "Layer v4.5", approach: "retrieval v4.5" },
        rounds: [round("r4", "2026-10-09T16:00:00.000Z", 9, 2, 4, 2, 1)],
        all: empty,
      },
    ],
    corpus: {
      goldAnswers: 1234,
      pairwiseComparisons: 2345,
      pairwiseBothInadequate: 500,
      parallelPairs: 30907,
      lexEntries: 2104,
      annotators: 7,
    },
    benchmark: {
      frozenPrompts: 43,
      promptsWithGold: 43,
      leakedPrompts: 16,
      leakFreePrompts: 27,
    },
    ceilings: {
      asShipped: { chrfAll: 63.2, chrfClean: 60.1, nPromptsAll: 40, nPromptsClean: 28 },
      onePerAnnotator: { chrfAll: 46.0, chrfClean: 45.1, nPromptsAll: 38, nPromptsClean: 27 },
    },
    agreementCeilingChrf: 45.1,
    poolPreference: {
      poolComparisons: 40,
      poolBothInadequate: 10,
      poolDecided: 20,
      poolBothInadequateRate: 0.25,
    },
    candidates: [
      {
        name: "some-model",
        approach: "retrieval v2",
        n: 43,
        nClean: 27,
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
