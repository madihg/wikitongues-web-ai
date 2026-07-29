"use client";

import { useStats } from "./useStats";
import { researchPage } from "@/content/en/researchPage";

// The single big figure in the "Why" section: the share of AI answers native
// speakers rejected. Reads the live stats endpoint; on a failed fetch it shows
// the most recent recorded snapshot value rather than a broken state.

const fb = researchPage.fallbackStats;

function pct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function HeadlineStat({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  const state = useStats();
  const rate =
    state.status === "ready"
      ? state.data.judgments.bothInadequateRate
      : fb.bothInadequateRate;
  const loading = state.status === "loading";

  return (
    <figure className="rounded-xl border border-accent bg-accent-subtle p-8 text-center">
      <div
        className={`font-serif text-6xl font-semibold leading-none text-accent md:text-7xl ${
          loading ? "animate-pulse opacity-60" : ""
        }`}
        aria-hidden={loading}
      >
        {loading ? "99%" : pct(rate)}
      </div>
      <figcaption className="mt-4">
        <p className="text-base font-semibold text-ink">{label}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{caption}</p>
      </figcaption>
    </figure>
  );
}
