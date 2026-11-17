import { reading } from "@/content/en/reading";
import { record } from "@/content/en/record";

// Further reading. Every entry has a link that was opened and checked.
export function ReadingList() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {reading.map((entry) => (
        <li
          key={entry.id}
          className="rounded-card border border-line bg-surface p-4 sm:p-6"
        >
          <h3
            className="text-body font-semibold leading-snug"
            style={{ fontFamily: "var(--wt-font-sans)" }}
          >
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-target-min items-center text-accent underline underline-offset-4"
            >
              <span>
                {entry.title}
                <span className="sr-only"> {record.reading.opensInNewTab}</span>
              </span>
            </a>
          </h3>
          <p className="mt-1 text-small text-ink-3">{entry.source}</p>
          <p className="mt-2 text-small text-ink-2">{entry.summary}</p>
        </li>
      ))}
    </ul>
  );
}
