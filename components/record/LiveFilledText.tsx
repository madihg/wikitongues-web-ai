"use client";

import { useMethodMetrics } from "./useMethodMetrics";
import { fill } from "./format";
import { liveValues } from "./liveValues";
import { layerVsPlain } from "./layerVsPlain";

// A sentence with live numbers woven in: renders the `fallback` variant
// (readable, number-free) until the method-metrics fetch resolves, then the
// `live` template with real values. Never a recorded number.

//
// A template that uses the {layer...} tokens also needs at least one counted
// comparison: with none, "0 pairs of answers" would be a figure nobody
// measured, so the fallback stays.

export function LiveFilledText({
  live,
  fallback,
}: {
  live: string;
  fallback: string;
}) {
  const state = useMethodMetrics();
  if (state.status !== "ready") return <>{fallback}</>;
  if (/\{layer/.test(live) && layerVsPlain(state.data.humanRounds).total === 0)
    return <>{fallback}</>;
  return <>{fill(live, liveValues(state.data))}</>;
}
