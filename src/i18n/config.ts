/**
 * Languages. English is the default and is served without a prefix (`/`); every other
 * language lives under its own prefix (`/fr/`, `/de/`…). To add a language: add it here,
 * add `src/i18n/messages/<code>.ts` (TypeScript fails the build until every key exists),
 * then give it paths in `src/i18n/routes.ts`.
 */
export const locales = ["en", "fr", "de", "es", "zh", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export interface LocaleInfo {
  /** Name of the language written in that language (switcher, banner). */
  nativeName: string;
  /** BCP 47 tag for `<html lang>`, `hreflang` and `lang` attributes. */
  tag: string;
  /** Locale used by the Intl APIs (dates, numbers, currencies, lists). */
  intl: string;
  /** Open Graph locale. */
  og: string;
  /** URL prefix ("" for the default language). */
  prefix: string;
  /**
   * True when Poppins and Source Sans 3 don't cover the script: the system font stack is
   * used for those glyphs (see globals.css, `:lang()` rules).
   */
  systemFonts?: boolean;
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  en: { nativeName: "English", tag: "en", intl: "en-GB", og: "en_GB", prefix: "" },
  fr: { nativeName: "Français", tag: "fr", intl: "fr-FR", og: "fr_FR", prefix: "/fr" },
  de: { nativeName: "Deutsch", tag: "de", intl: "de-DE", og: "de_DE", prefix: "/de" },
  es: { nativeName: "Español", tag: "es", intl: "es-ES", og: "es_ES", prefix: "/es" },
  zh: {
    nativeName: "简体中文",
    tag: "zh-Hans",
    intl: "zh-Hans-CN",
    og: "zh_CN",
    prefix: "/zh",
    systemFonts: true,
  },
  th: {
    nativeName: "ไทย",
    tag: "th",
    intl: "th-TH",
    og: "th_TH",
    prefix: "/th",
    systemFonts: true,
  },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Locales that have a prefix (every locale except the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale) as Exclude<
  Locale,
  "en"
>[];

/** Cookie that remembers the visitor's language choice (banner or switcher). */
export const LOCALE_COOKIE = "nagi_locale";

/**
 * Best supported locale for a list of language preferences, in order (the same list the
 * browser sends as Accept-Language: `navigator.languages`). Returns null when none match.
 */
export function matchLocale(preferences: readonly string[]): Locale | null {
  for (const pref of preferences) {
    const lower = pref.toLowerCase();
    const base = lower.split("-")[0];
    if (base === "zh") {
      // Only Simplified Chinese is offered: skip Traditional (zh-Hant, zh-TW, zh-HK, zh-MO).
      if (/-(hant|tw|hk|mo)\b/.test(lower)) continue;
      return "zh";
    }
    if (isLocale(base)) return base;
  }
  return null;
}
