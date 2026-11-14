"use client";

import { home } from "@/content/en/home";
import { useMethodMetrics } from "@/components/record/useMethodMetrics";
import { fill, fmtInt, tenSlots } from "@/components/record/format";
import { liveValues } from "@/components/record/liveValues";
import { layerVsPlain } from "@/components/record/layerVsPlain";

// The headline result as ten marks a reader can count: out of every ten
// blind comparisons between the plain model and the language layer, how many
// went each way. One mark is the point and takes the accent; the others are
// neutral and differ by shape, so the row reads without colour. Every count
// is printed beside its mark.
//
// Three states, like every live figure on the site: loading, live, or
// unavailable. Never a recorded copy.

const r = home.results;

type Kind = "layer" | "plain" | "draw" | "neither";

function Mark({ kind, size = 24 }: { kind: Kind; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      {kind === "layer" && <circle cx={12} cy={12} r={10} fill="var(--wt-accent)" />}
      {kind === "plain" && (
        <circle cx={12} cy={12} r={10} fill="var(--wt-data-neutral)" />
      )}
      {kind === "draw" && (
        <>
          <circle
            cx={12}
            cy={12}
            r={9}
            fill="var(--wt-surface)"
            stroke="var(--wt-line-control)"
            strokeWidth={2}
          />
          <path
            d="M7 12h10"
            stroke="var(--wt-ink-3)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "neither" && (
        <>
          <circle
            cx={12}
            cy={12}
            r={9}
            fill="var(--wt-surface)"
            stroke="var(--wt-line-control)"
            strokeWidth={2}
          />
          <path
            d="M8.5 8.5l7 7M15.5 8.5l-7 7"
            stroke="var(--wt-ink-3)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

const ORDER: Kind[] = ["layer", "plain", "draw", "neither"];

export function ResultRow() {
  const state = useMethodMetrics();
  const layer =
    state.status === "ready" ? layerVsPlain(state.data.humanRounds) : null;
  const live = layer !== null && layer.total > 0;
  const counts = live
    ? [layer.layerWins, layer.plainWins, layer.draws, layer.neither]
    : [0, 0, 0, 0];
  const slots = tenSlots(counts);
  const marks: Kind[] = ORDER.flatMap((k, i) => Array<Kind>(slots[i]).fill(k));
  const values = state.status === "ready" ? liveValues(state.data) : {};

  return (
    <figure className="m-0 rounded-card border border-line bg-surface p-4 sm:p-6">
      <figcaption>
        <h3
          className="text-title font-semibold"
          style={{ fontFamily: "var(--wt-font-sans)" }}
        >
          {r.chartTitle}
        </h3>
        <p className="mt-1 text-small text-ink-2">
          {live ? fill(r.chartCaption.live, values) : r.chartCaption.fallback}
        </p>
      </figcaption>

      {live ? (
        <div
          className="mt-5 flex flex-wrap gap-1.5"
          role="img"
          aria-label={fill(r.reading.live, values)}
          data-testid="result-row"
        >
          {marks.map((k, i) => (
            <Mark key={i} kind={k} size={26} />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-body text-ink-2" role="status">
          {state.status === "loading"
            ? home.live.loading
            : home.live.unavailableNote}
        </p>
      )}

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {ORDER.map((k, i) => (
          <li key={k} className="flex items-start gap-2 text-small text-ink">
            <Mark kind={k} size={20} />
            <span>
              {live && (
                <span className="font-semibold tabular-nums">
                  {fmtInt(counts[i])}{" "}
                </span>
              )}
              {r.legend[k]}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
