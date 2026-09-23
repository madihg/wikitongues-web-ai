"use client";

import { howItWorks } from "@/content/en/howItWorks";
import { useMethodMetrics } from "./useMethodMetrics";
import { fill, fmtInt, tenSlots } from "./format";
import type { HumanRoundCounts, HumanRoundsPair } from "@/content/types";

// The human verdict, ten questions at a time. Native speakers judge two
// answers to the same question blind; this draws what they decided, per
// judged round, as ten dots a reader can count. Same three states as the
// agreement board - loading, live, unavailable - and never a recorded copy.
//
// Which pair is drawn: the busiest pair whose two arms are one plain model
// and one retrieval package on the same model. That is the comparison the
// project has run since the annotation pivot; if the pool changes, the
// chart follows the data rather than a name written here.

const v = howItWorks.verdicts;
const liveStrings = howItWorks.live;

const DOT = 14;
const GAP = 6;
const ROW_H = 64;
const LABEL_W = 150;
const LEFT_PAD = 8;
const TOP_PAD = 12;

type Slot = "ours" | "plain" | "tie" | "neither";

const FILL: Record<Slot, string> = {
  ours: "var(--color-accent)",
  plain: "var(--color-border-strong)",
  tie: "var(--color-surface-sunken)",
  neither: "var(--color-surface)",
};
const STROKE: Record<Slot, string> = {
  ours: "var(--color-accent)",
  plain: "var(--color-border-strong)",
  tie: "var(--color-border-strong)",
  neither: "var(--color-border-strong)",
};

/** The chart's pair: plain model vs a retrieval package on it. */
export function pickPair(pairs: HumanRoundsPair[]): {
  pair: HumanRoundsPair;
  oursIsA: boolean;
} | null {
  for (const p of pairs) {
    const aPlain = p.a.approach === "untouched";
    const bPlain = p.b.approach === "untouched";
    if (aPlain === bPlain) continue;
    return { pair: p, oursIsA: !aPlain };
  }
  return null;
}

function slotsFor(r: HumanRoundCounts, oursIsA: boolean): Slot[] {
  const ours = oursIsA ? r.aWins : r.bWins;
  const plain = oursIsA ? r.bWins : r.aWins;
  const [o, p, t, n] = tenSlots([ours, plain, r.ties, r.bothInadequate]);
  return [
    ...Array<Slot>(o).fill("ours"),
    ...Array<Slot>(p).fill("plain"),
    ...Array<Slot>(t).fill("tie"),
    ...Array<Slot>(n).fill("neither"),
  ];
}

