// The four marks of a blind comparison, used on the main page and on the
// record. One mark is the point and takes the accent; the others are neutral
// and differ by shape, so a row reads without colour.

export type MarkKind = "first" | "second" | "draw" | "neither";

export function Mark({ kind, size = 24 }: { kind: MarkKind; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
      data-mark={kind}
    >
      {kind === "first" && (
        <circle cx={12} cy={12} r={10} fill="var(--wt-accent)" />
      )}
      {kind === "second" && (
        <circle cx={12} cy={12} r={10} fill="var(--wt-data-neutral)" />
      )}
      {(kind === "draw" || kind === "neither") && (
        <circle
          cx={12}
          cy={12}
          r={9}
          fill="var(--wt-surface)"
          stroke="var(--wt-line-control)"
          strokeWidth={2}
        />
      )}
      {kind === "draw" && (
        <path
          d="M7 12h10"
          stroke="var(--wt-ink-3)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
      {kind === "neither" && (
        <path
          d="M8.5 8.5l7 7M15.5 8.5l-7 7"
          stroke="var(--wt-ink-3)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
