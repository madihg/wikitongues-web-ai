// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HowItWorksPage from "@/app/how-it-works/page";
import { howItWorks as hw } from "@/content/en/howItWorks";

// The page's promise: when the method-metrics feed is down, every section
// still renders complete, with the explicit "live numbers unavailable" state -
// never a blank page, never a crash, never a literal "{token}" shown to a
// reader. These tests render the REAL page (server layout + client
// components) under jsdom with the fetch failing both ways it can fail:
// a rejected fetch (network down / CORS) and a non-ok HTTP response (404).

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
  vi.unstubAllGlobals();
});

async function renderPage(): Promise<string> {
  await act(async () => {
    root = createRoot(container);
    root.render(<HowItWorksPage />);
  });
  // one more macrotask so the fetch promise chain fully settles into state
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  return container.textContent ?? "";
}

function expectCompletePage(text: string) {
  // Hero and every section of the story is present.
  expect(text).toContain(hw.hero.title);
  expect(text).toContain(hw.hero.intro);
  expect(text).toContain(hw.system.title);
  expect(text).toContain(hw.journey.title);
  for (const stage of hw.journey.stages) expect(text).toContain(stage.name);
  expect(text).toContain(hw.assembly.title);
  for (const step of hw.assembly.steps) expect(text).toContain(step.title);
  expect(text).toContain(hw.prompts.title);
  expect(text).toContain(hw.benchmark.title);
  expect(text).toContain(hw.testedNow.title);
  for (const item of hw.testedNow.items) {
    expect(text).toContain(item.title);
    // the number-free fallback variant renders, not the {token} template
    expect(text).toContain(item.fallback);
  }
  expect(text).toContain(hw.changelog.title);
  for (const entry of hw.changelog.entries) {
    expect(text).toContain(entry.date);
    expect(text).toContain(entry.text);
  }
  // The explicit unavailable state is shown where numbers would have been
  // (the stat strip and the scoreboard both carry the note).
  const noteCount = text.split(hw.live.unavailableNote).length - 1;
  expect(noteCount).toBeGreaterThanOrEqual(2);
  // No template token ever reaches the reader unfilled.
  expect(text).not.toMatch(
    /\{(annotators|goldAnswers|lexEntries|parallelPairs|pairwiseComparisons|frozenPrompts|leakedPrompts|leakFreePrompts|poolComparisons|poolBothInadequatePct|noPreferencePct|ceilingChrf|honestCeilingChrfAll|shippedCeilingChrfAll|count)\}/,
  );
  // And nothing rendered as a broken number.
  expect(text).not.toContain("NaN");
  expect(text).not.toContain("undefined");
}

describe("how-it-works page under metrics-feed failure", () => {
  it("renders the complete page when the metrics fetch rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new TypeError("network down"))),
    );
    const text = await renderPage();
    expect(fetch).toHaveBeenCalledTimes(1);
    expectCompletePage(text);
  });

  it("renders the complete page when the metrics endpoint returns 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ error: "not found" }),
        }),
      ),
    );
    const text = await renderPage();
    expect(fetch).toHaveBeenCalledTimes(1);
    expectCompletePage(text);
  });
});
