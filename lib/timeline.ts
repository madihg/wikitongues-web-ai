import type { TimelineItem, TimelinePhase } from "@/content/types";

// Classify a timeline item as past or upcoming relative to `now`.
// An explicit phaseOverride always wins (keeps tests deterministic and lets
// content force a state). Default `now` is the build date.
export function classifyPhase(
  item: TimelineItem,
  now: Date = new Date(),
): TimelinePhase {
  if (item.phaseOverride) return item.phaseOverride;
  const itemDate = new Date(`${item.date}T00:00:00Z`);
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  return itemDate < today ? "past" : "upcoming";
}

export function sortByDate(items: TimelineItem[]): TimelineItem[] {
  return [...items].sort((a, b) => a.date.localeCompare(b.date));
}
