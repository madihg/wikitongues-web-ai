import { Fragment } from "react";
import type { Step } from "@/content/en/researchPage";

// Annotation episode flow. A four-step process rendered as a stepper that runs
// left-to-right on desktop and stacks top-to-bottom on mobile. Pure markup, no
// client JS, no external assets - the arrows are inline SVG.

function Arrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center py-1 text-line-strong md:px-1 md:py-0"
      aria-hidden="true"
    >
      {/* down on mobile */}
      <svg
        className="md:hidden"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 5v14M6 13l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* right on desktop */}
      <svg
        className="hidden md:block"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function EpisodeFlow({ steps }: { steps: Step[] }) {
  return (
    <ol
      className="flex flex-col md:flex-row md:items-stretch"
      aria-label="The four steps of one annotation episode"
    >
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          {i > 0 && <Arrow />}
          <li className="flex flex-1 flex-col gap-3 rounded-lg border border-line bg-surface p-5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-sans text-sm font-semibold text-accent-on"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h4 className="font-serif text-base font-semibold leading-snug">
              {step.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
