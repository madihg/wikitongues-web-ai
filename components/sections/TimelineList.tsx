import { getContent } from "@/lib/content";
import { classifyPhase, sortByDate } from "@/lib/timeline";
import { VisuallyHidden } from "@/components/primitives/VisuallyHidden";

// Vertical timeline. Past vs upcoming is signalled three ways - marker fill,
// a text pill, and a screen-reader status - never by colour alone.
export function TimelineList() {
  const { ui, timeline } = getContent();
  const items = sortByDate(timeline);
  const t = ui.timeline;

  return (
    <ol className="relative ml-1 space-y-10 border-l border-line pl-8">
      {items.map((item) => {
        const phase = classifyPhase(item);
        const isPast = phase === "past";
        return (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[39px] top-1 grid h-4 w-4 place-items-center rounded-full ${
                isPast ? "bg-accent" : "border-2 border-accent bg-background"
              }`}
            />
            <VisuallyHidden>
              {isPast ? "Completed: " : "Upcoming: "}
            </VisuallyHidden>
            <div className="flex flex-wrap items-center gap-3">
              <p className="overline">{item.dateLabel}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isPast
                    ? "bg-surface-sunken text-muted"
                    : "bg-accent-subtle text-accent"
                }`}
              >
                {isPast ? t.pastLabel : t.upcomingLabel}
              </span>
            </div>
            <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 max-w-measure leading-relaxed text-muted">
              {item.summary}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
