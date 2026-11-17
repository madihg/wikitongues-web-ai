import { BASE_PATH } from "./base";
// Old links keep working.
//
// Until 2026-11-13 the site had three pages: the home page, /research/ and
// /how-it-works/. It now has two: the main page (which is the explanation)
// and /record/ (the evidence). A browser never sends the "#anchor" part of a
// link to the server, so a server redirect cannot tell
// /how-it-works/#changelog from /how-it-works/#system. Each retired path
// therefore stays as a small static page that runs the script below, which
// reads the anchor and sends the reader to where that section lives now.
//
// tests/legacy.test.ts asserts that every anchor the old pages had is listed.

export interface LegacyRule {
  /** Where the path goes when there is no anchor, or an unknown one. Null
   * means stay (used for the main page, which still exists). */
  fallback: string | null;
  anchors: Record<string, string>;
}

export const legacy: Record<string, LegacyRule> = {
  "/how-it-works/": {
    fallback: "/#how-it-works",
    anchors: {
      system: "/#how-it-works",
      verdicts: "/record/#verdicts",
      journey: "/record/#versions",
      assembly: "/record/#assembly",
      prompts: "/record/#prompts",
      benchmark: "/record/#benchmark",
      "tested-now": "/record/#tested-now",
      changelog: "/record/#changelog",
    },
  },
  "/research/": {
    fallback: "/",
    anchors: {
      why: "/#problem",
      who: "/#who",
      how: "/#how-it-works",
      findings: "/#results",
      next: "/record/#tested-now",
      "further-reading": "/record/#reading",
    },
  },
  // The main page keeps #overview, and keeps #project, #faq and #support as
  // aliases on the sections that replaced them. Two old sections moved to the
  // record.
  "/": {
    fallback: null,
    anchors: {
      timeline: "/record/#changelog",
      research: "/record/#reading",
    },
  },
};

/** Where an old link goes now, or null to stay on the page. `hash` may carry
 * its leading "#". Section headings used to carry "<id>-heading" ids, so that
 * suffix is ignored. */
export function resolveLegacy(path: string, hash: string): string | null {
  const rule = legacy[path];
  if (!rule) return null;
  const anchor = hash.replace(/^#/, "").replace(/-heading$/, "");
  if (anchor && Object.prototype.hasOwnProperty.call(rule.anchors, anchor))
    return rule.anchors[anchor];
  return rule.fallback;
}

/** The same rule as a few lines of plain JavaScript, inlined into the page so
 * it runs before anything is drawn. Generated from the map above, so the two
 * cannot disagree. */
export function legacyScript(path: string): string {
  const rule = legacy[path];
  return `(function(){var r=${JSON.stringify(rule)};var a=location.hash.replace(/^#/,"").replace(/-heading$/,"");var t=a&&Object.prototype.hasOwnProperty.call(r.anchors,a)?r.anchors[a]:r.fallback;if(t)location.replace(${JSON.stringify(BASE_PATH)}+t);})();`;
}
