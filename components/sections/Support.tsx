import { getContent } from "@/lib/content";
import { site } from "@/content/config";
import { CTAButton } from "@/components/primitives/CTAButton";

export function Support() {
  const { ui } = getContent();
  const s = ui.support;
  return (
    <div className="max-w-measure">
      <p className="text-lg leading-relaxed text-muted">{s.body}</p>
      <div className="mt-6">
        <CTAButton href={site.donateUrl} variant="primary" external>
          {s.cta.label}
        </CTAButton>
      </div>
      <p className="mt-6 text-muted">
        {s.contactLead}{" "}
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-accent underline-offset-4 hover:underline"
        >
          {site.contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
