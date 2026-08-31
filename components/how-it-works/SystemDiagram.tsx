"use client";

import type { ReactNode } from "react";
import { howItWorks } from "@/content/en/howItWorks";
import type { DiagramBox } from "@/content/en/howItWorks";
import { useMethodMetrics } from "./useMethodMetrics";
import { fill, stripTokens } from "./format";
import { liveValues } from "./liveValues";

// "The whole system": four layers read top to bottom, with the flywheel as a
// dashed rail that visibly leaves the judgment layer, travels up the left
// gutter, and re-enters the community layer through an arrowhead anchored to
// the rail itself (never floating). Built as HTML in the site's card language
// (not a fixed-canvas SVG) so it reflows on a phone and every label is real,
// selectable text. Counts inside the boxes are live from the method-metrics
// endpoint; while loading (or if the feed is down) the same sentences render
// without numbers - structure never waits on a fetch.

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
    <div className={`flex h-full flex-col rounded-lg border p-4 ${toneClass}`}>
      <p className="font-serif text-sm font-semibold text-ink">{box.title}</p>
      {box.line1 && (
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {render(box.line1)}
        </p>
      )}
      {box.line2 && (
        <p className="text-xs leading-relaxed text-muted">{render(box.line2)}</p>
      )}
      {box.aside && (
        <p className="mt-auto pt-2 text-[11px] italic leading-snug text-muted">
          {box.aside}
        </p>
      )}
    </div>
  );
}

/** The vertical arrow between layers, on the diagram's center line. */
function DownArrow() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1.5">
      <svg width="14" height="26" viewBox="0 0 14 26" fill="none">
        <path
          d="M7 0v20M1.5 16.5L7 24l5.5-7.5"
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

/** The horizontal arrow between boxes in the serving row. */
function FlowArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center self-center py-0.5 text-muted lg:px-0.5 lg:py-0"
    >
      <svg
        width="18"
        height="18"
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

/** The leak guard, drawn as the red funnel it is, labeled at the gate. */
function LeakGate() {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-0.5 self-center px-1 py-1 lg:py-0">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 4h16l-6 7.5V17l-4 3v-8.5L4 4z"
          fill="var(--color-danger)"
          fillOpacity="0.12"
          stroke="var(--color-danger)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-danger">
        {d.leakGuardLabel}
      </span>
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
    <div className="lg:pl-12">
      <div className="relative">
        {/* The flywheel rail: judgment loops back up into the community.
            Everything about it is anchored to this one element, so the
            arrowhead and label can never drift from the line they belong to.
            inset-y anchors: the rail enters at the community card's title row
            and leaves from the judgment row's vertical middle. */}
        <div
          aria-hidden="true"
          className="absolute -left-9 bottom-14 top-7 hidden w-6 rounded-l-xl border-b-2 border-l-2 border-t-2 border-dashed border-accent lg:block"
        >
          {/* arrowhead: sits at the top-right end of the rail, pointing into
              the community layer */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -right-2 -top-[8px] text-accent"
          >
            <path
              d="M4 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* the rail's label, set on the line, breaking the dashes */}
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 bg-background py-2 text-[10px] font-semibold uppercase tracking-wider text-accent [writing-mode:vertical-rl] rotate-180">
            {d.returnLabel}
          </span>
        </div>

        {/* Layer 1: the community */}
        <div className="rounded-xl border border-line-strong bg-surface-sunken p-5">
          <p className="font-serif text-base font-semibold text-ink">
            {values ? fill(d.communityTitleCounted, values) : d.communityTitle}
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
          {d.knowledgeBoxes.map((b, i) => (
            <Box
              key={b.title}
              box={b}
              tone={i === d.knowledgeBoxes.length - 1 ? "accent" : "sunken"}
              values={values}
            />
          ))}
        </div>

        <DownArrow />

        {/* Layer 3: per-question serving */}
        <LayerLabel>{d.servingLabel}</LayerLabel>
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-0.5">
          <div className="lg:w-[9.5rem] lg:shrink-0">
            <Box box={d.questionBox} values={values} />
          </div>
          <FlowArrow />
          <div className="lg:w-[10rem] lg:shrink-0">
            <Box box={d.retrievalBox} values={values} />
          </div>
          <LeakGate />
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
          <div className="lg:w-[8.5rem] lg:shrink-0">
            <Box box={d.modelBox} values={values} />
          </div>
          <FlowArrow />
          <div className="lg:w-[8.5rem] lg:shrink-0">
            <Box box={d.answerBox} tone="accent" values={values} />
          </div>
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-relaxed text-danger">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          >
            <path
              d="M4 4h16l-6 7.5V17l-4 3v-8.5L4 4z"
              fill="var(--color-danger)"
              fillOpacity="0.12"
              stroke="var(--color-danger)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span>{d.leakGuardNote}</span>
        </p>

        <DownArrow />

        {/* Layer 4: judgment */}
        <LayerLabel>{d.judgmentLabel}</LayerLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex h-full flex-col rounded-lg border border-line-strong bg-surface-sunken p-4">
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

        {/* On small screens the rail is hidden; say the loop out loud. */}
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-2 lg:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20V6M6 11l6-7 6 7"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            {d.mobileReturnLabel}
          </span>
        </div>
      </div>

      {/* The flywheel caption */}
      <p className="mt-6 max-w-measure font-serif text-sm font-semibold leading-relaxed text-accent">
        {d.flywheelLines.join(" ")}
      </p>
    </div>
  );
}
