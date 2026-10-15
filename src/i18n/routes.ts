import { defaultLocale, isLocale, localeInfo, locales, type Locale } from "./config";

/**
 * Every page and its address in each language: the single source for links, the language
 * switcher, canonical and hreflang tags and the sitemap. French, German and Spanish get
 * localized slugs (searchers type them); Chinese and Thai keep the English slugs, which
 * stay readable and avoid percent-encoded URLs.
 */
export const tripSlugs = [
  "downstream",
  "upstream",
  "chiang-mai-land-and-cruise",
  "nan-to-luang-prabang",
] as const;
export type TripSlug = (typeof tripSlugs)[number];

export const staticPages = [
  "home",
  "whereToStay",
  "charters",
  "guide",
  "faq",
  "contact",
  "privacy",
] as const;
export type StaticPage = (typeof staticPages)[number];
export type PageKey = StaticPage | `trip:${TripSlug}`;

export const pageKeys: PageKey[] = [
  ...staticPages,
  ...tripSlugs.map((slug) => `trip:${slug}` as const),
];

type PathTable = Record<StaticPage, string> & { trips: Record<TripSlug, string> };

const english: PathTable = {
  home: "/",
  whereToStay: "/where-to-stay/",
  charters: "/private-charters/",
  guide: "/guides/houay-xai-to-luang-prabang/",
  faq: "/plan-your-trip/",
  contact: "/contact/",
  privacy: "/privacy/",
  trips: {
    downstream: "/cruises/downstream/",
    upstream: "/cruises/upstream/",
    "chiang-mai-land-and-cruise": "/cruises/chiang-mai-land-and-cruise/",
    "nan-to-luang-prabang": "/cruises/nan-to-luang-prabang/",
  },
};

/** Route-named trip slugs, shared by the localized tables. */
const tripsUnder = (folder: string): Record<TripSlug, string> => ({
  downstream: `/${folder}/houay-xai-luang-prabang/`,
  upstream: `/${folder}/luang-prabang-houay-xai/`,
  "chiang-mai-land-and-cruise": `/${folder}/chiang-mai-luang-prabang/`,
  "nan-to-luang-prabang": `/${folder}/nan-luang-prabang/`,
});

/** Paths without the language prefix. */
const paths: Record<Locale, PathTable> = {
  en: english,
  fr: {
    home: "/",
    whereToStay: "/hebergement/",
    charters: "/croisiere-privee/",
    guide: "/guide/houay-xai-luang-prabang/",
    faq: "/preparer-son-voyage/",
    contact: "/contact/",
    privacy: "/confidentialite/",
    trips: tripsUnder("croisieres"),
  },
  de: {
    home: "/",
    whereToStay: "/unterkuenfte/",
    charters: "/privatcharter/",
    guide: "/reisefuehrer/houay-xai-luang-prabang/",
    faq: "/reise-planen/",
    contact: "/kontakt/",
    privacy: "/datenschutz/",
    trips: tripsUnder("kreuzfahrten"),
  },
  es: {
    home: "/",
    whereToStay: "/alojamiento/",
    charters: "/barco-privado/",
    guide: "/guia/houay-xai-luang-prabang/",
    faq: "/planifica-tu-viaje/",
    contact: "/contacto/",
    privacy: "/privacidad/",
    trips: tripsUnder("cruceros"),
  },
  zh: english,
  th: english,
};

function bare(locale: Locale, key: PageKey): string {
  const table = paths[locale];
  return key.startsWith("trip:") ? table.trips[key.slice(5) as TripSlug] : table[key as StaticPage];
}

/** Site-relative path of a page in a language, e.g. ("fr", "faq") → "/fr/preparer-son-voyage/". */
export function pathFor(locale: Locale, key: PageKey): string {
  return `${localeInfo[locale].prefix}${bare(locale, key)}`;
}

/** Path with an optional query and anchor: ("en", "trip:downstream", { hash: "book" }). */
export function href(
  locale: Locale,
  key: PageKey,
  { hash, query }: { hash?: string; query?: Record<string, string> } = {},
): string {
  const search = query ? `?${new URLSearchParams(query)}` : "";
  return `${pathFor(locale, key)}${search}${hash ? `#${hash}` : ""}`;
}

export const tripKey = (slug: TripSlug): PageKey => `trip:${slug}`;

/** The same page in every language (for hreflang, the sitemap and the switcher). */
export function alternatesFor(key: PageKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, pathFor(l, key)])) as Record<Locale, string>;
}

/** Page shown at a path inside a prefixed language (catch-all route), e.g. ["croisieres", "…"]. */
export function resolvePage(locale: Locale, segments: readonly string[] = []): PageKey | null {
  const target = segments.length ? `/${segments.join("/")}/` : "/";
  return pageKeys.find((key) => bare(locale, key) === target) ?? null;
}

/** Path segments of every page in a language, for generateStaticParams. */
export function segmentsFor(locale: Locale): string[][] {
  return pageKeys.map((key) => bare(locale, key).split("/").filter(Boolean));
}

/** Language and page for a site path (trailing slash optional). Null for unknown paths. */
export function locate(pathname: string): { locale: Locale; key: PageKey } | null {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const first = normalized.split("/")[1];
  const locale =
    isLocale(first) && first !== defaultLocale ? first : (defaultLocale satisfies Locale);
  const rest = locale === defaultLocale ? normalized : normalized.slice(first!.length + 1);
  const key = pageKeys.find((k) => bare(locale, k) === rest);
  return key ? { locale, key } : null;
}
