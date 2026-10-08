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
// Which pairs are drawn: every judged pair of one plain model against one
// retrieval package (busiest first), then every judged pair of two package
// versions head to head, newer version first. Since 2026-09-28 the blind
// test holds v3 and v4.4 against the plain model and against each other, so
// a new version appears here as soon as speakers judge it; the chart follows
// the data rather than a name written here.

const v = howItWorks.verdicts;
const liveStrings = howItWorks.live;

const DOT = 14;
const GAP = 6;
// Label and caption stack above the dots: round labels name the question
// batch and run long, and a side column clipped them.
const ROW_H = 78;
const CHART_W = 360;
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

/** One panel of the chart. `firstIsA` says which arm gets the accent dots:
 * our package against the plain model, or the newer version against the
 * older one. */
export type DrawnPair =
  | { kind: "plain"; pair: HumanRoundsPair; firstIsA: boolean }
  | { kind: "versions"; pair: HumanRoundsPair; firstIsA: boolean };

/** The version number in a public approach label ("retrieval v4.4" -> 4.4),
 * or null for anything that is not a numbered retrieval version. */
export function versionOf(approach: string): number | null {
  const m = /^retrieval v(\d+(?:\.\d+)?)$/.exec(approach);
  return m ? Number(m[1]) : null;
}

/** Every judged pair the chart can read: plain-vs-package first, then
 * version-vs-version, each group in payload order (busiest first). Pairs
 * with no judged round, two plain models, controls and unnumbered arms are
 * skipped. */
export function pickPairs(pairs: HumanRoundsPair[]): DrawnPair[] {
  const plain: DrawnPair[] = [];
  const versions: DrawnPair[] = [];
  for (const p of pairs) {
    if (!p.rounds.some((r) => r.n > 0)) continue;
    const aPlain = p.a.approach === "untouched";
    const bPlain = p.b.approach === "untouched";
    if (aPlain !== bPlain) {
      plain.push({ kind: "plain", pair: p, firstIsA: !aPlain });
      continue;
    }
    if (aPlain) continue;
    const va = versionOf(p.a.approach);
    const vb = versionOf(p.b.approach);
    if (va === null || vb === null || va === vb) continue;
    versions.push({ kind: "versions", pair: p, firstIsA: va > vb });
  }
  return [...plain, ...versions];
}

/** The busiest plain-vs-package pair, or null. Kept for the tests and any
 * single-pair caller. */
export function pickPair(pairs: HumanRoundsPair[]): {
  pair: HumanRoundsPair;
  oursIsA: boolean;
} | null {
  const first = pickPairs(pairs).find((d) => d.kind === "plain");
  return first ? { pair: first.pair, oursIsA: first.firstIsA } : null;
}

/** "ahead, not far ahead" and its siblings, from the share of decided
 * judgments the accent arm won. Computed, never typed: the copy must stay
 * true as the counts move. Exported for tests. */
export function marginPhrase(first: number, second: number): string {
  const decided = first + second;
  if (decided === 0) return v.margin.level;
  const share = first / decided;
  if (share >= 0.7) return v.margin.clearlyAhead;
  if (share >= 0.55) return v.margin.ahead;
  if (share > 0.45) return v.margin.level;
  if (share > 0.3) return v.margin.behind;
  return v.margin.clearlyBehind;
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
  const width = CHART_W;
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
              y={y + 14}
              fontSize="13"
              fontWeight="600"
              fill="var(--color-text-primary)"
            >
              {r.label}
            </text>
            <text
              x={LEFT_PAD}
              y={y + 30}
              fontSize="11"
              fill="var(--color-text-muted)"
            >
              {fill(v.roundCaption, { n: fmtInt(r.n) })}
            </text>
            {slots.map((s, j) => (
              <circle
                key={j}
                cx={LEFT_PAD + j * (DOT + GAP) + DOT / 2}
                cy={y + 44 + DOT / 2}
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

function Legend({ first, second }: { first: string; second: string }) {
  const items: Array<[Slot, string]> = [
    ["ours", first],
    ["plain", second],
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
    latestLabel: latest.label,
    latestNeitherPerTen: latest.perTen.neither.toFixed(1),
    firstLabel: first.label,
    firstNeitherPerTen: first.perTen.neither.toFixed(1),
    latestOursOfDecided: fmtInt(ours),
    latestPlainOfDecided: fmtInt(plain),
    latestDecided: fmtInt(decided),
    margin: marginPhrase(ours, plain),
  };
  const template =
    judged.length > 1 ? v.reading.twoRounds : v.reading.oneRound;
  return { latest, first, text: fill(template, values) };
}

/** The short name of a version for the legend and the reading ("v4.4"). */
function shortVersion(approach: string): string {
  const n = versionOf(approach);
  return n === null ? approach : `v${n}`;
}

/** The reading for a version-vs-version panel, from its latest judged round.
 * Exported for tests. */
export function readingForVersions(
  pair: HumanRoundsPair,
  newerIsA: boolean,
): { latest: HumanRoundCounts; text: string } | null {
  const judged = pair.rounds.filter((r) => r.n > 0);
  if (judged.length === 0) return null;
  const latest = judged[judged.length - 1];
  const newer = newerIsA ? pair.a : pair.b;
  const older = newerIsA ? pair.b : pair.a;
  const newerWins = newerIsA ? latest.aWins : latest.bWins;
  const olderWins = newerIsA ? latest.bWins : latest.aWins;
  const text = fill(v.reading.versions, {
    newer: shortVersion(newer.approach),
    older: shortVersion(older.approach),
    newerWins: fmtInt(newerWins),
    olderWins: fmtInt(olderWins),
    decided: fmtInt(newerWins + olderWins),
    neitherPerTen: latest.perTen.neither.toFixed(1),
    margin: marginPhrase(newerWins, olderWins),
  });
  return { latest, text };
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
  const drawn = pickPairs(pairs);
  if (drawn.length === 0) {
    return <p className="mt-6 text-sm text-muted">{v.noPairYet}</p>;
  }
  return (
    <div className="mt-6 space-y-6">
      {drawn.map((d) => (
        <PairPanel key={`${d.pair.a.name}|${d.pair.b.name}`} drawn={d} />
      ))}
      <p className="text-xs text-muted">
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

function PairPanel({ drawn }: { drawn: DrawnPair }) {
  const { pair, firstIsA } = drawn;
  const first = firstIsA ? pair.a : pair.b;
  const second = firstIsA ? pair.b : pair.a;
  const isPlain = drawn.kind === "plain";
  const caption = isPlain
    ? fill(v.pairCaption, { ours: first.name, plain: second.name })
    : fill(v.versionPairCaption, { newer: first.name, older: second.name });
  const legend = isPlain
    ? { first: v.legend.ours, second: v.legend.plain }
    : {
        first: fill(v.versionLegend.newer, {
          newer: shortVersion(first.approach),
        }),
        second: fill(v.versionLegend.older, {
          older: shortVersion(second.approach),
        }),
      };
  const reading = isPlain
    ? readingFor(pair, firstIsA)
    : readingForVersions(pair, firstIsA);
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <p className="text-sm text-muted">{caption}</p>
      <div className="mt-4 overflow-x-auto">
        <DotRows rounds={pair.rounds} oursIsA={firstIsA} />
      </div>
      <Legend first={legend.first} second={legend.second} />
      {reading && (
        <p className="mt-5 max-w-measure text-base leading-relaxed">
          {reading.text}
        </p>
      )}
    </div>
  );
}
