import { howItWorks } from "@/content/en/howItWorks";

// The journey, v0 to v3: four cards, each an honest ledger of what that
// version fixed and what it did not. Fixed copy - history, not live data.

const j = howItWorks.journey;

export function JourneyStages() {
  return (
    <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {j.stages.map((stage) => (
        <li
          key={stage.name}
          className="overflow-hidden rounded-lg border border-line bg-surface"
        >
          <div className="h-1.5 bg-accent" aria-hidden="true" />
          <div className="p-6">
            <h3 className="font-serif text-lg font-semibold leading-snug">
              {stage.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {stage.sub}
            </p>
            <p className="overline mb-1 mt-5 !text-accent">{j.fixedLabel}</p>
            <p className="text-sm leading-relaxed text-ink">{stage.fixed}</p>
            <p className="overline mb-1 mt-4 !text-danger">{j.missingLabel}</p>
            <p className="text-sm leading-relaxed text-muted">
              {stage.missing}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
