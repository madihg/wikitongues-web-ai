"use client";

import { home } from "@/content/en/home";
import { useMethodMetrics } from "@/components/record/useMethodMetrics";

// One line in the footer saying when the live figures were fetched. Shows
// nothing until they have been, so it can never carry a stale date.
export function FiguresStamp() {
  const state = useMethodMetrics();
  if (state.status !== "ready") return null;
  const d = new Date(state.data.computedAt);
  if (Number.isNaN(d.getTime())) return null;
  const when = d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  return (
    <p className="mt-1" data-testid="figures-stamp">
      {home.live.stamp.replace("{computedAt}", when)}
    </p>
  );
}
