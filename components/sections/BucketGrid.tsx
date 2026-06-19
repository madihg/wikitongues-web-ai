import { getContent } from "@/lib/content";

// The eight evaluation dimensions as a numbered grid. Reused by the pitch and
// (optionally) the research explainer.
export function BucketGrid() {
  const { buckets } = getContent();
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {buckets.map((bucket) => (
        <li key={bucket.id} className="bg-surface p-5">
          <div className="flex items-baseline gap-3">
            <span
              className="font-serif text-2xl font-semibold text-accent"
              aria-hidden="true"
            >
              {String(bucket.index).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold">{bucket.name}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {bucket.gloss}
          </p>
        </li>
      ))}
    </ul>
  );
}
