"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { method } from "@/content/en/method";
import { LoopStage } from "./LoopStage";

// The loop: the method in eight steps, as one animated diagram.
//
// How it behaves:
// - Before anything is pressed it shows the still: the whole loop, numbered.
// - It plays once on its own when most of it has been in view for half a
//   second, five seconds a step, then returns to the still.
// - Any press on a control stops the autoplay for the rest of the visit. From
//   then on the reader steps with the buttons, the arrow keys, or the list.
// - With reduced motion asked for it never plays: the reader steps through,
//   and each step appears in its end state at once.
// - Without JavaScript the page shows the still and the same eight steps as
//   text, which is also what a screen reader reads.
//
// The drawing is in LoopStage.tsx. All words are in content/en/method.ts.

const TOTAL = method.steps.length;
const STEP_MS = 5000;
const LAST_STEP_MS = 7000;

function initialStepFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("step");
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= TOTAL ? n : null;
}

export function MethodLoop() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  // True once the reader has pressed anything: autoplay never starts again,
  // and caption changes are announced to screen readers.
  const [userDriven, setUserDriven] = useState(false);
  const [finished, setFinished] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const autoStarted = useRef(false);
  const figureRef = useRef<HTMLDivElement>(null);

  // Read the reader's settings once the page is live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);

    // A link can open the diagram on a step: /?step=3#how-it-works
    const fromUrl = initialStepFromUrl();
    if (fromUrl !== null) {
      setStep(fromUrl);
      setUserDriven(true);
      autoStarted.current = true;
    }

    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener?.("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Is most of the diagram on screen?
  useEffect(() => {
    const el = figureRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start once, on its own, after half a second in view. Never with reduced
  // motion, never after a press, never while focus is inside the diagram.
  useEffect(() => {
    if (!inView || autoStarted.current || reduced || userDriven) return;
    const t = window.setTimeout(() => {
      if (autoStarted.current) return;
      if (figureRef.current?.contains(document.activeElement)) return;
      autoStarted.current = true;
      setStep(1);
      setPlaying(true);
    }, 500);
    return () => window.clearTimeout(t);
  }, [inView, reduced, userDriven]);

  // The clock. It runs only while playing, in view, and in a visible tab.
  useEffect(() => {
    if (!playing || !inView || !pageVisible || reduced) return;
    const t = window.setTimeout(
      () => {
        if (step >= TOTAL) {
          setStep(0);
          setPlaying(false);
          setFinished(true);
        } else {
          setStep(step + 1);
        }
      },
      step >= TOTAL ? LAST_STEP_MS : STEP_MS,
    );
    return () => window.clearTimeout(t);
  }, [playing, inView, pageVisible, reduced, step]);

  const goTo = useCallback((n: number) => {
    autoStarted.current = true;
    setUserDriven(true);
    setPlaying(false);
    setStep(Math.max(0, Math.min(TOTAL, n)));
  }, []);

  const togglePlay = useCallback(() => {
    autoStarted.current = true;
    setUserDriven(true);
    if (playing) {
      setPlaying(false);
      return;
    }
    setFinished(false);
    if (step === 0 || step >= TOTAL) setStep(1);
    setPlaying(true);
  }, [playing, step]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(step - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(1);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(TOTAL);
    }
  };

  const c = method.controls;
  const current = step > 0 ? method.steps[step - 1] : null;
  const position = current
    ? c.position.replace("{n}", String(step)).replace("{total}", String(TOTAL))
    : c.positionStill;
  const caption = current ? current.caption : method.stillCaption;

  const button =
    "inline-flex min-h-target min-w-target items-center justify-center gap-2 rounded-control border border-line-control bg-surface px-4 text-body font-semibold text-ink transition-colors duration-fast ease-wt hover:bg-sunken disabled:border-line-control disabled:bg-sunken disabled:text-ink-3";

  return (
    <div
      className="loop grid gap-8 lg:grid-cols-[minmax(0,35rem)_minmax(0,1fr)] lg:gap-12"
      data-step={step}
      data-reduced={reduced ? "true" : "false"}
      data-playing={playing ? "true" : "false"}
    >
      <div
        ref={figureRef}
        role="group"
        aria-label={method.listHeading}
        onKeyDown={onKeyDown}
        className="lg:sticky lg:top-[calc(var(--wt-header-h)+1.5rem)] lg:self-start"
      >
        <figure className="m-0">
          <div className="rounded-card border border-line bg-surface p-2 sm:p-4">
            <LoopStage step={step} />
          </div>
          <figcaption className="mt-4 min-h-[5.5rem]">
            <p className="text-small font-medium text-ink-3">{position}</p>
            <p
              className="mt-1 text-title font-semibold text-ink"
              style={{ fontFamily: "var(--wt-font-sans)" }}
              aria-live={userDriven ? "polite" : "off"}
              data-testid="loop-caption"
            >
              {current && <span>{current.name}. </span>}
              <span className={current ? "font-normal" : undefined}>
                {caption}
              </span>
            </p>
          </figcaption>
        </figure>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={button}
            onClick={() => goTo(step - 1)}
            disabled={step <= 0}
            aria-label={c.previous}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">{c.previous}</span>
          </button>

          {reduced ? (
            <span className="px-2 text-body font-medium text-ink-2">
              {c.stepThrough}
            </span>
          ) : (
            <button
              type="button"
              className={`${button} border-accent bg-accent text-on-accent hover:bg-accent-hover`}
              onClick={togglePlay}
              aria-label={
                playing ? c.pauseAria : finished ? c.again : c.playAria
              }
              data-testid="loop-play"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {playing ? (
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
                ) : (
                  <path d="M8 5l11 7-11 7z" fill="currentColor" />
                )}
              </svg>
              {playing
                ? c.pause
                : finished
                  ? c.again
                  : `${c.play}, ${c.playDuration}`}
            </button>
          )}

          <button
            type="button"
            className={button}
            onClick={() => goTo(step + 1)}
            disabled={step >= TOTAL}
            aria-label={c.next}
          >
            <span className="hidden sm:inline">{c.next}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h3 className="sr-only">{method.listHeading}</h3>
        <ol className="m-0 list-none divide-y divide-line border-y border-line p-0">
          {method.steps.map((s, i) => {
            const n = i + 1;
            const isCurrent = step === n;
            const rowStyle: CSSProperties | undefined = isCurrent
              ? { backgroundColor: "var(--wt-accent-tint)" }
              : undefined;
            return (
              <li key={s.name} style={rowStyle} className="px-3 py-4 sm:px-4">
                <button
                  type="button"
                  onClick={() => goTo(n)}
                  aria-current={isCurrent ? "step" : undefined}
                  className="flex w-full min-h-target-min items-start gap-3 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill text-small font-semibold ${
                      isCurrent
                        ? "bg-accent text-on-accent"
                        : "border border-line-control bg-surface text-ink"
                    }`}
                  >
                    {n}
                  </span>
                  <span>
                    <span className="sr-only">{`${n}. `}</span>
                    <span className="block text-body font-semibold text-ink">
                      {s.name}
                    </span>
                    <span className="block text-body text-ink">
                      {s.caption}
                    </span>
                  </span>
                </button>
                <p className="mt-2 pl-10 text-small text-ink-2">{s.note}</p>
                <p className="sr-only">{s.screenReader}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
