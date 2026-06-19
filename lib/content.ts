import { getDictionary } from "@/content/i18n";
import { site } from "@/content/config";
import type { FaqItem, Locale } from "@/content/types";

// Typed content getters. Components consume these, never raw data files,
// so cross-cutting rules (e.g. "no unsigned FAQ ships") live in one place.

export function getContent(locale: Locale = site.defaultLocale) {
  return getDictionary(locale);
}

// Returns FAQ items safe to render, sorted by `order`.
// - If showDraftFaq is false, draft items are withheld entirely.
// - If true, drafts are returned (the UI marks them with a draft badge).
export function getPublishableFaq(items: FaqItem[]): FaqItem[] {
  const visible = site.showDraftFaq
    ? items
    : items.filter((i) => i.signOffStatus === "approved");
  return [...visible].sort((a, b) => a.order - b.order);
}

// FAQ items suitable for FAQPage structured data: approved answers only,
// so drafts never leak into search results regardless of UI display.
export function getApprovedFaq(items: FaqItem[]): FaqItem[] {
  return items
    .filter((i) => i.signOffStatus === "approved")
    .sort((a, b) => a.order - b.order);
}
