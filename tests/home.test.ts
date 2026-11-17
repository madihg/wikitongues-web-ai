import { describe, expect, it } from "vitest";
import { home } from "@/content/en/home";
import { ui } from "@/content/en/site";
import { liveValues } from "@/components/record/liveValues";
import { sampleMetrics } from "./fixtures";

type Live = { live: string; fallback: string };

function liveBlocks(value: unknown, out: Live[] = []): Live[] {
  if (Array.isArray(value)) value.forEach((v) => liveBlocks(v, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.live === "string" && typeof o.fallback === "string")
      out.push({ live: o.live, fallback: o.fallback });
    Object.values(o).forEach((v) => liveBlocks(v, out));
  }
  return out;
}

const words = (s: string) => s.trim().split(/\s+/).length;

describe("main page content", () => {
  it("opens by saying what the thing is", () => {
    expect(home.hero.title).toBe("Speakers teach AI models their own language.");
    expect(home.hero.body[0].startsWith("Wikitongues AI is a method and a platform.")).toBe(true);
  });

  it("has the sections the page draws, with the ids old links rely on", () => {
    expect(home.problem.id).toBe("problem");
    expect(home.howItWorks.id).toBe("how-it-works");
    expect(home.results.id).toBe("results");
    expect(home.corrections.id).toBe("corrections");
    expect(home.who.id).toBe("who");
    expect(home.takePart.id).toBe("take-part");
    expect(home.questions.id).toBe("questions");
    expect(home.corrections.items).toHaveLength(3);
    expect(home.who.groups).toHaveLength(4);
    expect(home.takePart.doors).toHaveLength(4);
    expect(home.questions.items).toHaveLength(6);
  });

  it("uses nav labels that are the exact headings they point to", () => {
    expect(ui.nav[0].label).toBe(home.howItWorks.title);
    expect(ui.nav[1].label).toBe(home.results.title);
    expect(ui.nav[2].label).toBe(home.takePart.title);
  });

  it("covers every {token} with a live value", () => {
    const known = new Set([
      ...Object.keys(liveValues(sampleMetrics())),
      "email",
      "computedAt",
    ]);
    const tokens = new Set<string>();
    for (const m of JSON.stringify(home).matchAll(/\{(\w+)\}/g)) tokens.add(m[1]);
    expect([...tokens].filter((t) => !known.has(t))).toEqual([]);
  });

  it("types no live figure into a fallback: the no-figure versions carry no counts", () => {
    // Allowed numerals are fixed facts, not readings of the database: years,
    // the 1854 wordlist, 1.6 million speakers, 7,000 and 100 languages, the
    // 99 in 100 starting rate, 700 languages in the archive, and model names.
    const allowed = new Set(["2026", "2027", "1854", "1", "6", "7,000", "100", "99", "700", "3", "5"]);
    for (const block of liveBlocks(home)) {
      expect(block.fallback).not.toMatch(/\{\w+\}/);
      for (const m of block.fallback.matchAll(/(?<![A-Za-z\d])\d[\d,]*/g)) {
        const n = m[0].replace(/,+$/, "");
        expect(allowed.has(n), `"${n}" in: ${block.fallback.slice(0, 70)}`).toBe(true);
      }
    }
  });

  it("keeps every sentence to 25 words or fewer", () => {
    const strings: string[] = [];
    const walk = (v: unknown): void => {
      if (typeof v === "string") strings.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(home);
    for (const s of strings) {
      for (const sentence of s.split(/(?<=[.?])\s+/)) {
        expect(words(sentence), sentence).toBeLessThanOrEqual(25);
      }
    }
  });

  it("obeys the house style: no em or en dashes, no exclamation marks, one name for the system", () => {
    const serialized = JSON.stringify(home);
    expect(serialized).not.toContain("—");
    expect(serialized).not.toContain("–");
    expect(serialized).not.toContain("!");
    for (const retired of ["our package", "the package", "RAG", "tutor", "leaderboard", "fine-tun"]) {
      expect(serialized, retired).not.toContain(retired);
    }
    expect(serialized).toContain("language layer");
  });

  it("names only people and institutions the site already published before this change", () => {
    const serialized = JSON.stringify(home);
    expect(serialized).toContain("Agnes");
    expect(serialized).not.toContain("Abah");
    expect(serialized).not.toContain("University of Florida");
    expect(serialized).not.toContain("Port Harcourt");
    expect(serialized).toContain("New York University and Google Research");
  });

  it("states the decided facts: 1.6 million speakers, more than 700 languages, speakers are paid", () => {
    const serialized = JSON.stringify(home);
    expect(serialized).toContain("about 1.6 million people");
    expect(serialized).toContain("more than 700 languages");
    expect(serialized).toContain("they are paid for their time");
    expect(serialized).toContain("We want to run this method with two more languages in 2027");
  });

  it("keeps the 99 in 100 starting figure with its caveat in the same paragraph", () => {
    expect(home.results.start).toContain("99 of every 100");
    expect(home.results.start).toContain("not a before and after");
  });

  it("keeps meta descriptions within what a search result shows", () => {
    expect(home.meta.description.length).toBeLessThanOrEqual(160);
    expect(home.meta.ogDescription.length).toBeLessThanOrEqual(160);
  });
});
