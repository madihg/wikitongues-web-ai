import { describe, it, expect } from "vitest";
import { researchPage } from "@/content/en/researchPage";
import { ui } from "@/content/en/site";
import { statsApi } from "@/content/config";

describe("research page content", () => {
  it("has the four-step episode, five-stage flywheel, and three-rung ladder the diagrams expect", () => {
    expect(researchPage.how.episode.steps).toHaveLength(4);
    expect(researchPage.how.flywheel.stages).toHaveLength(5);
    expect(researchPage.how.ladder.rungs).toHaveLength(3);
    for (const s of researchPage.how.episode.steps) {
      expect(s.title.trim().length).toBeGreaterThan(0);
      expect(s.detail.trim().length).toBeGreaterThan(0);
    }
    for (const s of researchPage.how.flywheel.stages) {
      expect(s.name.trim().length).toBeGreaterThan(0);
      expect(s.detail.trim().length).toBeGreaterThan(0);
    }
    for (const r of researchPage.how.ladder.rungs) {
      expect(r.name.trim().length).toBeGreaterThan(0);
    }
    expect(researchPage.how.ladder.heldOut.detail.trim().length).toBeGreaterThan(
      0,
    );
  });

  it("titles the page 'Research' and gives it three findings and three next steps", () => {
    expect(researchPage.meta.title).toBe("Research");
    expect(researchPage.learned.findings).toHaveLength(3);
    expect(researchPage.next.items).toHaveLength(3);
  });

  it("keeps a sane fallback snapshot for when the live fetch fails", () => {
    const fb = researchPage.fallbackStats;
    expect(fb.bothInadequateRate).toBeGreaterThan(0);
    expect(fb.bothInadequateRate).toBeLessThanOrEqual(1);
    expect(fb.promptsTotal).toBeGreaterThan(0);
    expect(fb.purity.after).toBeLessThan(fb.purity.before);
  });

  it("obeys the house style: no em or en dashes in the copy", () => {
    const serialized = JSON.stringify(researchPage);
    expect(serialized).not.toContain("—"); // em dash
    expect(serialized).not.toContain("–"); // en dash
  });

  it("wires the nav 'Research' link to the dedicated /research page", () => {
    const research = ui.nav.find((n) => n.label === "Research");
    expect(research?.href).toBe("/research/");
    // all nav hrefs are root-relative so they work from any page
    for (const item of ui.nav) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });

  it("resolves an absolute stats API URL for the client fetch", () => {
    expect(() => new URL(statsApi.url)).not.toThrow();
    expect(statsApi.url).toContain("/api/public/stats");
  });
});
