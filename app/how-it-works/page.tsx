import type { Metadata } from "next";
import { howItWorks as hw } from "@/content/en/howItWorks";
import { Section } from "@/components/primitives/Section";
import { MethodStats } from "@/components/how-it-works/MethodStats";
import { SystemDiagram } from "@/components/how-it-works/SystemDiagram";
import { JourneyStages } from "@/components/how-it-works/JourneyStages";
import { AgreementBoard } from "@/components/how-it-works/AgreementBoard";
import { LiveFilledText } from "@/components/how-it-works/LiveFilledText";
import { PromptBlock } from "@/components/how-it-works/PromptBlock";
import { fill } from "@/components/how-it-works/format";
import {
  igalaSystemV2,
  igalaSystemV3,
  igalaSystemV4,
  igalaSystemV41,
  igalaTerminalContract,
  promptsCopiedOn,
} from "@/content/en/igalaPrompts";

// The public How-it-works page: the Igala pilot end to end for funders,
// allies, and community members. Static structure and story; every number is
// fetched at view time from the annotation app's aggregate-only
// method-metrics endpoint (see content/config.ts) and is otherwise shown as
// "loading" or "live numbers unavailable" - never as a recorded copy.

export const metadata: Metadata = {
  title: hw.meta.title,
  description: hw.meta.description,
  alternates: { canonical: "/how-it-works/" },
  openGraph: {
    title: `${hw.meta.title} - Wikitongues AI`,
    description: hw.meta.description,
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Page hero + the live stat strip */}
      <section
        className="mx-auto max-w-container-bleed px-5 pb-4 pt-16 sm:px-6 md:pt-24"
        aria-labelledby="hiw-hero-heading"
      >
        <div className="max-w-measure">
          <p className="overline mb-4">{hw.hero.overline}</p>
          <h1
            id="hiw-hero-heading"
            className="text-4xl font-semibold leading-[1.1] md:text-5xl"
          >
            {hw.hero.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
            {hw.hero.intro}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {hw.hero.intro2}
          </p>
        </div>
        <div className="mt-10">
          <MethodStats />
        </div>
      </section>

      {/* The whole system, one picture */}
      <Section
        id={hw.system.id}
        overline={hw.system.overline}
        title={hw.system.title}
        intro={hw.system.intro}
        width="wide"
      >
        <SystemDiagram />
        <p className="mt-6 max-w-measure text-sm leading-relaxed text-muted">
          {hw.system.caption}
        </p>
      </Section>

      {/* The journey, v0 to v3 */}
      <Section
        id={hw.journey.id}
        overline={hw.journey.overline}
        title={hw.journey.title}
        intro={hw.journey.intro}
        width="wide"
        tone="sunken"
      >
        <JourneyStages />
      </Section>

      {/* How one answer is built */}
      <Section
        id={hw.assembly.id}
        overline={hw.assembly.overline}
        title={hw.assembly.title}
        intro={hw.assembly.intro}
        width="wide"
      >
        <p className="-mt-4 mb-8 max-w-measure text-lg leading-relaxed text-muted md:-mt-6">
          {hw.assembly.intro2}
        </p>
        <ol className="grid max-w-container gap-3">
          {hw.assembly.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent font-sans text-xs font-semibold text-accent"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="font-serif text-base font-semibold">
                  {step.title}
                </h3>
                {step.guarded && (
                  <span className="rounded-full border border-accent bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent">
                    {hw.assembly.guardBadge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.why}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* The exact prompts, verbatim */}
      <Section
        id={hw.prompts.id}
        overline={hw.prompts.overline}
        title={hw.prompts.title}
        intro={hw.prompts.intro}
        width="wide"
        tone="sunken"
      >
        <p className="-mt-4 max-w-measure text-sm leading-relaxed text-muted md:-mt-6">
          {fill(hw.prompts.provenance, { copiedOn: promptsCopiedOn })}
        </p>
        <PromptBlock label={hw.prompts.v2Label} snapshot={igalaSystemV2} />
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          {hw.prompts.v3Intro}
        </p>
        <PromptBlock label={hw.prompts.v3Label} snapshot={igalaSystemV3} />
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          {hw.prompts.v4Intro}
        </p>
        <PromptBlock label={hw.prompts.v4Label} snapshot={igalaSystemV4} />
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          {hw.prompts.v41Intro}
        </p>
        <PromptBlock label={hw.prompts.v41Label} snapshot={igalaSystemV41} />
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          {hw.prompts.terminalIntro}
        </p>
        <PromptBlock
          label={hw.prompts.terminalLabel}
          snapshot={igalaTerminalContract}
        />
      </Section>

      {/* The benchmark */}
      <Section
        id={hw.benchmark.id}
        overline={hw.benchmark.overline}
        title={hw.benchmark.title}
        width="wide"
      >
        <div className="-mt-2 md:-mt-4">
          <AgreementBoard />
        </div>
      </Section>

      {/* What is being tested now */}
      <Section
        id={hw.testedNow.id}
        overline={hw.testedNow.overline}
        title={hw.testedNow.title}
        width="wide"
        tone="sunken"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {hw.testedNow.items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <LiveFilledText live={item.live} fallback={item.fallback} />
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* The dated record */}
      <Section
        id={hw.changelog.id}
        overline={hw.changelog.overline}
        title={hw.changelog.title}
        intro={hw.changelog.intro}
        width="wide"
      >
        <ol className="grid max-w-container gap-3">
          {hw.changelog.entries.map((entry) => (
            <li
              key={entry.date}
              className="rounded-lg border border-line bg-surface p-5"
            >
              <p className="font-mono text-xs font-semibold text-accent">
                {entry.date}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {entry.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
