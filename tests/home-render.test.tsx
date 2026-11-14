// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { home } from "@/content/en/home";
import { method } from "@/content/en/method";
import { sampleMetrics } from "./fixtures";

// The main page, rendered whole under jsdom in the two states that matter:
// the figures feed answering, and the figures feed down. Either way the page
// is complete, and no "{token}" ever reaches a reader.

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root | null = null;

beforeEach(() => {
  // a fresh module graph, so the metrics cache from one test never leaks
  vi.resetModules();
  container = document.createElement("div");
  document.body.appendChild(container);
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

afterEach(async () => {
  const mounted = root;
  root = null;
  if (mounted) await act(async () => mounted.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function renderHome(): Promise<string> {
  const { default: HomePage } = await import("@/app/page");
  await act(async () => {
    const r = createRoot(container);
    root = r;
    r.render(<HomePage />);
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  return container.textContent ?? "";
}

function expectWholePage(text: string) {
  expect(text).toContain(home.hero.title);
  for (const p of home.hero.body) expect(text).toContain(p);
  expect(text).toContain(home.problem.title);
  expect(text).toContain(home.howItWorks.title);
  expect(text).toContain(method.intro);
  for (const s of method.steps) expect(text).toContain(s.caption);
  expect(text).toContain(home.results.title);
  expect(text).toContain(home.results.start);
  expect(text).toContain(home.results.limits.title);
  expect(text).toContain(home.corrections.title);
  for (const item of home.corrections.items) expect(text).toContain(item.title);
  expect(text).toContain(home.who.title);
  expect(text).toContain(home.who.ownership.body);
  expect(text).toContain(home.takePart.title);
  for (const d of home.takePart.doors) expect(text).toContain(d.title);
  expect(text).toContain(home.questions.title);
  for (const q of home.questions.items) expect(text).toContain(q.question);
  expect(text).not.toMatch(/\{\w+\}/);
  expect(text).not.toContain("NaN");
  expect(text).not.toContain("undefined");
}

describe("main page", () => {
  it("renders whole, with no figures and a plain note, when the feed is down", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new TypeError("network down"))),
    );
    const text = await renderHome();
    expectWholePage(text);
    expect(text).toContain(home.hero.result.fallback);
    expect(text).toContain(home.live.unavailableNote);
    expect(container.querySelector('[data-testid="result-row"]')).toBeNull();
    expect(container.querySelector('[data-testid="figures-stamp"]')).toBeNull();
  });

  it("fills the result line and draws ten marks when the feed answers", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(sampleMetrics()),
        }),
      ),
    );
    const text = await renderHome();
    expectWholePage(text);
    // from tests/fixtures.ts: 32 comparisons, 20 for the layer, 3 for the plain model
    expect(text).toContain(
      "Since October 8, 2026, Igala speakers have compared 32 pairs of answers",
    );
    expect(text).toContain("corrections 20 times, and the plain model's answer 3 times");
    expect(text).not.toContain(home.hero.result.fallback);
    const marks = container.querySelectorAll('[data-testid="result-row"] [data-mark]');
    expect(marks).toHaveLength(10);
    const kinds = [...marks].map((m) => m.getAttribute("data-mark"));
    // 20, 3, 5, 4 of 32 -> 6, 1, 2, 1 of ten
    expect(kinds.filter((k) => k === "first")).toHaveLength(6);
    expect(kinds.filter((k) => k === "second")).toHaveLength(1);
    expect(kinds.filter((k) => k === "draw")).toHaveLength(2);
    expect(kinds.filter((k) => k === "neither")).toHaveLength(1);
    // every count is printed beside its mark
    expect(text).toContain("20 preferred the answer with the language layer");
    expect(text).toContain("7 speakers made these judgments");
  });

  it("keeps the old home anchors alive as aliases on the new sections", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new TypeError("network down"))),
    );
    await renderHome();
    for (const id of ["overview", "project", "support", "faq", "how-it-works", "results", "take-part", "questions"]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });
});
