/* Tailwind v3 mapping for the site (wikitongues-web-ai, tailwind.config.ts).
 *
 * The site is on Tailwind 3.4, so the mapping is a config object, not an
 * `@theme` block. This object replaces `theme.extend` in tailwind.config.ts.
 *
 * Top half of each group: every utility the site uses today, by its old
 * name, now reading a wt token (bg-surface, text-muted, border-line,
 * max-w-measure keep working: no class in app/ or components/ changes).
 * Bottom half: the new names, the same ones the platform gets from
 * tailwind.platform.css, so a component can move between the two repos
 * without its classes being rewritten.
 *
 * Site step 1 ships tokens.css + tokens.compat.site.css and swaps the :root
 * block in app/globals.css for the two imports. It does NOT ship this file:
 * the old config already reads the old variable names, which tokens.css
 * section 5 keeps alive. This file ships in site step 2.
 */

import type { Config } from "tailwindcss";

export const wtThemeExtend: NonNullable<Config["theme"]>["extend"] = {
  colors: {
    /* Old names, kept */
    background: "var(--wt-paper)",
    surface: "var(--wt-surface)",
    "surface-sunken": "var(--wt-sunken)",
    muted: "var(--wt-ink-2)" /* the site's "muted" is second-rank text */,
    "line-strong": "var(--wt-line-control)",
    footer: {
      bg: "var(--wt-inverse)",
      text: "var(--wt-ink-on-inverse)",
      muted: "var(--wt-ink-on-inverse-2)",
    },

    /* New names (ink, line, accent and danger already matched) */
    paper: "var(--wt-paper)",
    sunken: "var(--wt-sunken)",
    inverse: "var(--wt-inverse)",
    ink: {
      DEFAULT: "var(--wt-ink)",
      2: "var(--wt-ink-2)",
      3: "var(--wt-ink-3)",
      disabled: "var(--wt-ink-disabled)",
    },
    "on-inverse": {
      DEFAULT: "var(--wt-ink-on-inverse)",
      2: "var(--wt-ink-on-inverse-2)",
    },
    line: {
      DEFAULT: "var(--wt-line)",
      control: "var(--wt-line-control)",
    },
    accent: {
      DEFAULT: "var(--wt-accent)",
      hover: "var(--wt-accent-hover)",
      pressed: "var(--wt-accent-pressed)",
      subtle: "var(--wt-accent-tint)" /* old name */,
      tint: "var(--wt-accent-tint)",
      text: "var(--wt-accent-text)",
      on: "var(--wt-on-accent)" /* old name: text-accent-on */,
    },
    "on-accent": "var(--wt-on-accent)",
    focus: "var(--wt-focus)",
    success: {
      DEFAULT: "var(--wt-success)",
      tint: "var(--wt-success-tint)",
      fill: "var(--wt-success-fill)",
    },
    warning: {
      DEFAULT: "var(--wt-warning)",
      tint: "var(--wt-warning-tint)",
    },
    danger: {
      DEFAULT: "var(--wt-danger)",
      tint: "var(--wt-danger-tint)",
      fill: "var(--wt-danger-fill)",
    },
    data: {
      1: "var(--wt-data-1)",
      2: "var(--wt-data-2)",
      3: "var(--wt-data-3)",
      4: "var(--wt-data-4)",
      neutral: "var(--wt-data-neutral)",
      highlight: "var(--wt-data-highlight)",
      track: "var(--wt-data-track)",
    },
  },

  fontFamily: {
    /* The stacks live in tokens.css. Until site step 2 the compat file
       points them at next/font's --font-sans and --font-serif. */
    sans: ["var(--wt-font-sans)"],
    serif: ["var(--wt-font-display)"] /* old name: font-serif, 24 uses */,
    display: ["var(--wt-font-display)"],
    igala: ["var(--wt-font-igala)"],
    mono: ["var(--wt-font-mono)"],
  },

  fontSize: {
    /* text-meta, text-small, text-body, text-igala, text-title, text-page,
       text-h2, text-h1, text-display, text-hero. Tailwind's own text-xs
       (12) to text-6xl (60) land on the same pixels and stay available;
       text-[10px] and text-[11px] are refused by the check in rollout.md. */
    meta: ["var(--wt-fs-meta)", { lineHeight: "1.4" }],
    small: ["var(--wt-fs-small)", { lineHeight: "1.5" }],
    body: ["var(--wt-fs-body)", { lineHeight: "var(--wt-lh-body)" }],
    igala: ["var(--wt-fs-igala)", { lineHeight: "var(--wt-lh-igala)" }],
    title: ["var(--wt-fs-title)", { lineHeight: "var(--wt-lh-tight)" }],
    page: ["var(--wt-fs-page)", { lineHeight: "var(--wt-lh-tight)" }],
    h2: ["var(--wt-fs-h2)", { lineHeight: "var(--wt-lh-tight)" }],
    h1: ["var(--wt-fs-h1)", { lineHeight: "var(--wt-lh-tight)" }],
    display: ["var(--wt-fs-display)", { lineHeight: "1.1" }],
    hero: ["var(--wt-fs-hero)", { lineHeight: "1.08" }],
  },

  borderRadius: {
    /* rounded-control, rounded-card, rounded-pill. The site's rounded (4),
       rounded-md (6), rounded-lg (8) and rounded-xl (12) stay Tailwind's
       defaults until site step 5 maps them onto the two steps below. */
    control: "var(--wt-radius-control)",
    card: "var(--wt-radius-card)",
    pill: "var(--wt-radius-pill)",
  },

  boxShadow: {
    overlay: "var(--wt-shadow-overlay)",
  },

  transitionDuration: {
    fast: "var(--wt-dur-fast)",
    base: "var(--wt-dur-base)",
    slow: "var(--wt-dur-slow)",
  },
  transitionTimingFunction: {
    wt: "var(--wt-ease)",
  },

  spacing: {
    /* min-h-target, size-target, w-sidebar */
    target: "var(--wt-target)",
    "target-min": "var(--wt-target-min)",
    sidebar: "var(--wt-sidebar)",
  },

  maxWidth: {
    /* Old names, kept at their own values: the site's reading column is a
       little wider than an annotator task and stays so. */
    measure: "var(--wt-measure)",
    container: "46rem",
    "container-wide": "65rem",
    "container-bleed": "80rem",
    /* New names, shared with the platform */
    content: "var(--wt-content)",
    "content-wide": "var(--wt-content-wide)",
  },

  letterSpacing: {
    tightish: "-0.015em" /* English display headings only, never Igala */,
    overline: "0.08em",
  },
};

