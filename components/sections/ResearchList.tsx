import { getContent } from "@/lib/content";

// Annotated research, grouped by theme. Linked entries open the source; stub
// entries are shown muted with a clear "to come" marker.
export function ResearchList() {
  const { research } = getContent();
  return (
    <div className="space-y-12">
      {research.map((group) => (
        <div key={group.id}>
          <h3 className="text-xl font-semibold">{group.theme}</h3>
          {group.description && (
            <p className="mt-2 max-w-measure leading-relaxed text-muted">
              {group.description}
            </p>
          )}
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {group.entries.map((entry) => (
              <li
                key={entry.id}
                className={`rounded-lg border p-5 ${
                  entry.isStub
                    ? "border-dashed border-line-strong"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-base font-semibold leading-snug">
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        {entry.title}
                        <span aria-hidden="true"> &#8599;</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      entry.title
                    )}
                  </h4>
                  {entry.isStub && (
                    <span className="overline shrink-0">To come</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{entry.source}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {entry.summary}
                </p>
                {entry.tags && entry.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-line px-2 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
