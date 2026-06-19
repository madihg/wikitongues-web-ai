import { getContent, getPublishableFaq } from "@/lib/content";

// FAQ as native <details> disclosures (keyboard-operable, zero JS). Draft
// answers carry a visible badge and a dashed border, distinct by more than
// colour, so reviewers can see what is still pending sign-off.
export function FaqAccordion() {
  const { ui, faq } = getContent();
  const items = getPublishableFaq(faq);
  return (
    <div className="max-w-measure divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isDraft = item.signOffStatus === "draft";
        return (
          <details
            key={item.id}
            className={
              isDraft ? "border-l-2 border-dashed border-accent pl-3" : ""
            }
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
              <span className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-ink">
                  {item.question}
                </span>
                {isDraft && (
                  <span className="overline text-accent">
                    {ui.faq.draftBadge}
                  </span>
                )}
              </span>
              <svg
                className="mt-1 shrink-0 transition-transform duration-200"
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
            <p className="pb-5 pr-8 leading-relaxed text-muted">
              {item.answer}
            </p>
          </details>
        );
      })}
    </div>
  );
}
