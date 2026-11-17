import { describe, it, expect } from "vitest";
import { withBase } from "../lib/base";

describe("links under a base path", () => {
  it("prefixes internal links", () => {
    expect(withBase("/record/#verdicts", "/ai")).toBe("/ai/record/#verdicts");
    expect(withBase("/", "/ai")).toBe("/ai/");
  });
  it("leaves everything else alone", () => {
    for (const href of ["https://wikitongues.org", "#steps", "mailto:a@b.c", "//cdn.example/x"]) {
      expect(withBase(href, "/ai")).toBe(href);
    }
  });
  it("changes nothing when there is no base path", () => {
    expect(withBase("/record/", "")).toBe("/record/");
  });
});
