import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/index";
import en from "@/i18n/messages/en";
import type { TripSlug } from "@/i18n/routes";
import { faqIds } from "./faq";
import { photoSlots } from "./photos";
import { stays } from "./stays";
import { trips } from "./trips";
import type { Faq, PhotoId, PhotoSlot, PriceOption, Stay, Trip, TripData } from "./types";

/*
 * Content in a given language: structure from `src/content/*` merged with the copy from
 * the translation files. Components render these and never mix languages.
 */

const blank = (value: string | undefined) => (value ? value : undefined);

export function getPhotos(locale: Locale): Record<PhotoId, PhotoSlot> {
  const copy = getMessages(locale).photos as Record<PhotoId, { alt: string; caption?: string }>;
  return Object.fromEntries(
    (Object.keys(photoSlots) as PhotoId[]).map((id) => [
      id,
      { ...photoSlots[id], alt: copy[id].alt, caption: blank(copy[id].caption) },
    ]),
  ) as Record<PhotoId, PhotoSlot>;
}

type TripCopy = (typeof en.trips)[TripSlug];
type OptionCopy = { label: string; detail: string; badge: string };
type PackageCopy = { name: string; summary: string; highlight: string; points: string[] };

function localizeTrip(data: TripData, locale: Locale): Trip {
  const m = getMessages(locale);
  const copy = m.trips[data.slug] as TripCopy;
  const english = en.trips[data.slug] as TripCopy;
  const optionCopy = copy.options as Record<string, OptionCopy>;
  const packageCopy = copy.packages as Record<string, PackageCopy>;
  const photos = getPhotos(locale);

  const options: PriceOption[] = data.options.map((o) => {
    const c = optionCopy[o.id];
    if (!c) throw new Error(`Missing copy for option ${data.slug}/${o.id} (${locale})`);
    return { ...o, label: c.label, detail: blank(c.detail), badge: blank(c.badge) };
  });

  return {
    slug: data.slug,
    kind: data.kind,
    kindLabel: m.trip.kind[data.kind],
    name: copy.name,
    shortName: copy.shortName,
    bookTitle: copy.bookTitle,
    summary: copy.summary,
    route: data.route,
    duration: copy.duration,
    departures: {
      weekdays: data.departures.weekdays,
      label: copy.departuresLabel,
      note: blank(copy.departuresNote),
    },
    priceOnRequest: blank(copy.priceOnRequest),
    options,
    minimum: blank(copy.minimum),
    included: copy.included,
    notIncluded: copy.notIncluded,
    itinerary: copy.itinerary.map((day) => ({
      label: day.label,
      title: day.title,
      meals: blank(day.meals),
      note: blank(day.note),
      stops: day.stops.map((stop) => ({ title: stop.title, text: blank(stop.text) })),
    })),
    goodToKnow: copy.goodToKnow,
    packages: data.packages?.map((pkg) => {
      const c = packageCopy[pkg.id];
      if (!c) throw new Error(`Missing copy for package ${data.slug}/${pkg.id} (${locale})`);
      return {
        id: pkg.id,
        optionIds: pkg.optionIds,
        name: c.name,
        summary: c.summary,
        highlight: blank(c.highlight),
        points: c.points,
      };
    }),
    extras: copy.extras.length ? copy.extras : undefined,
    photo: data.photo ? photos[data.photo] : undefined,
    seo: copy.seo,
    operator: {
      name: english.name,
      options: Object.fromEntries(
        Object.entries(english.options as Record<string, OptionCopy>).map(([id, c]) => [
          id,
          c.label,
        ]),
      ),
      extras: english.extras,
    },
  };
}

export function getTrips(locale: Locale): Trip[] {
  return trips.map((t) => localizeTrip(t, locale));
}

export function getTrip(locale: Locale, slug: string): Trip | undefined {
  const data = trips.find((t) => t.slug === slug);
  return data ? localizeTrip(data, locale) : undefined;
}

export function getStays(locale: Locale): Stay[] {
  const copy = getMessages(locale).stays;
  return stays.map((s) => ({ ...s, ...copy[s.id] }));
}

/** The FAQ in one language: one typed source for both the page and its FAQPage JSON-LD. */
export function getFaqs(locale: Locale): Faq[] {
  return getMessages(locale).faq.map((faq, i) => {
    const id = faqIds[i];
    if (!id) throw new Error(`FAQ ${i + 1} (${locale}) has no id in src/content/faq.ts`);
    return { id, question: faq.question, answer: faq.answer };
  });
}
