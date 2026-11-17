import { describe, expect, it } from "vitest";
import { method } from "@/content/en/method";

const words = (s: string) => s.trim().split(/\s+/).length;

describe("the loop: the eight steps of the method", () => {
  it("has exactly eight steps, each with a name, a caption, a note and text for screen readers", () => {
    expect(method.steps).toHaveLength(8);
    for (const s of method.steps) {
      expect(s.name.trim().length).toBeGreaterThan(0);
      expect(s.caption.trim().length).toBeGreaterThan(0);
      expect(s.note.trim().length).toBeGreaterThan(0);
      expect(s.screenReader.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(method.steps.map((s) => s.name)).size).toBe(8);
  });

  it("keeps every caption to fifteen words or fewer", () => {
    for (const s of method.steps) {
      expect(words(s.caption), s.caption).toBeLessThanOrEqual(15);
    }
    expect(words(method.stillCaption)).toBeLessThanOrEqual(15);
  });

  it("keeps every sentence of every note to 25 words or fewer", () => {
    for (const s of method.steps) {
      for (const sentence of s.note.split(/(?<=[.?])\s+/)) {
        expect(words(sentence), sentence).toBeLessThanOrEqual(25);
      }
    }
  });

  it("obeys the house style: no em or en dashes, no exclamation marks", () => {
    const serialized = JSON.stringify(method);
    expect(serialized).not.toContain("—");
    expect(serialized).not.toContain("–");
    expect(serialized).not.toContain("!");
  });

  it("says only what is true of speech today: recording has started, rating has not", () => {
    const speak = method.steps[7];
    expect(speak.name).toBe("Speak");
    expect(speak.note).toContain("Recording started in November 2026");
    expect(speak.note).toContain("will listen");
    expect(speak.note).not.toMatch(/speakers (listen|rate) /);
  });

  it("names the play time so a reader knows what pressing play costs", () => {
    expect(method.controls.playDuration).toBe("40 seconds");
    expect(method.controls.position).toContain("{n}");
  });
});
