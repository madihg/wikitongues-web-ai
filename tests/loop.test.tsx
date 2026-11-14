// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MethodLoop } from "@/components/method/MethodLoop";
import { LoopStage } from "@/components/method/LoopStage";
import { method } from "@/content/en/method";

// The loop diagram, driven the way a reader drives it: buttons, the list,
// the keyboard, the clock. jsdom has no layout, so "in view" is simulated by
// a fake IntersectionObserver the test controls.

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root | null = null;
let reducedMotion = false;
let observers: Array<(ratio: number) => void> = [];

function setup() {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      cb: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
        observers.push((ratio) =>
          cb([{ intersectionRatio: ratio } as IntersectionObserverEntry], this as unknown as IntersectionObserver),
        );
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
  window.matchMedia = ((query: string) => ({
    matches: query.includes("reduce") ? reducedMotion : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

async function render() {
  await act(async () => {
    const r = createRoot(container);
    root = r;
    r.render(<MethodLoop />);
  });
}

const step = () => container.querySelector(".loop")?.getAttribute("data-step");
const byLabel = (label: string) =>
  container.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
const caption = () =>
  container.querySelector('[data-testid="loop-caption"]')?.textContent ?? "";
const current = () =>
  container.querySelector('[aria-current="step"]')?.textContent ?? "";

async function click(el: Element | null) {
  expect(el).not.toBeNull();
  await act(async () => {
    (el as HTMLElement).click();
  });
}

async function key(k: string) {
  await act(async () => {
    container
      .querySelector('[role="group"]')
      ?.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
  });
}

beforeEach(() => {
  reducedMotion = false;
  window.history.replaceState(null, "", "/");
  container = document.createElement("div");
  document.body.appendChild(container);
  setup();
});

afterEach(async () => {
  const mounted = root;
  root = null;
  if (mounted) await act(async () => mounted.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("the loop diagram", () => {
  it("renders the numbered still and all eight steps as text, with no JavaScript at all", () => {
    const html = renderToStaticMarkup(<MethodLoop />);
    expect(html).toContain('data-step="0"');
    expect(html).toContain(method.stillCaption);
    for (const s of method.steps) {
      expect(html).toContain(s.name);
      expect(html).toContain(s.caption.replace(/'/g, "&#x27;"));
      expect(html).toContain(s.note.replace(/'/g, "&#x27;"));
      expect(html).toContain(s.screenReader.replace(/'/g, "&#x27;"));
    }
    // the drawing is hidden from screen readers: the list carries the content
    expect(html).toContain('aria-hidden="true"');
  });

  it("starts on the still, with Previous disabled", async () => {
    await render();
    expect(step()).toBe("0");
    expect(caption()).toContain(method.stillCaption);
    expect(byLabel(method.controls.previous)?.disabled).toBe(true);
    expect(byLabel(method.controls.next)?.disabled).toBe(false);
    expect(container.querySelector('[aria-current="step"]')).toBeNull();
  });

  it("steps forward and back with the buttons, moving the caption and the current item", async () => {
    await render();
    await click(byLabel(method.controls.next));
    expect(step()).toBe("1");
    expect(caption()).toContain(method.steps[0].caption);
    expect(current()).toContain(method.steps[0].name);
    await click(byLabel(method.controls.next));
    expect(step()).toBe("2");
    expect(current()).toContain(method.steps[1].name);
    await click(byLabel(method.controls.previous));
    expect(step()).toBe("1");
  });

  it("stops at the last step: Next is disabled on step 8", async () => {
    await render();
    await key("End");
    expect(step()).toBe("8");
    expect(byLabel(method.controls.next)?.disabled).toBe(true);
    await key("ArrowRight");
    expect(step()).toBe("8");
  });

  it("answers the keyboard: arrows, Home and End", async () => {
    await render();
    await key("ArrowRight");
    await key("ArrowRight");
    await key("ArrowRight");
    expect(step()).toBe("3");
    await key("ArrowLeft");
    expect(step()).toBe("2");
    await key("Home");
    expect(step()).toBe("1");
    await key("End");
    expect(step()).toBe("8");
  });

  it("jumps to a step when its item in the list is pressed", async () => {
    await render();
    const items = container.querySelectorAll("ol > li > button");
    expect(items).toHaveLength(8);
    await click(items[4]);
    expect(step()).toBe("5");
    expect(caption()).toContain(method.steps[4].caption);
  });

  it("announces the caption only once the reader is driving", async () => {
    await render();
    const live = () =>
      container.querySelector('[data-testid="loop-caption"]')?.getAttribute("aria-live");
    expect(live()).toBe("off");
    await click(byLabel(method.controls.next));
    expect(live()).toBe("polite");
  });

  it("plays once on its own when in view, five seconds a step, then returns to the still", async () => {
    vi.useFakeTimers();
    await render();
    expect(step()).toBe("0");
    await act(async () => observers.forEach((o) => o(0.8)));
    await act(async () => vi.advanceTimersByTime(600));
    expect(step()).toBe("1");
    for (let n = 2; n <= 8; n++) {
      await act(async () => vi.advanceTimersByTime(5000));
      expect(step()).toBe(String(n));
    }
    await act(async () => vi.advanceTimersByTime(7000));
    expect(step()).toBe("0");
    expect(container.querySelector('[data-testid="loop-play"]')?.textContent).toContain(
      method.controls.again,
    );
    // it does not start again by itself
    await act(async () => vi.advanceTimersByTime(20000));
    expect(step()).toBe("0");
  });

  it("stops the autoplay for good as soon as the reader presses a control", async () => {
    vi.useFakeTimers();
    await render();
    await act(async () => observers.forEach((o) => o(0.8)));
    await act(async () => vi.advanceTimersByTime(600));
    expect(step()).toBe("1");
    await click(byLabel(method.controls.next));
    expect(step()).toBe("2");
    await act(async () => vi.advanceTimersByTime(30000));
    expect(step()).toBe("2");
  });

  it("pauses while it is out of view and carries on when it comes back", async () => {
    vi.useFakeTimers();
    await render();
    await act(async () => observers.forEach((o) => o(0.8)));
    await act(async () => vi.advanceTimersByTime(600));
    await act(async () => observers.forEach((o) => o(0.1)));
    await act(async () => vi.advanceTimersByTime(30000));
    expect(step()).toBe("1");
    await act(async () => observers.forEach((o) => o(0.9)));
    await act(async () => vi.advanceTimersByTime(5000));
    expect(step()).toBe("2");
  });

  it("never plays with reduced motion: no play button, no clock, manual steps still work", async () => {
    reducedMotion = true;
    vi.useFakeTimers();
    await render();
    expect(container.querySelector(".loop")?.getAttribute("data-reduced")).toBe("true");
    expect(container.querySelector('[data-testid="loop-play"]')).toBeNull();
    expect(container.textContent).toContain(method.controls.stepThrough);
    await act(async () => observers.forEach((o) => o(1)));
    await act(async () => vi.advanceTimersByTime(60000));
    expect(step()).toBe("0");
    await click(byLabel(method.controls.next));
    expect(step()).toBe("1");
  });

  it("opens on a step named in the link, and does not autoplay from there", async () => {
    window.history.replaceState(null, "", "/?step=6");
    vi.useFakeTimers();
    await render();
    expect(step()).toBe("6");
    await act(async () => observers.forEach((o) => o(1)));
    await act(async () => vi.advanceTimersByTime(30000));
    expect(step()).toBe("6");
  });

  it("draws every step from the step number alone, in text no smaller than 14 units", () => {
    for (let n = 0; n <= 8; n++) {
      const html = renderToStaticMarkup(<LoopStage step={n} />);
      expect(html).toContain('viewBox="0 0 360 400"');
      for (const m of html.matchAll(/font-size:(\d+)px/g)) {
        expect(Number(m[1])).toBeGreaterThanOrEqual(14);
      }
    }
    // the model names are hidden exactly while the speaker judges
    const hidden = (n: number) =>
      /opacity:1[^>]*>(?:(?!<\/g>).)*Hidden/s.test(renderToStaticMarkup(<LoopStage step={n} />));
    expect(hidden(2)).toBe(false);
    expect(hidden(3)).toBe(true);
    expect(hidden(4)).toBe(true);
    expect(hidden(5)).toBe(false);
    expect(hidden(6)).toBe(true);
  });
});