/* tailwind.config.ts becomes:
 *
 *   import type { Config } from "tailwindcss";
 *   import { wtThemeExtend } from "./styles/tailwind.site";
 *   const config: Config = {
 *     content: ["./app/**\/*.{ts,tsx}", "./components/**\/*.{ts,tsx}", "./content/**\/*.{ts,tsx}"],
 *     theme: { extend: wtThemeExtend },
 *     plugins: [],
 *   };
 *   export default config;
 *
 * Base rules that change in app/globals.css, in the site step that names
 * them (rollout.md):
 *
 *   site step 2 (type)
 *     body          font-family: var(--wt-font-sans); line-height: var(--wt-lh-body)
 *     h1, h2, h3    font-family: var(--wt-font-display)   (unchanged in effect)
 *     [lang="ig"], .igala
 *                   font-family: var(--wt-font-igala); line-height: var(--wt-lh-igala);
 *                   letter-spacing: 0; font-variant-ligatures: none
 *                   An Igala phrase inside an English serif heading is still set in
 *                   the sans: wrap it in <span lang="ig">.
 *     pre, code     font-family: var(--wt-font-mono)
 *                   Exception to "Igala is never mono": the prompt blocks on
 *                   /how-it-works are a verbatim record of what a model was sent, so
 *                   they stay in a <pre>. The mono stack is system fonts, which draw
 *                   every Igala cluster (audit/font-test-result.json: Menlo 42 of 42).
 *
 *   site step 3 (colour)
 *     :focus-visible  outline: var(--wt-focus-width) solid var(--wt-focus);
 *                     outline-offset: var(--wt-focus-offset)
 *     .on-inverse :focus-visible  outline-color: var(--wt-focus-on-inverse)   (the footer)
 */
