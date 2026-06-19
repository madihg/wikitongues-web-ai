import { getContent } from "@/lib/content";
import { VisuallyHidden } from "@/components/primitives/VisuallyHidden";

// Pick a heat tint and a text colour that always clears AA contrast on it.
// Higher score -> darker teal. White text on the two darkest steps, near-black
// on the lighter three (the contrast crossover). Colour is never the only cue;
// the number is always present.
function cellStyle(score: number | undefined): {
  background: string;
  color: string;
} {
  if (score === undefined)
    return { background: "transparent", color: "var(--color-text-muted)" };
  if (score >= 55) return { background: "var(--viz-1)", color: "#ffffff" };
  if (score >= 45) return { background: "var(--viz-2)", color: "#ffffff" };
  if (score >= 35) return { background: "var(--viz-3)", color: "#1a1a1a" };
  if (score >= 25) return { background: "var(--viz-4)", color: "#1a1a1a" };
  return { background: "var(--viz-5)", color: "#1a1a1a" };
}

export function LeaderboardTable() {
  const { ui, buckets, leaderboard } = getContent();
  const lb = ui.leaderboard;

  return (
    <div>
      <p className="overline mb-3">{lb.overline}</p>
      <h3 className="text-2xl font-semibold md:text-3xl">{lb.title}</h3>
      <p className="mt-3 max-w-measure text-muted">{lb.intro}</p>

      {leaderboard.kind === "illustrative" && (
        <p
          role="note"
          className="mt-4 inline-flex rounded-md border border-line-strong bg-surface-sunken px-3 py-2 text-sm font-medium text-ink"
        >
          {leaderboard.note}
        </p>
      )}

      <div
        role="group"
        aria-label="Leaderboard table, scroll horizontally to see all dimensions"
        tabIndex={0}
        className="mt-6 overflow-x-auto rounded-lg border border-line"
      >
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            {`Wikitongues AI Igala benchmark. ${leaderboard.note} Columns 1 to 8 are the evaluation dimensions listed above.`}
          </caption>
          <thead>
            <tr className="bg-surface-sunken">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-surface-sunken px-4 py-3 text-left"
              >
                {lb.modelLabel}
              </th>
              {buckets.map((b) => (
                <th
                  key={b.id}
                  scope="col"
                  title={b.name}
                  className="px-3 py-3 text-center font-semibold"
                >
                  <span aria-hidden="true">{b.index}</span>
                  <VisuallyHidden>{b.name}</VisuallyHidden>
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-center">
                {lb.overallLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.rows.map((row) => (
              <tr key={row.model} className="border-t border-line">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface px-4 py-3 text-left font-semibold"
                >
                  {row.model}
                </th>
                {buckets.map((b) => {
                  const score = row.perBucket?.[b.id];
                  const s = cellStyle(score);
                  return (
                    <td
                      key={b.id}
                      className="px-3 py-3 text-center tabular-nums"
                      style={s}
                    >
                      {score ?? "-"}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center font-semibold tabular-nums">
                  {row.overall ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
