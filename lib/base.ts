/**
 * The path the site is served under. Empty on its own domain; "/ai" when it
 * lives at wikitongues.org/ai. Set with NEXT_PUBLIC_BASE_PATH at build time.
 * The framework prefixes its own files; every link the site writes by hand
 * goes through withBase.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/+$/,
  "",
);

/** Prefix an internal link ("/record/") with the base path. Anything else
 * (a full URL, "#anchor", "mailto:") is returned as it came. */
export function withBase(href: string, base: string = BASE_PATH): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return `${base}${href}`;
}
