import type { Metadata } from "next";
import { home } from "@/content/en/home";
import { method } from "@/content/en/method";
import { site } from "@/content/config";
import { legacyScript } from "@/lib/legacy";
import { Section } from "@/components/primitives/Section";
import { CTAButton } from "@/components/primitives/CTAButton";
import { LiveFilledText } from "@/components/record/LiveFilledText";
import { MethodLoop } from "@/components/method/MethodLoop";
import { ResultRow } from "@/components/home/ResultRow";

// The main page is the explanation of the project, in the order a stranger
// needs it: what it is, the problem, how it works (the loop), results, what
// we got wrong, who does the work, how to take part, questions.
// All copy is in content/en/home.ts and content/en/method.ts.

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: home.meta.ogTitle,
    description: home.meta.ogDescription,
  },
};

const h3 = "text-title font-semibold";
const prose = "max-w-measure text-body text-ink-2 md:text-igala";

function doorHref(action: string): string {
  if (action === "email") return `mailto:${site.contactEmail}`;
  if (action === "donate") return site.donateUrl;
  return action;
}

export default function HomePage() {
  const { hero, problem, results, corrections, who, takePart, questions } =
    home;
  return (
    <>
      {/* Two sections of the old home page moved to the record. */}
      <script dangerouslySetInnerHTML={{ __html: legacyScript("/") }} />

      {/* What it is */}
      <section
        id="overview"
        aria-labelledby="hero-heading"
        style={{ scrollMarginTop: "calc(var(--wt-header-h) + 16px)" }}
      >
        <div className="mx-auto max-w-container-wide px-4 pb-12 pt-12 sm:px-6 md:pb-16 md:pt-20 lg:pt-24">
          <p className="overline mb-4">{hero.label}</p>
          <h1
            id="hero-heading"
            className="max-w-[20ch] text-h1 font-semibold leading-[1.1] md:text-display lg:text-hero"
          >
            {hero.title}
          </h1>
          <div className="mt-6 max-w-measure space-y-4 text-igala text-ink md:text-title md:leading-relaxed">
            {hero.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p
            className="mt-6 max-w-measure rounded-card border-l-[3px] border-ink bg-sunken px-4 py-4 text-body text-ink md:text-igala"
            data-testid="hero-result"
          >
            <LiveFilledText
              live={hero.result.live}
              fallback={hero.result.fallback}
            />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href={hero.primary.href}>{hero.primary.label}</CTAButton>
            <CTAButton href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* The problem */}
      <Section
        id={problem.id}
        aliases={["project"]}
        title={problem.title}
        width="wide"
        tone="sunken"
      >
        <div className={`${prose} space-y-4`}>
          {problem.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* How it works: the loop */}
      <Section
        id={home.howItWorks.id}
        title={home.howItWorks.title}
        intro={method.intro}
        width="bleed"
      >
        <MethodLoop />
      </Section>

      {/* Results */}
      <Section id={results.id} title={results.title} width="wide" tone="sunken">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={`${prose} space-y-4`}>
            <p className="text-ink">{results.lead}</p>
            <p>
              <LiveFilledText
                live={results.reading.live}
                fallback={results.reading.fallback}
              />
            </p>
            <p>{results.start}</p>
            <p>
              <CTAButton href={results.link.href} variant="link">
                {results.link.label}
              </CTAButton>
            </p>
          </div>
          <div className="space-y-6">
            <ResultRow />
            <div className="rounded-card border-l-[3px] border-ink bg-surface px-4 py-4 sm:px-6">
              <h3 className={h3}>{results.limits.title}</h3>
              <p className="mt-2 text-body text-ink-2">
                <LiveFilledText
                  live={results.limits.live}
                  fallback={results.limits.fallback}
                />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* What we got wrong */}
      <Section
        id={corrections.id}
        title={corrections.title}
        intro={corrections.intro}
        width="wide"
      >
        <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
          {corrections.items.map((item, i) => (
            <li
              key={item.title}
              className="rounded-card border border-line bg-surface p-4 sm:p-6"
            >
              <p className="text-small font-semibold text-ink-3" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className={`${h3} mt-1`}>{item.title}</h3>
              <p className="mt-3 text-body text-ink-2">
                <LiveFilledText live={item.live} fallback={item.fallback} />
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <CTAButton href={corrections.link.href} variant="link">
            {corrections.link.label}
          </CTAButton>
        </p>
      </Section>

      {/* Who does the work */}
      <Section id={who.id} title={who.title} width="wide" tone="sunken">
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {who.groups.map((g) => (
            <div key={g.title}>
              <dt>
                <h3 className={h3}>{g.title}</h3>
              </dt>
              <dd className="mt-2 max-w-measure text-body text-ink-2">
                <LiveFilledText live={g.live} fallback={g.fallback} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 max-w-measure rounded-card border-l-[3px] border-ink bg-surface px-4 py-4 sm:px-6">
          <h3 className={h3}>{who.ownership.title}</h3>
          <p className="mt-2 text-body text-ink-2">{who.ownership.body}</p>
        </div>
      </Section>

      {/* Take part */}
      <Section
        id={takePart.id}
        aliases={["support"]}
        title={takePart.title}
        intro={takePart.intro}
        width="wide"
      >
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
          {takePart.doors.map((door) => (
            <li
              key={door.title}
              className="flex flex-col rounded-card border border-line bg-surface p-4 sm:p-6"
            >
              <h3 className={h3}>{door.title}</h3>
              <p className="mt-3 flex-1 text-body text-ink-2">{door.body}</p>
              <p className="mt-5">
                <CTAButton
                  href={doorHref(door.action)}
                  variant="secondary"
                  external={door.action === "donate"}
                >
                  {door.button}
                </CTAButton>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-body text-ink-2">
          {takePart.emailNote.split("{email}")[0]}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-accent underline underline-offset-4"
          >
            {site.contactEmail}
          </a>
          {takePart.emailNote.split("{email}")[1]}
        </p>
      </Section>

      {/* Questions */}
      <Section
        id={questions.id}
        aliases={["faq"]}
        title={questions.title}
        width="wide"
        tone="sunken"
      >
        <div className="max-w-measure divide-y divide-line border-y border-line">
          {questions.items.map((q) => (
            <details key={q.id} className="group">
              <summary className="flex min-h-target cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                <span
                  className="text-igala font-semibold text-ink"
                  style={{ lineHeight: 1.4 }}
                >
                  {q.question}
                </span>
                <svg
                  className="shrink-0 transition-transform duration-base ease-wt group-open:rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="pb-5 pr-8 text-body text-ink-2">
                <LiveFilledText
                  live={q.answer.live}
                  fallback={q.answer.fallback}
                />
              </p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
