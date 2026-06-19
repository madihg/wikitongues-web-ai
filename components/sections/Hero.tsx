import { getContent } from "@/lib/content";
import { CTAButton } from "@/components/primitives/CTAButton";

// Typographic-forward hero. Ships without any media dependency; a media slot
// can be added later without changing the layout.
export function Hero() {
  const { ui } = getContent();
  const { hero } = ui;
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      style={{ scrollMarginTop: "calc(var(--header-h) + 16px)" }}
    >
      <div className="mx-auto max-w-container-bleed px-5 pb-12 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:pt-28">
        <div className="max-w-3xl">
          <p className="overline mb-4">{hero.overline}</p>
          <h1
            id="hero-heading"
            className="text-4xl font-semibold leading-[1.08] md:text-6xl"
          >
            {hero.headline}{" "}
            <span className="text-accent">{hero.headlineEmphasis}</span>
          </h1>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted md:text-xl">
            {hero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </CTAButton>
            <CTAButton href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
