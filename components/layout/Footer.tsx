import { getContent } from "@/lib/content";
import { site } from "@/content/config";
import { FiguresStamp } from "@/components/home/FiguresStamp";
import { withBase } from "@/lib/base";

// The one inverse surface on the site: project line, two link columns,
// address, nonprofit status, and when the live figures were fetched.
export function Footer() {
  const { ui } = getContent();
  const year = new Date().getUTCFullYear();
  const link =
    "inline-flex min-h-target-min items-center text-small text-on-inverse underline-offset-4 hover:underline";
  return (
    <footer role="contentinfo" className="on-inverse bg-inverse text-on-inverse">
      <div className="mx-auto max-w-container-bleed px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="font-serif text-title font-semibold">
              {site.parentName} AI
            </p>
            <p className="mt-3 max-w-xs text-small text-on-inverse-2">
              {ui.footer.tagline}
            </p>
          </div>

          {ui.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-2 font-sans text-small font-semibold text-on-inverse-2">
                {col.title}
              </h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={withBase(l.href)} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/20 pt-6 text-small text-on-inverse-2 md:flex-row md:items-start md:justify-between">
          <div>
            <p>
              {ui.footer.address} &middot;{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-on-inverse underline underline-offset-4"
              >
                {site.contactEmail}
              </a>
            </p>
            <p className="mt-1">
              {ui.footer.landAcknowledgement} {ui.footer.nonprofit}
            </p>
            <FiguresStamp />
          </div>
          <p>
            &copy; {year} {site.parentName}
          </p>
        </div>
      </div>
    </footer>
  );
}
