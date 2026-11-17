import { getContent } from "@/lib/content";
import { site } from "@/content/config";
import { withBase } from "@/lib/base";

// Sticky header. Desktop nav inline; mobile nav uses a native <details>
// disclosure so it works with zero client JavaScript. Every link is a 44px
// target or taller.
export function Header() {
  const { ui } = getContent();
  const link =
    "inline-flex min-h-target-min items-center px-2 text-small font-medium text-ink hover:text-accent";
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 border-b border-line bg-paper"
      style={{ height: "var(--wt-header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-container-bleed items-center justify-between px-4 sm:px-6">
        <a
          href={withBase("/")}
          className="flex min-h-target-min items-center gap-2 font-serif text-title font-semibold"
        >
          {site.parentName}
          <span className="rounded-control bg-accent px-1.5 py-0.5 font-sans text-meta font-semibold uppercase tracking-overline text-on-accent">
            AI
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-3 md:flex">
          {ui.nav.map((item) => (
            <a key={item.href} href={withBase(item.href)} className={link}>
              {item.label}
            </a>
          ))}
          <a
            href={site.parentUrl}
            className={`${link} text-ink-2`}
            rel="noopener"
          >
            {ui.backToParent}
          </a>
        </nav>

        {/* Mobile disclosure menu - no JS */}
        <details className="relative md:hidden">
          <summary className="flex min-h-target min-w-target cursor-pointer list-none items-center justify-end gap-2 text-body font-semibold [&::-webkit-details-marker]:hidden">
            {ui.menu}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-60 rounded-card border border-line bg-surface p-2 shadow-overlay">
            <nav aria-label="Primary mobile" className="flex flex-col">
              {ui.nav.map((item) => (
                <a
                  key={item.href}
                  href={withBase(item.href)}
                  className="flex min-h-target items-center rounded-control px-3 text-body font-medium text-ink hover:bg-sunken"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.parentUrl}
                className="flex min-h-target items-center rounded-control px-3 text-body font-medium text-ink-2 hover:bg-sunken"
                rel="noopener"
              >
                {ui.backToParent}
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
