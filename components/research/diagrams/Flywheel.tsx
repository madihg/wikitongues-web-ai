import type { NamedDetail } from "@/content/en/researchPage";

// The data flywheel, drawn as a five-stage cycle. Genuine inline SVG (square
// viewBox, so it scales cleanly down to a phone), with the short stage names
// numbered on the wheel and the full descriptions in the legend beneath - so
// nothing on the wheel itself is ever too small to read.

const ACCENT = "var(--color-accent)";
const SURFACE = "var(--color-surface)";
const SUBTLE = "var(--color-accent-subtle)";
const MUTED = "var(--color-text-muted)";

// Precomputed node centres (radius 150 from centre 220,220, starting at top,
// clockwise) and the trimmed clockwise arcs that connect them (radius 118).
const NODES: Array<{ x: number; y: number }> = [
  { x: 220, y: 70 },
  { x: 362.7, y: 173.7 },
  { x: 308.2, y: 341.4 },
  { x: 131.8, y: 341.4 },
  { x: 77.3, y: 173.7 },
];

const ARCS: string[] = [
  "M244.5 104.6 A118 118 0 0 1 322.2 161.0",
  "M337.4 207.7 A118 118 0 0 1 307.7 299.0",
  "M268.0 327.8 A118 118 0 0 1 172.0 327.8",
  "M132.3 299.0 A118 118 0 0 1 102.7 207.7",
  "M117.8 161.0 A118 118 0 0 1 195.5 104.6",
];

export function Flywheel({ stages }: { stages: NamedDetail[] }) {
  const nodes = stages.slice(0, 5);
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
      <svg
        viewBox="0 0 440 440"
        role="img"
        aria-label="A five-stage cycle: community gold, fine-tuning, blind arena, a better model, and back to the community."
        className="mx-auto h-auto w-full max-w-sm"
      >
        <defs>
          <marker
            id="fw-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill={ACCENT} />
          </marker>
        </defs>

        {/* connecting arcs */}
        {ARCS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
            markerEnd="url(#fw-arrow)"
          />
        ))}

        {/* hub */}
        <circle cx="220" cy="220" r="52" fill={SUBTLE} />
        <text
          x="220"
          y="214"
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill={ACCENT}
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          The
        </text>
        <text
          x="220"
          y="233"
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill={ACCENT}
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          flywheel
        </text>

        {/* stage nodes */}
        {NODES.slice(0, nodes.length).map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="30"
              fill={SURFACE}
              stroke={ACCENT}
              strokeWidth="2"
            />
            <text
              x={n.x}
              y={n.y + 6}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill={ACCENT}
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              {i + 1}
            </text>
          </g>
        ))}

        <text
          x="220"
          y="432"
          textAnchor="middle"
          fontSize="11"
          fill={MUTED}
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          each turn raises the floor
        </text>
      </svg>

      <ol className="grid gap-3">
        {nodes.map((_, i) => (
          <li key={stages[i].name} className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent font-sans text-xs font-semibold text-accent"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-ink">{stages[i].name}.</span>{" "}
              <span className="text-muted">{stages[i].detail}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
