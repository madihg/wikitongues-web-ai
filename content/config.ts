import type { FlagMap, Locale } from "./types";

// Feature flags. Env vars (NEXT_PUBLIC_FLAG_<NAME>=true|false) override these
// at build time without a code edit. See lib/flags.ts.
export const flags: FlagMap = {
  leaderboard: true, // illustrative snapshot shown, clearly labelled as a sample
  emailCapture: false, // off for v1 (privacy default; no server route under static export)
  researchRoute: false, // single-page scroll for v1
  faqRoute: false,
};

export const site = {
  name: "Wikitongues AI",
  url: "https://wikitongues-web-ai.vercel.app",
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