function DotRows({
  rounds,
  oursIsA,
}: {
  rounds: HumanRoundCounts[];
  oursIsA: boolean;
}) {
  const drawn = rounds.filter((r) => r.n > 0);
  const width = LEFT_PAD + LABEL_W + 10 * (DOT + GAP) + 8;
  const height = TOP_PAD + drawn.length * ROW_H;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      style={{ maxWidth: width }}
      role="img"
      aria-label={drawn
        .map((r) => {
          const ours = oursIsA ? r.aWins : r.bWins;
          const plain = oursIsA ? r.bWins : r.aWins;
          return `${r.label}: of ${r.n} judgments, ${ours} for ours, ${plain} for the plain model, ${r.ties} draws, ${r.bothInadequate} rejected both.`;
        })
        .join(" ")}
    >
      {drawn.map((r, i) => {
        const y = TOP_PAD + i * ROW_H;
        const slots = slotsFor(r, oursIsA);
        return (
          <g key={r.key}>
            <text
              x={LEFT_PAD}
              y={y + DOT + 2}
              fontSize="13"
              fontWeight="600"
              fill="var(--color-text-primary)"
            >
              {r.label}
            </text>
            <text
              x={LEFT_PAD}
              y={y + DOT + 20}
              fontSize="11"
              fill="var(--color-text-muted)"
            >
              {fill(v.roundCaption, { n: fmtInt(r.n) })}
            </text>
            {slots.map((s, j) => (
              <circle
                key={j}
                cx={LEFT_PAD + LABEL_W + j * (DOT + GAP) + DOT / 2}
                cy={y + DOT / 2 + 6}
                r={DOT / 2}
                fill={FILL[s]}
                stroke={STROKE[s]}
                strokeWidth={s === "neither" ? 1.5 : 1}
                strokeDasharray={s === "neither" ? "2 2" : undefined}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function Legend() {
  const items: Array<[Slot, string]> = [
    ["ours", v.legend.ours],
    ["plain", v.legend.plain],
    ["tie", v.legend.tie],
    ["neither", v.legend.neither],
  ];
  return (
    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
      {items.map(([s, label]) => (
        <li key={s} className="flex items-center gap-2">
          <svg width={DOT} height={DOT} aria-hidden="true">
            <circle
              cx={DOT / 2}
              cy={DOT / 2}
              r={DOT / 2 - 1}
              fill={FILL[s]}
              stroke={STROKE[s]}
              strokeWidth={s === "neither" ? 1.5 : 1}
              strokeDasharray={s === "neither" ? "2 2" : undefined}
            />
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}

/** The plain-words reading under the dots, computed from the same counts
 * the dots were drawn from. Exported for tests. */
export function readingFor(
  pair: HumanRoundsPair,
  oursIsA: boolean,
): { latest: HumanRoundCounts; first: HumanRoundCounts; text: string } | null {
  const judged = pair.rounds.filter((r) => r.n > 0);
  if (judged.length === 0) return null;
  const first = judged[0];
  const latest = judged[judged.length - 1];
  const ours = oursIsA ? latest.aWins : latest.bWins;
  const plain = oursIsA ? latest.bWins : latest.aWins;
  const decided = ours + plain;
  const values = {
    latestLabel: latest.label.toLowerCase(),
    latestNeitherPerTen: latest.perTen.neither.toFixed(1),
    firstLabel: first.label.toLowerCase(),
    firstNeitherPerTen: first.perTen.neither.toFixed(1),
    latestOursOfDecided: fmtInt(ours),
    latestPlainOfDecided: fmtInt(plain),
    latestDecided: fmtInt(decided),
  };
  const template =
    judged.length > 1 ? v.reading.twoRounds : v.reading.oneRound;
  return { latest, first, text: fill(template, values) };
}

export function HumanVerdicts() {
  const state = useMethodMetrics();

  return (
    <div>
      <p className="max-w-measure text-lg leading-relaxed text-muted">
        {v.intro}
      </p>

      {state.status === "loading" && (
        <p className="mt-6 text-sm text-muted">{liveStrings.loadingLabel}…</p>
      )}
      {state.status === "unavailable" && (
        <p className="mt-6 text-sm text-muted">{liveStrings.unavailableNote}</p>
      )}
      {state.status === "ready" && (
        <VerdictsLive
          pairs={state.data.humanRounds}
          computedAt={state.data.computedAt}
        />
      )}

      <p className="mt-8 max-w-measure text-sm leading-relaxed text-muted">
        {v.unjudgedNote}
      </p>
    </div>
  );
}

function VerdictsLive({
  pairs,
  computedAt,
}: {
  pairs: HumanRoundsPair[];
  computedAt: string;
}) {
  const picked = pickPair(pairs);
  if (!picked) {
    return <p className="mt-6 text-sm text-muted">{v.noPairYet}</p>;
  }
  const { pair, oursIsA } = picked;
  const ours = oursIsA ? pair.a : pair.b;
  const plain = oursIsA ? pair.b : pair.a;
  const reading = readingFor(pair, oursIsA);
  return (
    <div className="mt-6 rounded-lg border border-line bg-surface p-6">
      <p className="text-sm text-muted">
        {fill(v.pairCaption, { ours: ours.name, plain: plain.name })}
      </p>
      <div className="mt-4 overflow-x-auto">
        <DotRows rounds={pair.rounds} oursIsA={oursIsA} />
      </div>
      <Legend />
      {reading && (
        <p className="mt-5 max-w-measure text-base leading-relaxed">
          {reading.text}
        </p>
      )}
      <p className="mt-4 text-xs text-muted">
        {liveStrings.computedPrefix}{" "}
        {new Date(computedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
        .
      </p>
    </div>
  );
}
