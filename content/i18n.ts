import type { Locale } from "./types";
import * as en from "./en";
import { site } from "./config";

// Locale registry. v1 ships English only; add `ig` etc. here later without
// touching components. Components read content through this dictionary.
const dictionaries = { en } as const;

export function getDictionary(locale: Locale = site.defaultLocale) {
  return dictionaries[locale];
}
