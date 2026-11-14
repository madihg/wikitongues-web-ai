"use client";

import { record } from "@/content/en/record";
import { useStats } from "./useStats";
import { fmtInt } from "./format";

// The questions speakers work through, counted by the area each one tests.
// Live from the public stats feed; when the feed is down the section says so
// and shows no counts.

const a = record.areas;

export function QuestionAreas() {
  const state = useStats();
  if (state.status !== "ready") {
    return (
      <p className="max-w-measure text-body text-ink-2" role="status">
        {a.intro.fallback}{" "}
        {state.status === "loading"
          ? record.live.loadingLabel
          : record.live.unavailableNote}
      </p>
    );
  }
  const { total, byCategory } = state.data.prompts;
  return (
    <>
      <p className="max-w-measure text-title text-ink-2">
        {a.intro.live.replace("{promptsTotal}", fmtInt(total))}
      </p>
      <table className="mt-6 w-full max-w-container border-collapse text-left text-body">
        <thead>
          <tr className="border-b border-line-control">
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              {a.areaHeader}
            </th>
            <th
              scope="col"
              className="py-3 text-right text-small font-semibold"
            >
              {a.countHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {byCategory.map((c) => (
            <tr key={c.key} className="border-b border-line">
              <td className="py-3 pr-4 text-ink">{c.label}</td>
              <td className="py-3 text-right tabular-nums text-ink">
                {fmtInt(c.count)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
