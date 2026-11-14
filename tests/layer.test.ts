import { describe, expect, it } from "vitest";
import {
  FIRST_CURRENT_VERSION,
  fmtDay,
  layerVsPlain,
} from "@/components/record/layerVsPlain";
import { liveValues } from "@/components/record/liveValues";
import { sampleMetrics } from "./fixtures";

describe("the headline figure: plain model against the current language layer", () => {
  it("sums every judged round of plain against version 4.4 and later, whichever side the layer is on", () => {
    const r = layerVsPlain(sampleMetrics().humanRounds);
    // 2 + 20 (v4.4) + 10 (v4.5); version 3 and the head-to-head are left out
    expect(r.total).toBe(32);
    expect(r.layerWins).toBe(2 + 12 + 6);
    expect(r.plainWins).toBe(0 + 2 + 1);
    expect(r.draws).toBe(0 + 3 + 2);
    expect(r.neither).toBe(0 + 3 + 1);
    expect(r.layerWins + r.plainWins + r.draws + r.neither).toBe(r.total);
  });

  it("dates the figure from the earliest counted round", () => {
    const r = layerVsPlain(sampleMetrics().humanRounds);
    expect(r.since).toBe("2026-10-08T12:00:00.000Z");
    expect(fmtDay(r.since)).toBe("October 8, 2026");
    expect(fmtDay(null)).toBe("");
    expect(fmtDay("not a date")).toBe("");
  });

  it("counts nothing when no current version has been judged", () => {
    const older = sampleMetrics().humanRounds.slice(0, 1);
    expect(layerVsPlain(older).total).toBe(0);
    expect(layerVsPlain([]).since).toBeNull();
    expect(FIRST_CURRENT_VERSION).toBe(4.4);
  });

  it("feeds the main page's tokens", () => {
    const v = liveValues(sampleMetrics());
    expect(v.layerVsPlainTotal).toBe("32");
    expect(v.layerWins).toBe("20");
    expect(v.plainWins).toBe("3");
    expect(v.layerDraws).toBe("5");
    expect(v.layerNeither).toBe("4");
    expect(v.layerOther).toBe("9");
    expect(v.layerSince).toBe("October 8, 2026");
  });
});
