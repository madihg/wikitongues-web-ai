"use client";

import { useEffect, useState } from "react";
import { methodMetricsApi } from "@/content/config";
import type {
  MethodCandidate,
  MethodCeiling,
  PublicMethodMetrics,
} from "@/content/types";

// Shared, deduplicated fetch of the public method-metrics endpoint - the same
// module-cache pattern as components/research/useStats.ts, so the several
// live sections of the How-it-works page resolve from ONE network request.
//
// Unlike the Research page's stats, this page has NO recorded fallback values:
// the endpoint serves benchmark scores, and a stale score presented as current
// would be a lie the project has been burned by before. So the payload is
// VALIDATED field by field; anything missing or mistyped puts the page into
// its explicit "live numbers unavailable" state instead of rendering garbage
// (or last month's scoreboard) as today's truth.

let cache: PublicMethodMetrics | null = null;
let inFlight: Promise<PublicMethodMetrics> | null = null;

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function num(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}
function numOrNull(x: unknown): x is number | null {
  return x === null || num(x);
}

function parseCeiling(x: unknown): MethodCeiling | null {
  if (!isRecord(x)) return null;
  if (
    !numOrNull(x.chrfAll) ||
    !numOrNull(x.chrfClean) ||
    !num(x.nPromptsAll) ||
    !num(x.nPromptsClean)
  ) {
    return null;
  }
  return {
    chrfAll: x.chrfAll,
    chrfClean: x.chrfClean,
    nPromptsAll: x.nPromptsAll,
    nPromptsClean: x.nPromptsClean,
  };
}

function parseCandidate(x: unknown): MethodCandidate | null {
  if (!isRecord(x)) return null;
  if (
    typeof x.name !== "string" ||
    typeof x.approach !== "string" ||
    !num(x.n) ||
    !num(x.nClean) ||
    !numOrNull(x.strippedChrfAll) ||
    !numOrNull(x.strippedChrfClean) ||
    !numOrNull(x.agreementScore) ||
    !numOrNull(x.agreementCiLow) ||
    !numOrNull(x.agreementCiHigh) ||
    typeof x.agreementUnderpowered !== "boolean"
  ) {
    return null;
  }
  return {
    name: x.name,
    approach: x.approach,
    n: x.n,
    nClean: x.nClean,
    strippedChrfAll: x.strippedChrfAll,
    strippedChrfClean: x.strippedChrfClean,
    agreementScore: x.agreementScore,
    agreementCiLow: x.agreementCiLow,
    agreementCiHigh: x.agreementCiHigh,
    agreementUnderpowered: x.agreementUnderpowered,
  };
}

/** Strict parse of the endpoint payload. Exported for tests. */
export function parseMethodMetrics(
  data: unknown,
): PublicMethodMetrics | null {
  if (!isRecord(data)) return null;
  const { corpus, benchmark, ceilings, poolPreference, candidates } = data;
  if (
    typeof data.computedAt !== "string" ||
    !isRecord(corpus) ||
    !isRecord(benchmark) ||
    !isRecord(ceilings) ||
    !isRecord(poolPreference) ||
    !Array.isArray(candidates) ||
    !numOrNull(data.agreementCeilingChrf)
  ) {
    return null;
  }
  if (
    !num(corpus.goldAnswers) ||
    !num(corpus.pairwiseComparisons) ||
    !num(corpus.pairwiseBothInadequate) ||
    !num(corpus.parallelPairs) ||
    !num(corpus.lexEntries) ||
    !num(corpus.annotators) ||
    !num(benchmark.frozenPrompts) ||
    !num(benchmark.promptsWithGold) ||
    !num(benchmark.leakedPrompts) ||
    !num(benchmark.leakFreePrompts) ||
    !num(poolPreference.poolComparisons) ||
    !num(poolPreference.poolBothInadequate) ||
    !num(poolPreference.poolDecided) ||
    !num(poolPreference.poolBothInadequateRate)
  ) {
    return null;
  }
  const asShipped = parseCeiling(ceilings.asShipped);
  const onePerAnnotator = parseCeiling(ceilings.onePerAnnotator);
  if (!asShipped || !onePerAnnotator) return null;
  const parsedCandidates: MethodCandidate[] = [];
  for (const c of candidates) {
    const parsed = parseCandidate(c);
    if (!parsed) return null;
    parsedCandidates.push(parsed);
  }
  return {
    computedAt: data.computedAt,
    corpus: {
      goldAnswers: corpus.goldAnswers,
      pairwiseComparisons: corpus.pairwiseComparisons,
      pairwiseBothInadequate: corpus.pairwiseBothInadequate,
      parallelPairs: corpus.parallelPairs,
      lexEntries: corpus.lexEntries,
      annotators: corpus.annotators,
    },
    benchmark: {
      frozenPrompts: benchmark.frozenPrompts,
      promptsWithGold: benchmark.promptsWithGold,
      leakedPrompts: benchmark.leakedPrompts,
      leakFreePrompts: benchmark.leakFreePrompts,
    },
    ceilings: { asShipped, onePerAnnotator },
    agreementCeilingChrf: data.agreementCeilingChrf,
    poolPreference: {
      poolComparisons: poolPreference.poolComparisons,
      poolBothInadequate: poolPreference.poolBothInadequate,
      poolDecided: poolPreference.poolDecided,
      poolBothInadequateRate: poolPreference.poolBothInadequateRate,
    },
    candidates: parsedCandidates,
  };
}

function load(): Promise<PublicMethodMetrics> {
  if (cache) return Promise.resolve(cache);
  if (inFlight) return inFlight;
  inFlight = fetch(methodMetricsApi.url, {
    headers: { Accept: "application/json" },
    // aggregate public data; no cookies ever sent cross-origin
    credentials: "omit",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`method metrics failed (${res.status})`);
      return res.json() as Promise<unknown>;
    })
    .then((raw) => {
      const parsed = parseMethodMetrics(raw);
      if (!parsed) throw new Error("method metrics payload malformed");
      cache = parsed;
      inFlight = null;
      return parsed;
    })
    .catch((err) => {
      inFlight = null;
      throw err;
    });
  return inFlight;
}

export type MethodMetricsState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: PublicMethodMetrics }
  | { status: "unavailable"; data: null };

export function useMethodMetrics(): MethodMetricsState {
  const [state, setState] = useState<MethodMetricsState>(
    cache
      ? { status: "ready", data: cache }
      : { status: "loading", data: null },
  );

  useEffect(() => {
    let active = true;
    if (cache) {
      setState({ status: "ready", data: cache });
      return;
    }
    load()
      .then((data) => {
        if (active) setState({ status: "ready", data });
      })
      .catch(() => {
        if (active) setState({ status: "unavailable", data: null });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
