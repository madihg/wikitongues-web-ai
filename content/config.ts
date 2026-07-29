import type { FlagMap, Locale } from "./types";

// Feature flags. Env vars (NEXT_PUBLIC_FLAG_<NAME>=true|false) override these
// at build time without a code edit. See lib/flags.ts.
export const flags: FlagMap = {
  leaderboard: true, // illustrative snapshot shown, clearly labelled as a sample
  emailCapture: false, // off for v1 (privacy default; no server route under static export)
  researchRoute: true, // dedicated /research page with diagrams + live stats
  faqRoute: false,
};

// The public, aggregate-only stats endpoint that powers the Research page's
// live numbers. It lives in the annotation app (this marketing site is a fully
// static export and cannot host an API route), so the Research page fetches it
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

export const site = {
  name: "Wikitongues AI",
  url: "https://wikitongues-ai-web.vercel.app",
  parentUrl: "https://wikitongues.org",
  parentName: "Wikitongues",
  // Wikitongues' existing donation flow. Note asks donors to direct the gift to the AI initiative.
  donateUrl: "https://wikitongues.donorsupport.co/-/XTRAFEBU",
  contactEmail: "hello@wikitongues.org",
  defaultLocale: "en" as Locale,
  locales: ["en"] as Locale[],
  // Whether draft (un-signed-off) FAQ answers are shown, marked as drafts.
  // Set false to withhold all unapproved answers from the build.
  showDraftFaq: true,
};
