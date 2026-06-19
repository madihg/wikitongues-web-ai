import type { ReactNode } from "react";

type Width = "standard" | "wide" | "bleed";

const widthClass: Record<Width, string> = {
  standard: "max-w-container",
  wide: "max-w-container-wide",
  bleed: "max-w-container-bleed",
};

interface SectionProps {
  id: string;
  overline?: string;
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
  overline,
  title,
  intro,
  width = "standard",
  tone = "default",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={tone === "sunken" ? "bg-surface-sunken" : undefined}
      style={{ scrollMarginTop: "calc(var(--header-h) + 16px)" }}
    >
      <div
        className={`mx-auto ${widthClass[width]} px-5 py-12 sm:px-6 md:py-16 lg:py-24`}
      >
        {(overline || title || intro) && (
          <header className="mb-8 max-w-measure md:mb-12">
            {overline && <p className="overline mb-3">{overline}</p>}
            {title && (
              <h2
                id={headingId}
                className="text-3xl font-semibold leading-tight md:text-4xl"
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
