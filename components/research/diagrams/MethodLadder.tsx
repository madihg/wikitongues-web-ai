import type { NamedDetail } from "@/content/en/researchPage";

// The method ladder: three ascending rungs (benchmark, then SFT, then DPO)
// drawn as an inline-SVG staircase with a climbing connector, beside a legend
// and a separate "frozen exam" callout for the held-out set. Square-ish viewBox
// so it stays legible on a phone; rung names are short, detail lives in the
// legend.

const ACCENT = "var(--color-accent)";
const SURFACE = "var(--color-surface)";
const LINE = "var(--color-border-strong)";
const MUTED = "var(--color-text-muted)";
const INK = "var(--color-text-primary)";

// rect = the rung, badge = the numbered node on the climbing path
const RUNGS = [
  { rx: 16, ry: 200, rw: 100, rh: 80, bx: 66, by: 200, ny: 244 },
  { rx: 126, ry: 150, rw: 100, rh: 130, bx: 176, by: 150, ny: 196 },
  { rx: 236, ry: 100, rw: 100, rh: 180, bx: 286, by: 100, ny: 148 },
];

export function MethodLadder({
  rungs,
  heldOut,
}: {
  rungs: NamedDetail[];
  heldOut: { title: string; detail: string };
}) {
  const three = rungs.slice(0, 3);
  return (
    <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
      <svg
        viewBox="0 0 360 300"
        role="img"
        aria-label="Three ascending rungs - benchmark, then supervised fine-tuning, then preference tuning - climbed one at a time."
        className="mx-auto h-auto w-full max-w-sm"
      >
        <defs>
          <marker
            id="ml-arrow"
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

        {/* ground */}
        <line x1="8" y1="281" x2="348" y2="281" stroke={LINE} strokeWidth="1.5" />

        {/* rungs */}
        {RUNGS.map((r, i) => (
          <rect
            key={i}
            x={r.rx}
            y={r.ry}
            width={r.rw}
            height={r.rh}
            rx="8"
            fill={SURFACE}
            stroke={ACCENT}
            strokeWidth="2"
          />
        ))}

        {/* climbing connector through the rung tops */}
        <path
          d="M66 200 L176 150 L286 100"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#ml-arrow)"
        />

        {/* numbered nodes + rung names */}
        {RUNGS.map((r, i) => (
          <g key={i}>
            <circle cx={r.bx} cy={r.by} r="15" fill={ACCENT} />
            <text
              x={r.bx}
              y={r.by + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#ffffff"
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              {i + 1}
            </text>
            <text
              x={r.bx}
              y={r.ny}
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill={INK}
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              {three[i].name}
            </text>
          </g>
        ))}

        <text
          x="180"
          y="298"
          textAnchor="middle"
          fontSize="11"
          fill={MUTED}
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          one rung at a time
        </text>
      </svg>

      <div className="grid gap-5">
        <ol className="grid gap-3">
          {three.map((rung, i) => (
            <li key={rung.name} className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent font-sans text-xs font-semibold text-accent"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-ink">{rung.name}.</span>{" "}
                <span className="text-muted">{rung.detail}</span>
              </p>
            </li>
          ))}
        </ol>

        <div className="rounded-lg border border-accent bg-accent-subtle p-5">
          <div className="flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-accent"
            >
              <rect
                x="4"
                y="10"
                width="16"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h4 className="font-serif text-base font-semibold">
              {heldOut.title}
            </h4>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {heldOut.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
