import { getContent } from "@/lib/content";
import { site } from "@/content/config";

// Inherited-style footer: charcoal, multi-column, with contact, nonprofit
// status, and a link back to the parent. No social icons (matches parent).
export function Footer() {
  const { ui } = getContent();
  const year = new Date().getUTCFullYear();
  return (
    <footer role="contentinfo" className="bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-container-bleed px-5 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="font-serif text-lg font-semibold">
              {site.parentName} <span className="text-accent-on">AI</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-footer-muted">
              {ui.footer.tagline}
            </p>
          </div>

          {ui.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="overline mb-3 text-footer-muted">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-footer-text hover:text-accent-on hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-footer-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p>
              {ui.footer.address} &middot;{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="hover:text-accent-on hover:underline"
              >
                {site.contactEmail}
              </a>
            </p>
            <p className="mt-1">
              {ui.footer.landAcknowledgement} {ui.footer.nonprofit}
            </p>
          </div>
          <p>
            &copy; {year} {site.parentName}
          </p>
        </div>
      </div>
    </footer>
  );
}
