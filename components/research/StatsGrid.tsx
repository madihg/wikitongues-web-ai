"use client";

import { useStats } from "./useStats";
import { researchPage } from "@/content/en/researchPage";

// The live findings grid. Auto-updates from the public stats endpoint: a set of
// headline tiles, a per-category breakdown of the prompt bank, and the
// output-purity milestone. On a failed fetch it falls back to the most recent
// recorded pilot snapshot and says so, so the page is never broken or blank.

const fb = researchPage.fallbackStats;

function n(x: number): string {
  return x.toLocaleString("en-US");
}
function pct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

interface Tile {
  value: string;
  label: string;
}

function Tiles({ tiles, dim }: { tiles: Tile[]; dim: boolean }) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={`rounded-lg border border-line bg-surface p-5 ${
            dim ? "animate-pulse" : ""
          }`}
        >
          <dt className="font-serif text-3xl font-semibold text-accent md:text-4xl">
            {t.value}
          </dt>
          <dd className="mt-2 text-sm leading-snug text-muted">{t.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StatsGrid() {
  const state = useStats();

  const live = state.status === "ready" ? state.data : null;
  const loading = state.status === "loading";

  const tiles: Tile[] = [
    {
      value: live ? pct(live.judgments.bothInadequateRate) : pct(fb.bothInadequateRate),
      label: "of AI answers rejected by native speakers",
    },
    {
      value: live ? n(live.prompts.total) : n(fb.promptsTotal),
      label: "prompts in the evaluation bank",
    },
    {
      value: live ? n(live.prompts.heldOutBenchmark) : n(fb.heldOut),
      label: "questions locked in the frozen exam",
    },
    {
      value: live ? n(live.gold.total) : n(fb.goldTotal),
      label: "community gold answers collected",
    },
    {
      value: live ? n(live.judgments.pairwiseTotal) : n(fb.pairwiseTotal),
      label: "blind comparisons judged",
    },
    {
      value: live ? n(live.annotators.active) : n(fb.activeAnnotators),
      label: "native speakers contributing",
    },
  ];

  const purity = live ? live.modelOutputPurity : null;
  const purityBefore = purity ? purity.before : fb.purity.before;
  const purityAfter = purity ? purity.after : fb.purity.after;

  const categories = live?.prompts.byCategory ?? [];
  const maxCat = categories.reduce((m, c) => Math.max(m, c.count), 0) || 1;

  return (
    <div className="grid gap-8">
      <Tiles tiles={tiles} dim={loading} />

      {/* output purity, before -> after */}
      <div className="rounded-lg border border-line bg-surface-sunken p-6">
        <p className="overline mb-3">Off-target output, before and after</p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-serif text-2xl font-semibold text-muted line-through decoration-line-strong">
            {purityBefore}%
          </span>
          <svg width="28" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-serif text-3xl font-semibold text-accent">
            {purityAfter}%
          </span>
          <span className="text-sm leading-snug text-muted">
            non-Igala content in model output, after one plain instruction and
            before any fine-tuning
          </span>
        </div>
      </div>

      {/* per-category prompt breakdown (live only) */}
      {categories.length > 0 && (
        <div>
          <p className="overline mb-4">
            The prompt bank, by what each question tests
          </p>
          <ul className="grid gap-2.5">
            {categories.map((c) => (
              <li key={c.key} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div className="grid grid-cols-[minmax(0,11rem)_1fr] items-center gap-3">
                  <span className="truncate text-sm text-ink" title={c.label}>
                    {c.label}
                  </span>
                  <span
                    className="h-2.5 rounded-full bg-accent"
                    style={{ width: `${Math.max(6, (c.count / maxCat) * 100)}%` }}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm tabular-nums text-muted">{c.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted">
        {loading
          ? "Loading the latest numbers from the annotation platform..."
          : live
            ? "These figures update automatically from the live annotation platform."
            : fb.caption}
      </p>
    </div>
  );
}
