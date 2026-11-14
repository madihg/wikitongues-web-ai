import type { CSSProperties, ReactNode } from "react";
import { method } from "@/content/en/method";

// The drawing of the loop. One SVG, 360 by 400, the same at every width.
//
// The question (the card with a question mark) sits on the table between
// the two models. The speaker's own answer lands to the speaker's left.
//
// Five places never move: the two models (top), the table between them, the
// speaker (middle), the picks, and the language layer (bottom). Every other
// part is a card or a mark whose position and visibility depend only on the
// step, so a step is a pure function of one number and can be rendered on
// the server, tested, and shown without motion.
//
// Only transform and opacity change between steps, which a low-end phone can
// animate. The transitions are in app/globals.css under ".loop-part".
//
// Nothing here depends on colour alone: mistakes are wavy underlines, a pick
// is a ring with a tick, a rule is a square where a speaker's row is a dot.
// The SVG is hidden from screen readers; the same content is in the list.

const L = method.labels;

// Fixed points, in SVG units.
const MODEL_A = { x: 38, y: 32 };
const MODEL_B = { x: 322, y: 32 };
const Q_HOME = { x: 180, y: 100 };
const SLOT_L = { x: 70, y: 119 };
const SLOT_R = { x: 290, y: 119 };
const SPEAKER = { x: 180, y: 196 };
const OWN_HOME = { x: 62, y: 200 };
const ROW_Y = [296, 322, 348];
const PICK_DOT = { x: 312, y: 210 };

