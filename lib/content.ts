import { getDictionary } from "@/content/i18n";
import { site } from "@/content/config";
import type { Locale } from "@/content/types";

// Typed content getter. Components consume this, never raw data files.
export function getContent(locale: Locale = site.defaultLocale) {
  return getDictionary(locale);
}
