import { describe, it, expect } from "vitest";
import { buckets } from "@/content/en/buckets";
import { timeline } from "@/content/en/timeline";
import { research } from "@/content/en/research";
import { faq } from "@/content/en/faq";
import { leaderboard } from "@/content/en/leaderboard";
import { getApprovedFaq, getPublishableFaq } from "@/lib/content";
import { classifyPhase, sortByDate } from "@/lib/timeline";

describe("evaluation buckets", () => {
  it("has exactly eight buckets with unique indices 1..8", () => {
    expect(buckets).toHaveLength(8);
    const indices = buckets.map((b) => b.index).sort((a, b) => a - b);
    expect(indices).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(new Set(buckets.map((b) => b.id)).size).toBe(8);
    for (const b of buckets) expect(b.gloss.length).toBeGreaterThan(0);
  });
});

describe("timeline", () => {
  it("has valid, unique, dated items with summaries", () => {
    expect(timeline.length).toBeGreaterThan(0);
    expect(new Set(timeline.map((t) => t.id)).size).toBe(timeline.length);
    for (const item of timeline) {
      expect(Number.isNaN(Date.parse(item.date))).toBe(false);
      expect(item.summary.trim().length).toBeGreaterThan(0);
      expect(item.dateLabel.trim().length).toBeGreaterThan(0);
    }
  });

  it("sorts chronologically", () => {
    const sorted = sortByDate(timeline).map((t) => t.date);
    expect(sorted).toEqual([...sorted].sort());
  });

  it("classifies phase deterministically against a fixed date", () => {
    const june = timeline.find((t) => t.id === "june-kickoff")!;
    const october = timeline.find((t) => t.id === "october-launch")!;
    const now = new Date("2026-07-15T00:00:00Z");
    expect(classifyPhase(june, now)).toBe("past");
    expect(classifyPhase(october, now)).toBe("upcoming");
  });
});

describe("research", () => {
  it("groups have entries and any links are absolute URLs", () => {
    expect(research.length).toBeGreaterThan(0);
    for (const group of research) {
      expect(group.entries.length).toBeGreaterThan(0);
      for (const entry of group.entries) {
        if (entry.url) {
          expect(() => new URL(entry.url as string)).not.toThrow();
          expect(entry.url.startsWith("http")).toBe(true);
        }
      }
    }
  });

  it("includes the Waxal dataset reference", () => {
    const all = research.flatMap((g) => g.entries);
    expect(all.some((e) => e.id === "waxal" && !!e.url)).toBe(true);
  });
});

describe("faq sign-off", () => {
  it("leads with the language-rights question at order 0", () => {
    const sorted = getPublishableFaq(faq);
    expect(sorted[0].category).toBe("rights");
    expect(sorted[0].order).toBe(0);
  });

  it("never leaks draft answers into structured data", () => {
    const approved = getApprovedFaq(faq);
    expect(approved.length).toBeGreaterThan(0);
    expect(approved.every((i) => i.signOffStatus === "approved")).toBe(true);
  });

  it("returns publishable items sorted by order", () => {
    const orders = getPublishableFaq(faq).map((i) => i.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });
});

describe("leaderboard", () => {
  it("is clearly marked as an illustrative sample, not real data", () => {
    expect(leaderboard.kind).toBe("illustrative");
    expect(leaderboard.note.toLowerCase()).toContain("illustrative");
    expect(leaderboard.rows.length).toBeGreaterThan(0);
    const ranks = leaderboard.rows.map((r) => r.rank).sort((a, b) => a - b);
    expect(ranks).toEqual([1, 2, 3, 4]);
  });
});
