"use client";

import type { ReactNode } from "react";
import { howItWorks } from "@/content/en/howItWorks";
import type { DiagramBox } from "@/content/en/howItWorks";
import { useMethodMetrics } from "./useMethodMetrics";
import { fill, stripTokens } from "./format";
import { liveValues } from "./liveValues";

// "The whole system": four layers read top to bottom, with the flywheel as a
// dashed rail looping the bottom layer back to the top. Built as HTML in the
// site's card language (not a fixed-canvas SVG) so it reflows on a phone and
// every label is real, selectable text. Counts inside the boxes are live from
// the method-metrics endpoint; while loading (or if the feed is down) the
// same sentences render without numbers - structure never waits on a fetch.

const d = howItWorks.system.diagram;

function Box({
  box,
  tone = "surface",
  values,
}: {
  box: DiagramBox;
  tone?: "surface" | "sunken" | "accent";
  values: Record<string, string> | null;
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent bg-accent-subtle"
      : tone === "sunken"
        ? "border-line-strong bg-surface-sunken"
        : "border-line bg-surface";
  const render = (t: string) => (values ? fill(t, values) : stripTokens(t));
  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="font-serif text-sm font-semibold text-ink">{box.title}</p>
      {box.line1 && (
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {render(box.line1)}
        </p>
      )}
      {box.line2 && (
        <p className="text-xs leading-relaxed text-muted">
          {render(box.line2)}
        </p>
      )}
    </div>
  );
}

function DownArrow() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1">
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
        <path
          d="M7 0v16M1.5 12.5L7 20l5.5-7.5"
          stroke="var(--color-border-strong)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center self-center text-line-strong"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="rotate-90 lg:rotate-0"
      >
        <path
          d="M4 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function LayerLabel({ children }: { children: ReactNode }) {
  return <p className="overline mb-3 mt-2">{children}</p>;
}

export function SystemDiagram() {
  const state = useMethodMetrics();
  const live = state.status === "ready" ? state.data : null;
  const values = live ? liveValues(live) : null;

  return (
    <div className="relative">
      {/* The flywheel rail: judgment loops back up to the community. */}
      <div
        aria-hidden="true"
        className="absolute -left-4 bottom-24 top-6 hidden w-4 rounded-l-lg border-b-2 border-l-2 border-t-2 border-dashed border-accent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -top-1 left-0 hidden text-accent lg:block"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Layer 1: the community */}
      <div className="rounded-xl border border-line-strong bg-surface-sunken p-5">
        <p className="font-serif text-base font-semibold text-ink">
          {values
            ? fill(d.communityTitleCounted, values)
            : d.communityTitle}
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {d.communityBoxes.map((b) => (
            <Box key={b.title} box={b} values={values} />
          ))}
        </div>
      </div>

      <DownArrow />

      {/* Layer 2: the knowledge */}
      <LayerLabel>{d.knowledgeLabel}</LayerLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {d.knowledgeBoxes.map((b) => (
          <Box key={b.title} box={b} tone="sunken" values={values} />
        ))}
        <div>
          <Box box={d.grammarBox} tone="accent" values={values} />
          <p className="mt-1.5 text-[11px] leading-snug text-muted">
            {d.grammarAside}
          </p>
        </div>
      </div>

      <DownArrow />

      {/* Layer 3: per-question serving */}
      <LayerLabel>{d.servingLabel}</LayerLabel>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        <div className="lg:w-36 lg:shrink-0">
          <Box box={d.questionBox} values={values} />
        </div>
        <FlowArrow />
        <div className="lg:w-40 lg:shrink-0">
          <Box box={d.retrievalBox} values={values} />
        </div>
        {/* the leak guard, drawn as the red filter it is */}
        <div className="flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="rotate-90 lg:rotate-0"
          >
            <path d="M6 4l10 8-10 8z" fill="var(--color-danger)" />
            <path
              d="M17 12h4"
              stroke="var(--color-danger)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1 rounded-lg border border-line-strong bg-surface-sunken p-4">
          <p className="font-serif text-sm font-semibold text-ink">
            {d.contextTitle}
          </p>
          <ul className="mt-1.5 space-y-0.5">
            {d.contextLines.map((line) => (
              <li key={line} className="text-xs leading-relaxed text-muted">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <FlowArrow />
        <div className="lg:w-32 lg:shrink-0">
          <Box box={d.modelBox} values={values} />
        </div>
        <FlowArrow />
        <div className="lg:w-32 lg:shrink-0">
          <Box box={d.answerBox} tone="accent" values={values} />
        </div>
      </div>
      <p className="mt-2 text-xs font-medium text-danger">{d.leakGuardNote}</p>

      <DownArrow />

      {/* Layer 4: judgment */}
      <LayerLabel>{d.judgmentLabel}</LayerLabel>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line-strong bg-surface-sunken p-4">
          <p className="font-serif text-sm font-semibold text-ink">
            {d.judgmentBox.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {d.judgmentBox.line1}
          </p>
          <p className="text-xs leading-relaxed text-muted">
            {values && live
              ? live.poolPreference.poolComparisons > 0
                ? fill(d.judgmentCountLive, values)
                : d.judgmentCountCollecting
              : d.judgmentCountCollecting}
          </p>
          <p className="text-xs leading-relaxed text-muted">
            {d.judgmentBox.line2}
          </p>
        </div>
        <Box box={d.examBox} tone="sunken" values={values} />
        <Box box={d.scoreBox} tone="accent" values={values} />
      </div>

      {/* The flywheel caption */}
      <p className="mt-6 max-w-measure font-serif text-sm font-semibold leading-relaxed text-accent">
        {d.flywheelLines.join(" ")}
      </p>
    </div>
  );
}
