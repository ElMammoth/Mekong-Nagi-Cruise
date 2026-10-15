import type { TripData, TripSlug } from "./types";

/**
 * Cruises and land + cruise journeys: structure and prices. All copy (names, itinerary,
 * inclusions…) is in the translation files under `trips.<slug>`.
 * Source: nagiofmekong.com pages "Home & downstream cruise", "Upstream cruises",
 * "Pre-cruise program" and "Nan - Luang Prabang" (audited October 2026).
 *
 * Prices are authored once, in US dollars (the currency bookings are charged in). Other
 * currencies are converted on the site from daily exchange rates (src/lib/currency.ts).
 * To run a seasonal offer, add an option with `validFrom` / `validTo`: it appears and
 * disappears on its own (the site re-checks on each build), then add its copy under
 * `trips.<slug>.options.<id>` in every translation file.
 */
export const trips: TripData[] = [
  {
    slug: "downstream",
    kind: "cruise",
    route: ["Houay Xai", "Pak Beng", "Luang Prabang"],
    departures: { weekdays: [0, 3, 5] },
    options: [
      { id: "standard", twinShare: true, usd: 160, singleSupplementUsd: 20 },
      { id: "le-grande", twinShare: true, usd: 195, singleSupplementUsd: 45 },
      {
        id: "sanctuary",
        twinShare: true,
        usd: 195,
        singleSupplementUsd: 40,
        validFrom: "2025-10-01",
      },
      {
        id: "sanctuary-summer-2026",
        twinShare: true,
        usd: 165,
        singleSupplementUsd: 15,
        validFrom: "2026-04-20",
        validTo: "2026-09-30",
      },
      { id: "cruise-only", usd: 140 },
    ],
    packages: [
      { id: "standard", optionIds: ["standard"] },
      { id: "deluxe", optionIds: ["le-grande", "sanctuary", "sanctuary-summer-2026"] },
      { id: "cruise-only", optionIds: ["cruise-only"] },
    ],
    photo: "boatExterior",
  },
  {
    slug: "upstream",
    kind: "cruise",
    route: ["Luang Prabang", "Pak Beng", "Houay Xai"],
    departures: { weekdays: [1, 4] },
    options: [{ id: "standard", usd: 190 }],
    photo: "upstream",
  },
  {
    slug: "chiang-mai-land-and-cruise",
    kind: "landCruise",
    route: ["Chiang Mai", "Chiang Khong", "Pak Beng", "Luang Prabang"],
    departures: { weekdays: [2, 4, 0] },
    options: [{ id: "package", twinShare: true, usd: 455 }],
    photo: "chiangMai",
  },
  {
    slug: "nan-to-luang-prabang",
    kind: "landCruise",
    route: ["Bangkok", "Nan", "Pak Beng", "Luang Prabang"],
    departures: { weekdays: [1, 3, 5] },
    options: [],
    photo: "nan",
  },
];

export function getTripData(slug: TripSlug): TripData | undefined {
  return trips.find((trip) => trip.slug === slug);
}
