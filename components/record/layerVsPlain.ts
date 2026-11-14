import type { HumanRoundsPair } from "@/content/types";

// The headline figure on the main page: every blind comparison between the
// plain model and the current language layer.
//
// The rule, written once: count every judged round of every pair that sets
// one plain model ("untouched") against a numbered version of the language
// layer from 4.4 on. Version 4.4 is where the layer in service today begins
// (it joined the blind test on Oct 8, 2026, and 4.5 two days later). Older
// versions, pairs of two versions, and pairs of two plain models are left
// out. The figure follows the feed: a version 4.6 joins it without a change
// here. Revisit FIRST_CURRENT_VERSION only if the layer is rebuilt.

export const FIRST_CURRENT_VERSION = 4.4;

export interface LayerVsPlain {
  total: number;
  layerWins: number;
  plainWins: number;
  draws: number;
  neither: number;
  /** ISO time of the earliest counted round, or null when nothing counts. */
  since: string | null;
}

function versionOf(approach: string): number | null {
  const m = /^retrieval v(\d+(?:\.\d+)?)$/.exec(approach);
  return m ? Number(m[1]) : null;
}

export function layerVsPlain(pairs: HumanRoundsPair[]): LayerVsPlain {
  const out: LayerVsPlain = {
    total: 0,
    layerWins: 0,
    plainWins: 0,
    draws: 0,
    neither: 0,
    since: null,
  };
  for (const p of pairs) {
    const aPlain = p.a.approach === "untouched";
    const bPlain = p.b.approach === "untouched";
    if (aPlain === bPlain) continue;
    const layerVersion = versionOf(aPlain ? p.b.approach : p.a.approach);
    if (layerVersion === null || layerVersion < FIRST_CURRENT_VERSION) continue;
    for (const r of p.rounds) {
      if (r.n <= 0) continue;
      out.total += r.n;
      out.layerWins += aPlain ? r.bWins : r.aWins;
      out.plainWins += aPlain ? r.aWins : r.bWins;
      out.draws += r.ties;
      out.neither += r.bothInadequate;
      if (out.since === null || r.from < out.since) out.since = r.from;
    }
  }
  return out;
}

/** "October 8, 2026" from an ISO time, read in UTC so every reader sees the
 * same day. Empty string when there is no date. */
export function fmtDay(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
