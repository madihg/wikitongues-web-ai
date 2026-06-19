import { getContent } from "@/lib/content";
import { site } from "@/content/config";

// Sticky header. Desktop nav inline; mobile nav uses a native <details>
// disclosure so it works with zero client JavaScript.
export function Header() {
  const { ui } = getContent();
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 border-b border-line bg-background"
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-container-bleed items-center justify-between px-5 sm:px-6">
        <a
          href="#overview"
          className="flex items-baseline gap-2 font-serif text-lg font-semibold"
        >
          {site.parentName}
          <span className="rounded bg-accent px-1.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-overline text-accent-on">
            AI
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {ui.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.parentUrl}
            className="text-sm text-muted hover:text-accent"
            rel="noopener"
          >
            &larr; {ui.backToParent}
          </a>
        </nav>

        {/* Mobile disclosure menu - no JS */}
        <details className="relative md:hidden">
          <summary
            className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-sm font-semibold [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            Menu
            <svg
              width="16"
              height="16"
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
          <div className="absolute right-0 mt-3 w-56 rounded-lg border border-line bg-surface p-2 shadow-lg">
            <nav aria-label="Primary mobile" className="flex flex-col">
              {ui.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded px-3 py-2 text-sm text-ink hover:bg-surface-sunken"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.parentUrl}
                className="rounded px-3 py-2 text-sm text-muted hover:bg-surface-sunken"
                rel="noopener"
              >
                &larr; {ui.backToParent}
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
