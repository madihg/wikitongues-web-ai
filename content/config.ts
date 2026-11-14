import type { Locale } from "./types";

// The public, aggregate-only stats endpoint that powers the record's count of
// questions by area. It lives in the annotation app (this marketing site is a fully
// static export and cannot host an API route), so the page fetches it
// cross-origin at runtime - numbers refresh without redeploying this site.
//
// DEFAULT points at the annotation app's own stable project domain, which keeps
// serving the annotation app regardless of what happens to the shared
// `wikitongues-ai-web.vercel.app` alias. Override at build time with
// NEXT_PUBLIC_STATS_API_URL if the annotation app moves.
export const statsApi = {
  fallbackUrl: "https://web-three-rho-89.vercel.app/api/public/stats",
  url:
    process.env.NEXT_PUBLIC_STATS_API_URL ||
    "https://web-three-rho-89.vercel.app/api/public/stats",
};

// The aggregate-only method-metrics endpoint that powers every live figure on
// the main page and the record (blind comparisons, counts, the exam board). Same hosting story as statsApi: it lives in the annotation app and
// is fetched cross-origin at runtime. The page NEVER falls back to recorded
// score values - if this endpoint is unreachable it says "live numbers
// unavailable" instead, so a stale benchmark can never masquerade as current.
export const methodMetricsApi = {
  url:
    process.env.NEXT_PUBLIC_METHOD_METRICS_API_URL ||
    "https://web-three-rho-89.vercel.app/api/public/method-metrics",
};

export const site = {
  name: "Wikitongues AI",
  // The marketing site's own canonical domain. Deliberately NOT
  // `wikitongues-ai-web.vercel.app` - that alias serves the annotation app
  // (login / annotator / learner routes). Keep these two straight.
  url: "https://wikitongues-ai-site.vercel.app",
  parentUrl: "https://wikitongues.org",
  parentName: "Wikitongues",
  // Wikitongues' existing donation flow. Note asks donors to direct the gift to the AI initiative.
  donateUrl: "https://wikitongues.donorsupport.co/-/XTRAFEBU",
  contactEmail: "hello@wikitongues.org",
  defaultLocale: "en" as Locale,
  locales: ["en"] as Locale[],
};
