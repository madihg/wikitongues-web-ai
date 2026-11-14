import type { PublicMethodMetrics } from "@/content/types";
import { fmtChrf, fmtInt, fmtSharePct } from "./format";
import { fmtDay, layerVsPlain } from "./layerVsPlain";

// The ONE mapping from live method metrics to the {tokens} used by the
// How-it-works content templates. Every template token in
// content/en/record.ts must have a key here - the content test walks all
// templates and fails on any token this map does not cover, so a template
// typo cannot ship a literal "{goldAnswers}" to readers.

export function liveValues(m: PublicMethodMetrics): Record<string, string> {
  const layer = layerVsPlain(m.humanRounds);
  return {
    // the plain model against the current language layer (main page)
    layerVsPlainTotal: fmtInt(layer.total),
    layerWins: fmtInt(layer.layerWins),
    plainWins: fmtInt(layer.plainWins),
    layerDraws: fmtInt(layer.draws),
    layerNeither: fmtInt(layer.neither),
    layerSince: fmtDay(layer.since),
    // corpus counts
    annotators: fmtInt(m.corpus.annotators),
    goldAnswers: fmtInt(m.corpus.goldAnswers),
    lexEntries: fmtInt(m.corpus.lexEntries),
    parallelPairs: fmtInt(m.corpus.parallelPairs),
    pairwiseComparisons: fmtInt(m.corpus.pairwiseComparisons),
    // frozen benchmark
    frozenPrompts: fmtInt(m.benchmark.frozenPrompts),
    leakedPrompts: fmtInt(m.benchmark.leakedPrompts),
    leakFreePrompts: fmtInt(m.benchmark.leakFreePrompts),
    // strong-pair (pool) preference judgments
    poolComparisons: fmtInt(m.poolPreference.poolComparisons),
    poolBothInadequatePct: fmtSharePct(
      m.poolPreference.poolBothInadequate,
      m.poolPreference.poolComparisons,
    ),
    // rates
    noPreferencePct: fmtSharePct(
      m.corpus.pairwiseBothInadequate,
      m.corpus.pairwiseComparisons,
    ),
    // ceilings
    ceilingChrf: fmtChrf(m.agreementCeilingChrf),
    honestCeilingChrfAll: fmtChrf(m.ceilings.onePerAnnotator.chrfAll),
    shippedCeilingChrfAll: fmtChrf(m.ceilings.asShipped.chrfAll),
  };
}
