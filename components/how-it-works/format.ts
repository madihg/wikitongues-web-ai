// Tiny formatting helpers for the How-it-works page's live numbers.
// Pure functions, unit-tested in tests/how-it-works-page.test.ts.

/** Replace {token} slots in a content template with formatted values.
 * Unknown tokens are left intact so a template/content mismatch stays
 * visible in review instead of silently rendering an empty hole. */
export function fill(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : whole,
  );
}

/** Remove {token} slots (and one following space) from a template, for the
 * loading state: "{goldAnswers} question-answer pairs" -> "question-answer
 * pairs". The sentence must be written to survive this. */
export function stripTokens(template: string): string {
  return template.replace(/\{\w+\}\s*/g, "").trim();
}

export function fmtInt(n: number): string {
  return n.toLocaleString("en-US");
}

/** chrF-scale value with one decimal; "n/a" when unknown. */
export function fmtChrf(n: number | null): string {
  return n === null || !Number.isFinite(n) ? "n/a" : n.toFixed(1);
}

/** A 0..1 rate as a percentage with one decimal, e.g. "98.9%". */
export function fmtRatePct(rate: number): string {
  return `${(100 * rate).toFixed(1)}%`;
}

/** part/whole as a percentage with one decimal; "n/a" when whole is 0. */
export function fmtSharePct(part: number, whole: number): string {
  return whole > 0 ? `${((100 * part) / whole).toFixed(1)}%` : "n/a";
}
