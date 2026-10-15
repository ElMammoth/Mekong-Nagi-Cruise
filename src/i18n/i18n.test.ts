import { describe, expect, it } from "vitest";
import { tiktokVideos } from "@/content/tiktok";
import { trips } from "@/content/trips";
import { convert, formatCurrency, priceParts, type Rates } from "@/lib/currency";
import { localeInfo, locales, matchLocale } from "./config";
import { getMessages } from "./index";
import en from "./messages/en";
import { alternatesFor, locate, pageKeys, pathFor, resolvePage, segmentsFor } from "./routes";

/**
 * Translation checks beyond TypeScript (which already fails on a missing or extra key):
 * lists have the same length, and every string keeps the same {placeholders} and <tags>.
 */
type Problem = string;

function compare(path: string, source: unknown, target: unknown, problems: Problem[]) {
  if (typeof source === "string") {
    if (typeof target !== "string") return problems.push(`${path}: not a string`);
    const marks = (s: string) => [...s.matchAll(/\{[\w:-]+\}|<\/?\w+>/g)].map((x) => x[0]).sort();
    if (marks(source).join() !== marks(target).join()) {
      problems.push(`${path}: placeholders ${marks(source)} ≠ ${marks(target)}`);
    }
    if (source.trim() && !target.trim()) problems.push(`${path}: empty translation`);
    if (!source.trim() && target.trim()) problems.push(`${path}: should stay empty`);
    return;
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) return problems.push(`${path}: not a list`);
    if (source.length !== target.length) {
      problems.push(`${path}: ${target.length} items, English has ${source.length}`);
    }
    source.forEach((item, i) => compare(`${path}[${i}]`, item, target[i], problems));
    return;
  }
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) {
      if (!target || typeof target !== "object" || !(key in target)) {
        problems.push(`${path}.${key}: missing`);
        continue;
      }
      compare(
        `${path}.${key}`,
        (source as Record<string, unknown>)[key],
        (target as Record<string, unknown>)[key],
        problems,
      );
    }
  }
}

describe("translations", () => {
  for (const locale of locales.filter((l) => l !== "en")) {
    it(`${locale} matches the English structure, placeholders and tags`, () => {
      const problems: Problem[] = [];
      compare(locale, en, getMessages(locale), problems);
      expect(problems).toEqual([]);
    });
  }

  it("every price option and package has copy in every language", () => {
    for (const locale of locales) {
      const m = getMessages(locale);
      for (const trip of trips) {
        const copy = m.trips[trip.slug];
        for (const o of trip.options)
          expect(copy.options, `${locale} ${o.id}`).toHaveProperty(o.id);
        for (const p of trip.packages ?? []) expect(copy.packages).toHaveProperty(p.id);
      }
    }
  });
});

describe("routes", () => {
  it("every page resolves back from its path, in every language", () => {
    for (const locale of locales) {
      for (const key of pageKeys) {
        expect(locate(pathFor(locale, key)), `${locale} ${key}`).toEqual({ locale, key });
      }
    }
  });

  it("paths are unique and use trailing slashes", () => {
    const all = locales.flatMap((l) => pageKeys.map((k) => pathFor(l, k)));
    expect(new Set(all).size).toBe(all.length);
    for (const path of all) expect(path).toMatch(/^\/(?:[a-z0-9-]+\/)*$/);
  });

  it("hreflang alternates are reciprocal", () => {
    for (const key of pageKeys) {
      const alternates = alternatesFor(key);
      for (const locale of locales) {
        const back = locate(alternates[locale])!;
        expect(alternatesFor(back.key)).toEqual(alternates);
      }
    }
  });

  it("the catch-all generates every localized page", () => {
    for (const locale of locales.filter((l) => l !== "en")) {
      const keys = segmentsFor(locale).map((segments) => resolvePage(locale, segments));
      expect(keys.sort()).toEqual([...pageKeys].sort());
    }
    expect(pathFor("fr", "trip:downstream")).toBe("/fr/croisieres/houay-xai-luang-prabang/");
    expect(pathFor("en", "faq")).toBe("/plan-your-trip/");
  });
});

describe("language detection (navigator.languages, never IP)", () => {
  it("picks the first supported language", () => {
    expect(matchLocale(["de-CH", "en"])).toBe("de");
    expect(matchLocale(["nl-NL", "fr-BE"])).toBe("fr");
    expect(matchLocale(["zh-CN"])).toBe("zh");
    expect(matchLocale(["zh-Hans-SG"])).toBe("zh");
    expect(matchLocale(["ja-JP"])).toBeNull();
  });

  it("does not offer Simplified Chinese to Traditional Chinese readers", () => {
    expect(matchLocale(["zh-TW"])).toBeNull();
    expect(matchLocale(["zh-Hant-HK", "en-GB"])).toBe("en");
  });

  it("every language has its own BCP 47 tag and Intl locale", () => {
    for (const l of locales) expect(() => new Intl.NumberFormat(localeInfo[l].intl)).not.toThrow();
  });
});

describe("currency", () => {
  const rates: Rates = { base: "USD", date: "2026-10-14", rates: { THB: 33.575, EUR: 0.89326 } };

  it("converts with the daily rate and rounds sensibly", () => {
    expect(convert(160, "USD", rates)).toBe(160);
    expect(convert(160, "EUR", rates)).toBe(143);
    expect(convert(160, "THB", rates)).toBe(5370); // 5372 → nearest 10 for baht
    expect(convert(160, "GBP", rates)).toBeNull(); // no rate → caller falls back to USD
  });

  it("pairs US dollars with baht, never the same currency twice", () => {
    expect(priceParts(160, "USD", "en-GB", rates)).toMatchObject({
      main: "US$160",
      approximate: false,
      secondary: "฿5,370",
    });
    expect(priceParts(160, "THB", "en-GB", rates)).toMatchObject({
      main: "฿5,370",
      approximate: true,
      secondary: "US$160",
    });
    expect(priceParts(160, "EUR", "en-GB", rates)).toMatchObject({
      main: "€143",
      secondary: "US$160",
    });
    expect(priceParts(160, "GBP", "en-GB", rates)).toMatchObject({ main: "US$160", shown: "USD" });
  });

  it("falls back to US dollars only when there are no rates", () => {
    const none: Rates = { base: "USD", date: null, rates: null };
    expect(priceParts(160, "EUR", "en-GB", none)).toMatchObject({
      main: "US$160",
      secondary: undefined,
    });
  });

  it("formats in the page's locale", () => {
    expect(formatCurrency(5370, "THB", "en-GB")).toBe("฿5,370");
    expect(formatCurrency(160, "USD", "fr-FR")).toMatch(/^160\s\$US$/);
    expect(formatCurrency(143, "EUR", "de-DE")).toMatch(/^143\s€$/);
    expect(formatCurrency(140, "USD", "de-DE")).toMatch(/^140\sUS\$$/); // never a bare "$"
    for (const l of locales)
      expect(formatCurrency(1, "USD", localeInfo[l].intl)).toMatch(/US|美元/);
  });
});

describe("TikTok videos", () => {
  it("use clean URLs that match their id and handle", () => {
    for (const v of tiktokVideos) {
      expect(v.url).toBe(`https://www.tiktok.com/@${v.handle}/video/${v.id}`);
      expect(v.url).not.toMatch(/[?#]/);
      expect(v.retrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(new Set(tiktokVideos.map((v) => v.id)).size).toBe(tiktokVideos.length);
  });
});
