"use client";

import { useMethodMetrics } from "./useMethodMetrics";
import { fill } from "./format";
import { liveValues } from "./liveValues";

// A sentence with live numbers woven in: renders the `fallback` variant
// (readable, number-free) until the method-metrics fetch resolves, then the
// `live` template with real values. Never a recorded number.

export function LiveFilledText({
  live,
  fallback,
}: {
  live: string;
  fallback: string;
}) {
  const state = useMethodMetrics();
  if (state.status !== "ready") return <>{fallback}</>;
  return <>{fill(live, liveValues(state.data))}</>;
}
