import type { Metadata } from "next";
import { record as hw } from "@/content/en/record";
import { Section } from "@/components/primitives/Section";
import { JourneyStages } from "@/components/record/JourneyStages";
import { AgreementBoard } from "@/components/record/AgreementBoard";
import { HumanVerdicts } from "@/components/record/HumanVerdicts";
import { LiveFilledText } from "@/components/record/LiveFilledText";
import { PromptBlock } from "@/components/record/PromptBlock";
import { QuestionAreas } from "@/components/record/QuestionAreas";
import { ReadingList } from "@/components/record/ReadingList";
import { CTAButton } from "@/components/primitives/CTAButton";
import { fill } from "@/components/record/format";
import {
  igalaSystemV2,
  igalaSystemV3,
  igalaSystemV4,
  igalaSystemV41,
  igalaTerminalContract,
  promptsCopiedOn,
} from "@/content/en/igalaPrompts";

// The record: the evidence behind the main page. Until 2026-11-13 this was the
// How it works page; the explanation of the method moved to the main page and
// this page kept everything a reader needs to check it. The blind comparisons
// come first because they are the result the project trusts. Every figure is
// fetched at view time from the annotation app's aggregate-only endpoints
// (see content/config.ts) and is otherwise shown as "loading" or "live
// numbers unavailable" - never as a recorded copy.

export const metadata: Metadata = {
  title: hw.meta.title,
  description: hw.meta.description,
  alternates: { canonical: "/record/" },
  openGraph: {
    title: `${hw.meta.title} - Wikitongues AI`,
    description: hw.meta.description,
  },
};

const index = [
  hw.verdicts,
  hw.benchmark,
  hw.journey,
  hw.assembly,
  hw.prompts,
  hw.areas,
  hw.testedNow,
  hw.reading,
  hw.changelog,
];

export default function RecordPage() {
  return (
    <>
      <section
        className="mx-auto max-w-container-wide px-4 pb-4 pt-12 sm:px-6 md:pt-20"
        aria-labelledby="record-hero-heading"
      >
        <div className="max-w-measure">
          <h1
            id="record-hero-heading"
            className="text-h1 font-semibold leading-[1.1] md:text-display"
          >
            {hw.hero.title}
          </h1>
          <p className="mt-6 text-title text-ink">{hw.hero.intro}</p>
          <p className="mt-4 text-body text-ink-2 md:text-igala">
            {hw.hero.intro2}
          </p>
          <p className="mt-4">
            <CTAButton href={hw.hero.mainPageLink.href} variant="link">
              {hw.hero.mainPageLink.label}
            </CTAButton>
          </p>
        </div>
        <nav aria-labelledby="record-index-heading" className="mt-8">
          <h2
            id="record-index-heading"
            className="font-sans text-small font-semibold text-ink-2"
          >
            {hw.hero.indexHeading}
          </h2>
          <ol className="m-0 mt-2 grid list-none gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {index.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex min-h-target-min items-center gap-2 text-body text-accent underline underline-offset-4"
                >
                  <span className="tabular-nums text-ink-3 no-underline" aria-hidden="true">
                    {i + 1}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* 1. Every blind comparison */}
      <Section
        id={hw.verdicts.id}
        title={hw.verdicts.title}
        intro={hw.verdicts.intro}
        width="wide"
      >
        <HumanVerdicts />
      </Section>

      {/* 2. The exam */}
      <Section
        id={hw.benchmark.id}
        title={hw.benchmark.title}
        width="wide"
        tone="sunken"
      >
        <AgreementBoard />
      </Section>

      {/* 3. Each version of the language layer */}
      <Section
        id={hw.journey.id}
        aliases={["journey"]}
        title={hw.journey.title}
        intro={hw.journey.intro}
        width="wide"
      >
        <JourneyStages />
      </Section>

      {/* 4. How one answer is built */}
      <Section
        id={hw.assembly.id}
        title={hw.assembly.title}
        intro={hw.assembly.intro}
        width="wide"
        tone="sunken"
      >
        <p className="-mt-2 mb-8 max-w-measure text-body text-ink-2 md:text-igala">
          {hw.assembly.intro2}
        </p>
        <ol className="m-0 grid max-w-container list-none gap-3 p-0">
          {hw.assembly.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-card border border-line bg-surface p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border border-line-control font-sans text-small font-semibold text-ink"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-body font-semibold" style={{ fontFamily: "var(--wt-font-sans)" }}>
                  {step.title}
                </h3>
                {step.guarded && (
                  <span className="rounded-pill bg-sunken px-3 py-0.5 text-small font-medium text-ink-2">
                    {hw.assembly.guardBadge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-small text-ink-2">{step.why}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. The exact instructions, verbatim */}
      <Section
        id={hw.prompts.id}
        title={hw.prompts.title}
        intro={hw.prompts.intro}
        width="wide"
      >
        <p className="max-w-measure text-small text-ink-2">
          {fill(hw.prompts.provenance, { copiedOn: promptsCopiedOn })}
        </p>
        <PromptBlock label={hw.prompts.v2Label} snapshot={igalaSystemV2} />
        <p className="mt-8 max-w-measure text-body text-ink-2 md:text-igala">
          {hw.prompts.v3Intro}
        </p>
        <PromptBlock label={hw.prompts.v3Label} snapshot={igalaSystemV3} />
        <p className="mt-8 max-w-measure text-body text-ink-2 md:text-igala">
          {hw.prompts.v4Intro}
        </p>
        <PromptBlock label={hw.prompts.v4Label} snapshot={igalaSystemV4} />
        <p className="mt-8 max-w-measure text-body text-ink-2 md:text-igala">
          {hw.prompts.v41Intro}
        </p>
        <PromptBlock label={hw.prompts.v41Label} snapshot={igalaSystemV41} />
        <p className="mt-8 max-w-measure text-body text-ink-2 md:text-igala">
          {hw.prompts.terminalIntro}
        </p>
        <PromptBlock
          label={hw.prompts.terminalLabel}
          snapshot={igalaTerminalContract}
        />
      </Section>

      {/* 6. The questions, by area */}
      <Section
        id={hw.areas.id}
        title={hw.areas.title}
        width="wide"
        tone="sunken"
      >
        <QuestionAreas />
      </Section>

      {/* 7. Open questions */}
      <Section id={hw.testedNow.id} title={hw.testedNow.title} width="wide">
        <div className="grid gap-6 md:grid-cols-2">
          {hw.testedNow.items.map((item) => (
            <div
              key={item.title}
              className="rounded-card border border-line bg-surface p-4 sm:p-6"
            >
              <h3 className="text-title font-semibold">{item.title}</h3>
              <p className="mt-3 text-small text-ink-2">
                <LiveFilledText live={item.live} fallback={item.fallback} />
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Further reading */}
      <Section
        id={hw.reading.id}
        aliases={["further-reading"]}
        title={hw.reading.title}
        intro={hw.reading.intro}
        width="wide"
        tone="sunken"
      >
        <ReadingList />
      </Section>

      {/* 9. The dated log */}
      <Section
        id={hw.changelog.id}
        title={hw.changelog.title}
        intro={hw.changelog.intro}
        width="wide"
      >
        <ol className="m-0 grid max-w-container list-none gap-3 p-0">
          {hw.changelog.entries.map((entry) => (
            <li
              key={entry.date}
              className="rounded-card border border-line bg-surface p-4 sm:p-6"
            >
              <p className="text-small font-semibold text-ink">{entry.date}</p>
              <p className="mt-1.5 text-small text-ink-2">{entry.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