function place(x: number, y: number, scale = 1): string {
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

function Part({
  transform,
  opacity,
  delay = 0,
  children,
}: {
  transform?: string;
  opacity: number;
  delay?: number;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    transform,
    opacity,
    transitionDelay: `${delay}ms`,
  };
  return (
    <g className="loop-part" style={style}>
      {children}
    </g>
  );
}

function wavy(x: number, y: number, bumps: number): string {
  let d = `M${x} ${y} q3 -4 6 0`;
  for (let i = 1; i < bumps; i++) d += " t6 0";
  return d;
}

const BAR_Y = [-14, 2, 18];
const BAR_W = [76, 62, 48];

/** An answer card, drawn around its own centre. `mistakes` lists which of
 * its three lines carry a wavy underline. */
function AnswerCard({
  mistakes,
  children,
}: {
  mistakes: number[];
  children?: ReactNode;
}) {
  return (
    <>
      <rect
        x={-50}
        y={-35}
        width={100}
        height={70}
        rx={8}
        fill="var(--wt-surface)"
        stroke="var(--wt-line-control)"
        strokeWidth={1.5}
      />
      {BAR_Y.map((y, i) => (
        <rect
          key={y}
          x={-38}
          y={y}
          width={BAR_W[i]}
          height={6}
          rx={3}
          fill="var(--wt-data-neutral)"
        />
      ))}
      {mistakes.map((i) => (
        <path
          key={i}
          d={wavy(-38, BAR_Y[i] + 11, Math.floor(BAR_W[i] / 9))}
          fill="none"
          stroke="var(--wt-danger)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
      {children}
    </>
  );
}

function PickRing() {
  return (
    <>
      <circle
        r={11}
        fill="var(--wt-surface)"
        stroke="var(--wt-accent)"
        strokeWidth={2.5}
      />
      <path
        d="M-5 0.5l3.5 3.5 6.5 -7.5"
        fill="none"
        stroke="var(--wt-accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function Person({ fill }: { fill: string }) {
  return (
    <>
      <circle cx={0} cy={-9} r={9} fill={fill} />
      <path d="M-18 20a18 17 0 0 1 36 0z" fill={fill} />
    </>
  );
}

function QuestionCard() {
  return (
    <>
      <rect
        x={-22}
        y={-15}
        width={44}
        height={30}
        rx={6}
        fill="var(--wt-surface)"
        stroke="var(--wt-ink-2)"
        strokeWidth={1.5}
      />
      <text
        x={0}
        y={6}
        textAnchor="middle"
        className="loop-text"
        style={{ fontWeight: 600, fontSize: 16 }}
      >
        ?
      </text>
    </>
  );
}

function WaveCard({ withPlay = false }: { withPlay?: boolean }) {
  const heights = [6, 14, 22, 12, 26, 16, 8, 18, 10];
  const start = withPlay ? -12 : -25;
  return (
    <>
      <rect
        x={-32}
        y={-17}
        width={64}
        height={34}
        rx={6}
        fill="var(--wt-surface)"
        stroke="var(--wt-ink-2)"
        strokeWidth={1.5}
      />
      {withPlay && <path d="M-24 -7l10 7 -10 7z" fill="var(--wt-ink)" />}
      {heights.slice(0, withPlay ? 7 : 9).map((h, i) => (
        <rect
          key={i}
          x={start + i * 6}
          y={-h / 2}
          width={3}
          height={h}
          rx={1.5}
          fill="var(--wt-ink-2)"
        />
      ))}
    </>
  );
}

function Badge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={10} fill="var(--wt-ink-2)" />
      <text
        x={0}
        y={5}
        textAnchor="middle"
        className="loop-text"
        style={{ fill: "var(--wt-paper)", fontWeight: 600 }}
      >
        {n}
      </text>
    </g>
  );
}

export function LoopStage({ step }: { step: number }) {
  const s = step;
  const blind = s === 3 || s === 4 || s === 6 || s === 7;
  const blindDelay = s === 6 ? 1100 : 0;
  const speech = s === 8;

  // Where each moving part is, by step.
  // The question sits on the table from the still to the end of the first pass.
  const q1 = s <= 5;
  const own =
    s === 0
      ? { t: place(SPEAKER.x, SPEAKER.y, 0.4), o: 0 }
      : s <= 4
        ? { t: place(OWN_HOME.x, OWN_HOME.y), o: s === 1 ? 1 : 0.45 }
        : { t: place(136, ROW_Y[0], 0.3), o: 0 };
  const firstPass = s >= 2 && s <= 4;
  const left1 =
    s < 2
      ? { t: place(MODEL_A.x, MODEL_A.y, 0.3), o: 0 }
      : s <= 4
        ? { t: place(SLOT_L.x, SLOT_L.y), o: 1 }
        : { t: place(136, ROW_Y[1], 0.3), o: 0 };
  const right1 =
    s < 2
      ? { t: place(MODEL_B.x, MODEL_B.y, 0.3), o: 0 }
      : { t: place(SLOT_R.x, SLOT_R.y), o: s <= 3 ? 1 : s === 4 ? 0.35 : 0 };
  const corrected = s >= 4;
  const kept = s >= 5;
  const secondPass = s === 6 || s === 7;
  const q2 = s === 6 || s === 7;

  return (
    <svg
      viewBox="0 0 360 400"
      className="block h-auto w-full"
      aria-hidden="true"
      focusable="false"
      data-testid="loop-stage"
    >
      <defs>
        <marker
          id="loop-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0l10 5 -10 5z" fill="var(--wt-ink-3)" />
        </marker>
      </defs>

      {/* ── The five fixed places ─────────────────────────────── */}

      {/* Models */}
      {[
        { at: MODEL_A, letter: "A", label: L.modelA, anchor: "start", lx: 64 },
        { at: MODEL_B, letter: "B", label: L.modelB, anchor: "end", lx: 296 },
      ].map((m) => (
        <g key={m.letter}>
          <rect
            x={m.at.x - 18}
            y={m.at.y - 18}
            width={36}
            height={36}
            rx={8}
            fill="var(--wt-sunken)"
            stroke="var(--wt-ink-2)"
            strokeWidth={1.5}
          />
          <Part opacity={blind ? 0 : 1} delay={blindDelay}>
            <text
              x={m.at.x}
              y={m.at.y + 6}
              textAnchor="middle"
              className="loop-text"
              style={{ fontWeight: 600, fontSize: 16 }}
            >
              {m.letter}
            </text>
            <text
              x={m.lx}
              y={m.at.y + 5}
              textAnchor={m.anchor as "start" | "end"}
              className="loop-text"
            >
              {m.label}
            </text>
          </Part>
          <Part opacity={blind ? 1 : 0} delay={blindDelay}>
            <text
              x={m.at.x}
              y={m.at.y + 6}
              textAnchor="middle"
              className="loop-text"
              style={{ fontWeight: 600, fontSize: 16 }}
            >
              ?
            </text>
            <text
              x={m.lx}
              y={m.at.y + 5}
              textAnchor={m.anchor as "start" | "end"}
              className="loop-text"
              style={{ fill: "var(--wt-ink-3)" }}
            >
              {L.hidden}
            </text>
          </Part>
        </g>
      ))}

      {/* The table: three empty slots where cards land */}
      {[
        { x: 20, y: 84, w: 100, h: 70, r: 8, show: true },
        { x: 240, y: 84, w: 100, h: 70, r: 8, show: true },
        { x: 158, y: 85, w: 44, h: 30, r: 6, show: true },
        // where the speaker's own answer lands; in the speech step a second
        // speaker stands here instead
        { x: 24, y: 176, w: 76, h: 48, r: 8, show: !speech },
      ].map((b) => (
        <Part key={`${b.x}-${b.y}`} opacity={b.show ? 1 : 0}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={b.r}
            fill="none"
            stroke="var(--wt-line-control)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        </Part>
      ))}

      {/* Speaker */}
      <g transform={`translate(${SPEAKER.x} ${SPEAKER.y})`}>
        <Person fill="var(--wt-ink)" />
      </g>
      <text x={SPEAKER.x} y={236} textAnchor="middle" className="loop-text">
        {L.speaker}
      </text>

      {/* Picks */}
      <text x={236} y={192} className="loop-text" style={{ fontWeight: 600 }}>
        {L.picks}
      </text>
      {[
        { y: 210, label: L.withLayer },
        { y: 230, label: L.without },
      ].map((row) => (
        <g key={row.label}>
          <text
            x={236}
            y={row.y + 5}
            className="loop-text"
            style={{ fill: "var(--wt-ink-2)" }}
          >
            {row.label}
          </text>
          {[312, 326, 340].map((x) => (
            <circle
              key={x}
              cx={x}
              cy={row.y}
              r={5}
              fill="var(--wt-surface)"
              stroke="var(--wt-line-control)"
              strokeWidth={1.5}
            />
          ))}
        </g>
      ))}

      {/* Language layer */}
      <rect
        x={20}
        y={252}
        width={320}
        height={134}
        rx={12}
        fill="var(--wt-sunken)"
        stroke="var(--wt-line-control)"
        strokeWidth={1}
      />
      <text x={34} y={276} className="loop-text" style={{ fontWeight: 600 }}>
        {L.layer}
      </text>

      {/* ── The still: the whole loop, numbered ───────────────── */}
      <Part opacity={s === 0 ? 1 : 0}>
        <g
          fill="none"
          stroke="var(--wt-ink-3)"
          strokeWidth={1.5}
          markerEnd="url(#loop-arrow)"
        >
          <path d="M38 54V80" />
          <path d="M322 54V80" />
          <path d="M112 158V248" />
          <path d="M340 300H348V32H344" />
          <path d="M290 158V176" />
        </g>
        <Badge n={1} x={62} y={200} />
        <Badge n={2} x={38} y={67} />
        <Badge n={2} x={322} y={67} />
        <Badge n={3} x={104} y={100} />
        <Badge n={4} x={104} y={138} />
        <Badge n={5} x={112} y={204} />
        <Badge n={6} x={348} y={150} />
        <Badge n={7} x={290} y={167} />
        <Badge n={8} x={212} y={190} />
      </Part>

      {/* ── First pass: steps 1 to 5 ──────────────────────────── */}

      {/* Lines from each model to its answer, while the names are known */}
      <Part opacity={s === 2 ? 1 : 0} delay={s === 2 ? 300 : 0}>
        <g stroke="var(--wt-ink-3)" strokeWidth={1.5}>
          <path d="M38 52V82" />
          <path d="M322 52V82" />
        </g>
      </Part>

      {/* The question */}
      <Part
        transform={place(Q_HOME.x, Q_HOME.y)}
        opacity={q1 ? 1 : 0}
      >
        <QuestionCard />
      </Part>

      {/* A copy of the question reaches each model */}
      {[MODEL_A, MODEL_B].map((m, i) => (
        <Part
          key={`copy1-${i}`}
          transform={
            s < 2
              ? place(Q_HOME.x, Q_HOME.y)
              : place(m.x + (i === 0 ? 18 : -18), m.y - 18)
          }
          opacity={firstPass ? 1 : 0}
        >
          <circle r={5} fill="var(--wt-ink-2)" />
        </Part>
      ))}

      {/* The speaker's own answer */}
      <Part transform={own.t} opacity={own.o}>
        <rect
          x={-38}
          y={-24}
          width={76}
          height={48}
          rx={8}
          fill="var(--wt-surface)"
          stroke="var(--wt-ink)"
          strokeWidth={1.5}
        />
        <circle cx={-26} cy={-12} r={4} fill="var(--wt-ink)" />
        <rect x={-16} y={-15} width={44} height={6} rx={3} fill="var(--wt-ink-2)" />
        <rect x={-28} y={-2} width={56} height={6} rx={3} fill="var(--wt-ink-2)" />
        <rect x={-28} y={11} width={40} height={6} rx={3} fill="var(--wt-ink-2)" />
      </Part>

      {/* Right answer, first pass: not picked */}
      <Part
        transform={right1.t}
        opacity={right1.o}
        delay={s === 2 ? 300 : 0}
      >
        <AnswerCard mistakes={[0, 1, 2]} />
      </Part>

      {/* Left answer, first pass: picked, then corrected */}
      <Part transform={left1.t} opacity={left1.o} delay={s === 2 ? 300 : s === 5 ? 150 : 0}>
        <AnswerCard mistakes={corrected ? [2] : [0, 2]}>
          <Part opacity={corrected ? 1 : 0}>
            <path
              d="M-40 -11H40"
              stroke="var(--wt-danger)"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <rect
              x={-38}
              y={-28}
              width={70}
              height={6}
              rx={3}
              fill="var(--wt-success)"
            />
            <rect
              x={10}
              y={18}
              width={40}
              height={22}
              rx={11}
              fill="var(--wt-surface)"
              stroke="var(--wt-ink-2)"
              strokeWidth={1.5}
            />
            <text x={30} y={34} textAnchor="middle" className="loop-text">
              {L.why}
            </text>
          </Part>
          <Part opacity={s === 3 || s === 4 ? 1 : 0}>
            <g transform="translate(44 -31)">
              <PickRing />
            </g>
          </Part>
        </AnswerCard>
      </Part>

      {/* What the language layer holds */}
      {[
        { label: L.rowAnswer, mark: "dot", delay: 400 },
        { label: L.rowCorrection, mark: "dot", delay: 550 },
        { label: L.rowRule, mark: "square", delay: 750 },
      ].map((row, i) => (
        <Part
          key={row.label}
          transform={
            kept || row.mark === "dot" ? place(0, 0) : place(-30, 0)
          }
          opacity={kept ? 1 : 0}
          delay={s === 5 ? row.delay : 0}
        >
          {row.mark === "dot" ? (
            <circle cx={40} cy={ROW_Y[i]} r={4} fill="var(--wt-ink)" />
          ) : (
            <rect
              x={36}
              y={ROW_Y[i] - 4}
              width={8}
              height={8}
              fill="var(--wt-ink)"
            />
          )}
          <rect
            x={52}
            y={ROW_Y[i] - 4}
            width={i === 2 ? 130 : 170}
            height={8}
            rx={4}
            fill={i === 1 ? "var(--wt-success)" : "var(--wt-data-neutral)"}
          />
          <text
            x={326}
            y={ROW_Y[i] + 5}
            textAnchor="end"
            className="loop-text"
            style={{ fill: "var(--wt-ink-2)" }}
          >
            {row.label}
          </text>
        </Part>
      ))}

      {/* ── Second pass: steps 6 and 7 ────────────────────────── */}

      <Part
        transform={s < 6 ? place(Q_HOME.x, Q_HOME.y, 0.6) : place(Q_HOME.x, Q_HOME.y)}
        opacity={q2 ? 1 : 0}
      >
        <QuestionCard />
      </Part>

      {[MODEL_A, MODEL_B].map((m, i) => (
        <Part
          key={`copy2-${i}`}
          transform={
            s < 6
              ? place(Q_HOME.x, Q_HOME.y)
              : place(m.x + (i === 0 ? 18 : -18), m.y - 18)
          }
          opacity={secondPass ? 1 : 0}
          delay={s === 6 ? 350 : 0}
        >
          <circle r={5} fill="var(--wt-ink-2)" />
        </Part>
      ))}

      {/* Pieces of the layer travel with the question to one model */}
      <Part
        transform={s < 6 ? place(136, 309) : place(276, 62)}
        opacity={secondPass ? 1 : 0}
        delay={s === 6 ? 350 : 0}
      >
        <rect
          x={-20}
          y={-11}
          width={40}
          height={22}
          rx={5}
          fill="var(--wt-surface)"
          stroke="var(--wt-ink-2)"
          strokeWidth={1.5}
        />
        <circle cx={-12} cy={-4} r={2.5} fill="var(--wt-ink)" />
        <rect x={-7} y={-6.5} width={20} height={5} rx={2.5} fill="var(--wt-data-neutral)" />
        <circle cx={-12} cy={4} r={2.5} fill="var(--wt-ink)" />
        <rect x={-7} y={1.5} width={20} height={5} rx={2.5} fill="var(--wt-success)" />
      </Part>

      <Part
        transform={
          s < 6 ? place(MODEL_A.x, MODEL_A.y, 0.3) : place(SLOT_L.x, SLOT_L.y)
        }
        opacity={secondPass ? 1 : 0}
        delay={s === 6 ? 750 : 0}
      >
        <AnswerCard mistakes={[0, 1, 2]} />
      </Part>
      <Part
        transform={
          s < 6 ? place(MODEL_B.x, MODEL_B.y, 0.3) : place(SLOT_R.x, SLOT_R.y)
        }
        opacity={secondPass ? 1 : 0}
        delay={s === 6 ? 750 : 0}
      >
        <AnswerCard mistakes={[1]} />
      </Part>

      {/* The second pick: lands on the cleaner answer, then is counted */}
      <Part
        transform={
          s <= 6 ? place(SLOT_R.x + 44, SLOT_R.y - 31) : place(PICK_DOT.x, PICK_DOT.y, 0.5)
        }
        opacity={s === 6 ? 1 : 0}
        delay={s === 6 ? 1300 : 0}
      >
        <PickRing />
      </Part>
      <Part opacity={s >= 7 ? 1 : 0} delay={s === 7 ? 450 : 0}>
        <circle cx={PICK_DOT.x} cy={PICK_DOT.y} r={5} fill="var(--wt-accent)" />
      </Part>

      {/* ── Speech: step 8 ────────────────────────────────────── */}

      <Part transform={place(Q_HOME.x, Q_HOME.y)} opacity={speech ? 1 : 0}>
        <WaveCard />
      </Part>
      <Part opacity={speech ? 1 : 0} delay={speech ? 200 : 0}>
        <circle cx={153} cy={137} r={6} fill="var(--wt-danger-fill)" />
        <text x={164} y={142} className="loop-text">
          {L.record}
        </text>
      </Part>

      <Part opacity={speech ? 1 : 0} delay={speech ? 800 : 0}>
        <g transform="translate(62 196)">
          <Person fill="var(--wt-ink-2)" />
        </g>
        <text x={62} y={236} textAnchor="middle" className="loop-text">
          {L.check}
        </text>
      </Part>
      <Part opacity={speech ? 1 : 0} delay={speech ? 1000 : 0}>
        <g transform="translate(212 84)">
          <PickRing />
        </g>
      </Part>

      <Part
        transform={
          speech ? place(SLOT_R.x, SLOT_R.y) : place(MODEL_B.x, MODEL_B.y, 0.3)
        }
        opacity={speech ? 1 : 0}
        delay={speech ? 1500 : 0}
      >
        <WaveCard withPlay />
      </Part>
      <Part opacity={speech ? 1 : 0} delay={speech ? 1500 : 0}>
        <text x={290} y={172} textAnchor="middle" className="loop-text">
          {L.listen}
        </text>
      </Part>
    </svg>
  );
}
