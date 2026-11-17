import { record } from "@/content/en/record";

// Each version of the language layer: what it fixed and what it did not.
// Fixed copy - history, not live data.

const j = record.journey;

export function JourneyStages() {
  return (
    <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {j.stages.map((stage) => (
        <li
          key={stage.name}
          className="rounded-card border border-line bg-surface p-4 sm:p-6"
        >
          <h3 className="text-title font-semibold">{stage.name}</h3>
          <p className="mt-1 text-small text-ink-2">{stage.sub}</p>
          <p className="mt-4 text-small font-semibold text-ink">
            {j.fixedLabel}
          </p>
          <p className="text-small text-ink-2">{stage.fixed}</p>
          <p className="mt-3 text-small font-semibold text-ink">
            {j.missingLabel}
          </p>
          <p className="text-small text-ink-2">{stage.missing}</p>
        </li>
      ))}
    </ol>
  );
}
