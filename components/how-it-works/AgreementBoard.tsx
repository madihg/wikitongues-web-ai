"use client";

import { howItWorks } from "@/content/en/howItWorks";
import { useMethodMetrics } from "./useMethodMetrics";
import { fill, fmtChrf, fmtInt } from "./format";
import { liveValues } from "./liveValues";
import type { MethodCandidate, MethodCeiling } from "@/content/types";

// The Community Agreement Score board: benchmark-style bars, the plain-words
// explainer, and the raw chrF table. Scores are shown in exactly three
// states - loading, live, or "live numbers unavailable" - and NEVER from a
// recorded copy: a stale benchmark presented as current is the precise lie
// this project's method exists to prevent. The prose explainer always
// renders (it is the honest part of the story), with numbers woven in only
// once the live feed has answered.

const b = howItWorks.benchmark;
const liveStrings = howItWorks.live;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const LABEL_W = 220;
const CHART_W = 460;
const RIGHT_PAD = 64;
const ROW_H = 44;
const TOP_PAD = 34;
const BOTTOM_PAD = 24;
const BAR_H = 16;

function truncate(name: string, max = 28): string {
  return name.length > max ? `${name.slice(0, max - 1)}…` : name;
}

function BarChart({
  rows,
  scaleMax,
  bestName,
}: {
  rows: MethodCandidate[];
  scaleMax: number;
  bestName: string | null;
}) {
  const width = LABEL_W + CHART_W + RIGHT_PAD;
  const height = TOP_PAD + rows.length * ROW_H + BOTTOM_PAD;
  const x = (v: number) => LABEL_W + (v / scaleMax) * CHART_W;
  const gridTicks = [0, 25, 50, 75].filter((t) => t < scaleMax);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      style={{ minWidth: width }}
      role="img"
      aria-label={`Community Agreement Score by model: ${rows
        .map((r) => `${r.name} ${r.agreementScore?.toFixed(1)}`)
        .join(", ")}. 100 marks native speaker agreement.`}
    >
      {gridTicks.map((t) => (
        <g key={t}>
          <line
            x1={x(t)}
            y1={TOP_PAD - 6}
            x2={x(t)}
            y2={height - BOTTOM_PAD}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            x={x(t)}
            y={height - 8}
            fontSize="10"
            textAnchor="middle"
            fill="var(--color-text-muted)"
          >
            {t}
          </text>
        </g>
      ))}

      {/* the 100 reference line: native speaker agreement */}
      {scaleMax >= 100 && (
        <g>
          <line
            x1={x(100)}
            y1={TOP_PAD - 6}
            x2={x(100)}
            y2={height - BOTTOM_PAD}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x={x(100)}
            y={TOP_PAD - 14}
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fill="var(--color-accent)"
          >
            {b.chart.referenceLineLabel}
          </text>
          <text
            x={x(100)}
            y={height - 8}
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fill="var(--color-accent)"
          >
            100
          </text>
        </g>
      )}

      {rows.map((c, i) => {
        const y = TOP_PAD + i * ROW_H;
        const midY = y + ROW_H / 2;
        const barY = midY - BAR_H / 2;
        const score = c.agreementScore ?? 0;
        const isBest = c.name === bestName;
        const hasWhisker =
          !c.agreementUnderpowered &&
          c.agreementCiLow !== null &&
          c.agreementCiHigh !== null;
        const scoreX =
          x(hasWhisker ? Math.max(score, c.agreementCiHigh as number) : score) +
          8;
        const chip = c.approach;
        const chipW = chip.length * 5.4 + 14;
        return (
          <g key={c.name}>
            <text
              x={0}
              y={midY - 3}
              fontSize="12"
              fontWeight={isBest ? 700 : 400}
              fill="var(--color-text-primary)"
            >
              {truncate(c.name)}
            </text>
            <rect
              x={0}
              y={midY + 2}
              width={chipW}
              height={14}
              rx={7}
              fill={
                isBest
                  ? "var(--color-accent-subtle)"
                  : "var(--color-surface-sunken)"
              }
              stroke={
                isBest ? "var(--color-accent)" : "var(--color-border)"
              }
            />
            <text
              x={chipW / 2}
              y={midY + 12}
              fontSize="9"
              textAnchor="middle"
              fill={
                isBest ? "var(--color-accent)" : "var(--color-text-muted)"
              }
            >
              {chip}
            </text>
            <text
              x={chipW + 8}
              y={midY + 12}
              fontSize="9"
              fill="var(--color-text-muted)"
            >
              n={c.nClean}
            </text>

            <rect
              x={x(0)}
              y={barY}
              width={Math.max(x(score) - x(0), 1.5)}
              height={BAR_H}
              rx={3}
              fill={
                isBest ? "var(--color-accent)" : "var(--color-border-strong)"
              }
            />

            {hasWhisker && (
              <g stroke="var(--color-text-primary)" strokeWidth="1.25">
                <line
                  x1={x(c.agreementCiLow as number)}
                  y1={midY}
                  x2={x(c.agreementCiHigh as number)}
                  y2={midY}
                />
                <line
                  x1={x(c.agreementCiLow as number)}
                  y1={midY - 4}
                  x2={x(c.agreementCiLow as number)}
                  y2={midY + 4}
                />
                <line
                  x1={x(c.agreementCiHigh as number)}
                  y1={midY - 4}
                  x2={x(c.agreementCiHigh as number)}
                  y2={midY + 4}
                />
              </g>
            )}

            <text
              x={scoreX}
              y={midY + 4}
              fontSize="11"
              fontWeight={isBest ? 700 : 400}
              style={{ fontFamily: MONO }}
              fill="var(--color-text-primary)"
            >
              {score.toFixed(1)}
              {c.agreementUnderpowered ? "*" : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CeilingRow({
  label,
  note,
  ceiling,
}: {
  label: string;
  note: string;
  ceiling: MethodCeiling;
}) {
  return (
    <tr className="border-b border-line bg-accent-subtle">
      <td className="px-3 py-2">
        <div className="font-medium text-ink">{label}</div>
        <div className="text-xs text-muted">{note}</div>
      </td>
      <td className="px-3 py-2 text-muted">{b.table.ceilingApproach}</td>
      <td
        className="px-3 py-2 text-right text-muted"
        style={{ fontFamily: MONO }}
      >
        {ceiling.nPromptsAll}
      </td>
      <td
        className="px-3 py-2 text-right text-ink"
        style={{ fontFamily: MONO }}
      >
        {fmtChrf(ceiling.chrfAll)}
      </td>
      <td
        className="px-3 py-2 text-right text-ink"
        style={{ fontFamily: MONO }}
      >
        {fmtChrf(ceiling.chrfClean)}
      </td>
    </tr>
  );
}

export function AgreementBoard() {
  const state = useMethodMetrics();
  const live = state.status === "ready" ? state.data : null;

  const values = live ? liveValues(live) : null;

  const scoreable = live
    ? live.candidates.filter((c) => c.agreementScore !== null)
    : [];
  const drawable =
    live !== null && live.agreementCeilingChrf !== null && scoreable.length > 0;

  const maxVal = drawable
    ? Math.max(
        100,
        ...scoreable.map((c) =>
          Math.max(c.agreementScore ?? 0, c.agreementCiHigh ?? 0),
        ),
      )
    : 100;
  const scaleMax = Math.ceil((maxVal + 8) / 10) * 10;
  const bestName = drawable ? scoreable[0].name : null;
  const top = scoreable.slice(0, 8);
  const rest = scoreable.slice(8);
  const anyUnderpowered = scoreable.some((c) => c.agreementUnderpowered);

  return (
    <div>
      <p className="max-w-measure text-lg leading-relaxed text-muted">
        {values ? fill(b.intro.live, values) : b.intro.fallback}
      </p>

      {/* the chart, in one of its three honest states */}
      <div className="mt-8">
        {state.status === "loading" && (
          <div className="rounded-lg border border-line bg-surface p-5">
            <div className="animate-pulse space-y-3" aria-hidden="true">
              <div className="h-4 w-3/4 rounded bg-surface-sunken" />
              <div className="h-4 w-1/2 rounded bg-surface-sunken" />
              <div className="h-4 w-2/3 rounded bg-surface-sunken" />
            </div>
            <p className="mt-4 text-sm text-muted">{b.chart.loadingNote}</p>
          </div>
        )}
        {state.status === "unavailable" && (
          <div className="rounded-lg border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            {liveStrings.unavailableNote}
          </div>
        )}
        {live && !drawable && (
          <div className="rounded-lg border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            {b.chart.emptyNote}
          </div>
        )}
        {live && drawable && values && (
          <div className="rounded-lg border border-line bg-surface p-5">
            <div className="overflow-x-auto">
              <BarChart rows={top} scaleMax={scaleMax} bestName={bestName} />
            </div>
            {rest.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-accent">
                  {fill(b.chart.showAllLabel, {
                    count: fmtInt(scoreable.length),
                  })}
                </summary>
                <div className="mt-2 overflow-x-auto">
                  <BarChart
                    rows={rest}
                    scaleMax={scaleMax}
                    bestName={bestName}
                  />
                </div>
              </details>
            )}
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {fill(b.chart.footnote, values)}
              {anyUnderpowered ? ` ${b.chart.underpoweredMark}` : ""}
            </p>
          </div>
        )}
      </div>

      {/* the plain-words explainer - always present, numbers only when live */}
      <div className="mt-8 max-w-measure space-y-4 rounded-lg border border-line bg-surface p-6">
        {b.explainer.map((block, i) => {
          const isFluencyBlock = i === b.explainer.length - 1;
          const body = values ? fill(block.live, values) : block.fallback;
          const poolTail =
            isFluencyBlock && live && values
              ? live.poolPreference.poolComparisons > 0
                ? ` ${fill(b.poolSentence.live, values)}`
                : ` ${b.poolSentence.zero}`
              : "";
          return (
            <p key={block.title} className="text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">{block.title}</strong>{" "}
              {body}
              {poolTail}
            </p>
          );
        })}
      </div>

      {/* the raw numbers, for readers who want them - live only */}
      {live && values && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm font-medium text-accent">
            {b.table.summaryLabel}
          </summary>
          <div className="mt-3 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[640px] border-collapse bg-surface text-sm">
              <thead>
                <tr className="border-b border-line-strong bg-surface-sunken text-left text-xs uppercase tracking-overline text-muted">
                  <th className="px-3 py-2 font-medium">
                    {b.table.headers.candidate}
                  </th>
                  <th className="px-3 py-2 font-medium">
                    {b.table.headers.approach}
                  </th>
                  <th className="px-3 py-2 text-right font-medium">
                    {b.table.headers.n}
                  </th>
                  <th className="px-3 py-2 text-right font-medium">
                    {fill(b.table.headers.all, values)}
                  </th>
                  <th className="px-3 py-2 text-right font-medium">
                    {fill(b.table.headers.clean, values)}
                  </th>
                </tr>
              </thead>
              <tbody>
                <CeilingRow
                  label={b.table.ceilingHonest.label}
                  note={b.table.ceilingHonest.note}
                  ceiling={live.ceilings.onePerAnnotator}
                />
                <CeilingRow
                  label={b.table.ceilingShipped.label}
                  note={b.table.ceilingShipped.note}
                  ceiling={live.ceilings.asShipped}
                />
                {live.candidates.map((c) => (
                  <tr
                    key={c.name}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="px-3 py-2 text-ink">{c.name}</td>
                    <td className="px-3 py-2 text-muted">{c.approach}</td>
                    <td
                      className="px-3 py-2 text-right text-muted"
                      style={{ fontFamily: MONO }}
                    >
                      {c.n}
                    </td>
                    <td
                      className="px-3 py-2 text-right text-muted"
                      style={{ fontFamily: MONO }}
                    >
                      {fmtChrf(c.strippedChrfAll)}
                    </td>
                    <td
                      className="px-3 py-2 text-right text-ink"
                      style={{ fontFamily: MONO }}
                    >
                      {fmtChrf(c.strippedChrfClean)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 max-w-measure space-y-3 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
            <p>{b.table.note1}</p>
            <p>{fill(b.table.note2.live, values)}</p>
          </div>
        </details>
      )}
    </div>
  );
}
