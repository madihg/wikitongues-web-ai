import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { researchPage as rp } from "@/content/en/researchPage";
import { Section } from "@/components/primitives/Section";
import { ResearchList } from "@/components/sections/ResearchList";
import { CTAButton } from "@/components/primitives/CTAButton";
import { EpisodeFlow } from "@/components/research/diagrams/EpisodeFlow";
import { Flywheel } from "@/components/research/diagrams/Flywheel";
import { MethodLadder } from "@/components/research/diagrams/MethodLadder";
import { HeadlineStat } from "@/components/research/HeadlineStat";
import { StatsGrid } from "@/components/research/StatsGrid";

export const metadata: Metadata = {
  title: rp.meta.title,
  description: rp.meta.description,
  alternates: { canonical: "/research/" },
  openGraph: {
    title: `${rp.meta.title} - Wikitongues AI`,
    description: rp.meta.description,
  },
};

export default function ResearchPage() {
  const { research } = getContent();

  return (
    <>
      {/* Page hero */}
      <section
        className="mx-auto max-w-container-bleed px-5 pb-2 pt-16 sm:px-6 md:pt-24"
        aria-labelledby="research-hero-heading"
      >
        <div className="max-w-measure">
          <p className="overline mb-4">{rp.hero.overline}</p>
          <h1
            id="research-hero-heading"
            className="text-4xl font-semibold leading-[1.1] md:text-5xl"
          >
            {rp.hero.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
            {rp.hero.intro}
          </p>
        </div>
      </section>

      {/* Why */}
      <Section
        id="why"
        overline={rp.why.overline}
        title={rp.why.title}
        width="wide"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-measure">
            <p className="text-xl font-semibold leading-relaxed text-ink">
              {rp.why.lead}
            </p>
            <div className="mt-5 space-y-4">
              {rp.why.body.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:pt-2">
            <HeadlineStat label={rp.why.statLabel} caption={rp.why.statCaption} />
          </div>
        </div>
      </Section>

      {/* Who */}
      <Section
        id="who"
        overline={rp.who.overline}
        title={rp.who.title}
        intro={rp.who.intro}
        width="wide"
        tone="sunken"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {rp.who.groups.map((group) => (
            <div
              key={group.name}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <p className="overline mb-2 text-accent">{group.role}</p>
              <h3 className="font-serif text-lg font-semibold">{group.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {group.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How, with diagrams */}
      <Section
        id="how"
        overline={rp.how.overline}
        title={rp.how.title}
        intro={rp.how.intro}
        width="wide"
      >
        <div className="space-y-16">
          <div>
            <h3 className="font-serif text-xl font-semibold">
              {rp.how.episode.title}
            </h3>
            <p className="mb-8 mt-2 max-w-measure leading-relaxed text-muted">
              {rp.how.episode.caption}
            </p>
            <EpisodeFlow steps={rp.how.episode.steps} />
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold">
              {rp.how.flywheel.title}
            </h3>
            <p className="mb-8 mt-2 max-w-measure leading-relaxed text-muted">
              {rp.how.flywheel.caption}
            </p>
            <Flywheel stages={rp.how.flywheel.stages} />
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold">
              {rp.how.ladder.title}
            </h3>
            <p className="mb-8 mt-2 max-w-measure leading-relaxed text-muted">
              {rp.how.ladder.caption}
            </p>
            <MethodLadder
              rungs={rp.how.ladder.rungs}
              heldOut={rp.how.ladder.heldOut}
            />
          </div>
        </div>
      </Section>

      {/* What we've learned - live stats + findings */}
      <Section
        id="findings"
        overline={rp.learned.overline}
        title={rp.learned.title}
        intro={rp.learned.intro}
        width="wide"
        tone="sunken"
      >
        <StatsGrid />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {rp.learned.findings.map((finding) => (
            <div
              key={finding.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <h3 className="font-serif text-lg font-semibold leading-snug">
                {finding.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {finding.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What's next */}
      <Section
        id="next"
        overline={rp.next.overline}
        title={rp.next.title}
        intro={rp.next.intro}
        width="wide"
      >
        <ol className="grid gap-5 md:grid-cols-3">
          {rp.next.items.map((item, i) => (
            <li
              key={item.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-sans text-sm font-semibold text-accent-on"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-4">
          <CTAButton href="/#support" variant="primary">
            Support the initiative
          </CTAButton>
          <CTAButton href="/#timeline" variant="secondary">
            See the timeline
          </CTAButton>
        </div>
      </Section>

      {/* Further reading (the annotated bibliography) */}
      {research.length > 0 && (
        <Section
          id="further-reading"
          overline={rp.furtherReading.overline}
          title={rp.furtherReading.title}
          intro={rp.furtherReading.intro}
          width="wide"
          tone="sunken"
        >
          <ResearchList />
        </Section>
      )}
    </>
  );
}
