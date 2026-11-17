import type { ReactNode } from "react";

type Width = "standard" | "wide" | "bleed";

const widthClass: Record<Width, string> = {
  standard: "max-w-container",
  wide: "max-w-container-wide",
  bleed: "max-w-container-bleed",
};

interface SectionProps {
  id: string;
  /** Older ids that still appear in links people have shared. Each becomes
   * an empty anchor at the top of the section, so the old link lands here. */
  aliases?: string[];
  title?: string;
  intro?: string;
  width?: Width;
  tone?: "default" | "sunken";
  children: ReactNode;
}

// Semantic section wrapper: a single <h2>, consistent vertical rhythm, and a
// scroll-margin so the sticky header never covers the heading on anchor jumps.
export function Section({
  id,
  aliases = [],
  title,
  intro,
  width = "standard",
  tone = "default",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const scrollMargin = { scrollMarginTop: "calc(var(--wt-header-h) + 16px)" };
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={tone === "sunken" ? "bg-sunken" : undefined}
      style={scrollMargin}
    >
      {aliases.map((alias) => (
        <span key={alias} id={alias} style={scrollMargin} className="block" />
      ))}
      <div
        className={`mx-auto ${widthClass[width]} px-4 py-12 sm:px-6 md:py-16 lg:py-24`}
      >
        {(title || intro) && (
          <header className="mb-8 max-w-measure md:mb-10">
            {title && (
              <h2
                id={headingId}
                className="text-h2 font-semibold md:text-h1"
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-title leading-snug text-ink-2">{intro}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
