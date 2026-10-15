import { cache } from "react";
import { type Locale } from "./config";
import { getMessages } from "./index";

/*
 * The language of the page being rendered, for server components deep in the tree.
 * Each root layout and each page sets it first (`setRequestLocale`), the same pattern
 * next-intl uses for static rendering; React's `cache` scopes it to one render.
 */
const store = cache(() => ({ locale: null as Locale | null }));

export function setRequestLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  const { locale } = store();
  if (!locale) throw new Error("setRequestLocale() must be called by the layout and page.");
  return locale;
}

/** Locale and copy for the page being rendered. */
export function getI18n() {
  const locale = getLocale();
  return { locale, m: getMessages(locale) };
}
