"use client";

import { howItWorks } from "@/content/en/howItWorks";
import { useMethodMetrics } from "./useMethodMetrics";
import { fmtInt } from "./format";
import type { PublicMethodMetrics } from "@/content/types";

// The six-tile live stat strip under the hero. Values exist in exactly three
// states: "loading" placeholders, live numbers, or an explicit "live numbers
// unavailable" note - NEVER a recorded snapshot, because several of these
// counts sit right next to benchmark claims and a stale count presented as
// current is the failure mode this page exists to avoid.

const c = howItWorks.live;

function valueFor(key: string, m: PublicMethodMetrics): string {
  switch (key) {
    case "goldAnswers":
      return fmtInt(m.corpus.goldAnswers);
    case "pairwiseComparisons":
      return fmtInt(m.corpus.pairwiseComparisons);
    case "parallelPairs":
      return fmtInt(m.corpus.parallelPairs);
    case "lexEntries":
      return fmtInt(m.corpus.lexEntries);
    case "annotators":
      return fmtInt(m.corpus.annotators);
    case "frozenPrompts":
      return fmtInt(m.benchmark.frozenPrompts);
    default:
      return c.loadingLabel;
  }
}

export function MethodStats() {
  const state = useMethodMetrics();

  if (state.status === "unavailable") {
    return (
      <div className="rounded-lg border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
        {c.unavailableNote}
      </div>
    );
  }

  const live = state.status === "ready" ? state.data : null;

  return (
    <div>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {c.stats.map((s) => (
          <div
            key={s.key}
            className={`rounded-lg border border-line bg-surface p-5 ${
              live ? "" : "animate-pulse"
            }`}
          >
            <dt className="font-serif text-3xl font-semibold text-accent">
              {live ? valueFor(s.key, live) : c.loadingLabel}
            </dt>
            <dd className="mt-2 text-sm leading-snug text-muted">{s.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-muted">
        {c.statsFootnote}{" "}
        {live
          ? `${c.computedPrefix} ${new Date(live.computedAt).toUTCString()}.`
          : `${c.computedPrefix} ${c.loadingLabel}.`}
      </p>
    </div>
  );
}
