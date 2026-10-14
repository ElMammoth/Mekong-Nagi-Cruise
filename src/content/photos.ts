import type { PhotoSlot } from "./types";

/**
 * Every photo slot on the site. To add a photo, save it as `photos/<file>.jpg` (or .png,
 * .webp) and run `npm run build`: it is resized, converted to WebP and appears in its
 * slot with no layout change. Shot briefs: docs/06-shot-list.md.
 *
 * Alt text describes what the photo is planned to show. If your photo shows something
 * different, update `alt` to match.
 */
const slots = {
  // Hero
  hero: {
    file: "nagi-of-mekong-boat-cruising-the-mekong",
    alt: "The Nagi of Mekong slow boat cruising on the Mekong with hills behind",
    ratio: "4/3",
    shot: "The boat in full, side-on, on the river with hills behind. Morning light.",
  },

  // Journey
  riverBanks: {
    file: "mekong-riverbanks-between-houay-xai-and-pak-beng",
    alt: "Sandbanks, rocks and forested hills along the Mekong seen from the deck",
    ratio: "3/2",
    shot: "Landscape from on board: river, sandbanks, hills. No people needed.",
  },
  pakOuCave: {
    file: "pak-ou-cave-buddha-images",
    alt: "Rows of Buddha images inside Pak Ou cave above the Mekong",
    ratio: "3/2",
    shot: "Inside Pak Ou cave: the many Buddha images, natural light from the entrance.",
  },
  pakBeng: {
    file: "arriving-in-pak-beng-afternoon",
    alt: "The boat moored at Pak Beng in the late afternoon",
    ratio: "3/2",
    shot: "Arrival at Pak Beng pier, late-afternoon light, guests stepping off.",
  },

  // Villages
  village: {
    file: "riverside-village-stop-on-the-mekong",
    alt: "Travellers walking through a riverside village during a stop on the cruise",
    ratio: "3/2",
    shot: "Guests on the village path with the host. Ask permission before photographing residents.",
  },

  // Boat
  boatExterior: {
    file: "nagi-of-mekong-boat-at-the-pier",
    alt: "The Nagi of Mekong boat moored at the pier, ready for boarding",
    ratio: "3/2",
    shot: "The whole boat at the pier, bow three-quarter view, clean deck.",
  },
  boatInterior: {
    file: "nagi-of-mekong-boat-seats-and-tables",
    alt: "Rows of comfortable seats and tables inside the boat with river views on both sides",
    ratio: "4/3",
    shot: "Interior from the bow looking aft: seats, tables, open windows, a few relaxed guests.",
    caption: "Comfortable seats and ample room to move around",
  },

  // Food
  lunch: {
    file: "freshly-cooked-lunch-on-board",
    alt: "A buffet of freshly cooked dishes served on board for lunch",
    ratio: "4/3",
    shot: "The lunch buffet laid out on board, top-down or 45°, with the river in the background.",
    caption: "Buffet-style, freshly cooked lunches are served daily",
  },

  // Team
  host: {
    file: "english-speaking-host-with-guests",
    alt: "The English-speaking host talking with guests on deck",
    ratio: "4/3",
    shot: "The host with guests, natural and smiling, on deck.",
    caption: "An English-speaking host travels with you for both days",
  },
  crew: {
    file: "nagi-of-mekong-crew-at-the-pier",
    alt: "The Nagi of Mekong crew standing together in front of the boat",
    ratio: "4/3",
    shot: "Group photo of the crew and host in front of the boat.",
  },

  // Trip headers
  upstream: {
    file: "luang-prabang-pier-early-morning",
    alt: "Early-morning departure from the Luang Prabang pier",
    ratio: "3/2",
    shot: "The boat at the Luang Prabang pier at dawn, guests boarding.",
  },
  chiangMai: {
    file: "white-temple-chiang-rai",
    alt: "The White Temple in Chiang Rai province, a stop on the drive to the Mekong",
    ratio: "3/2",
    shot: "The White Temple, a stop on day 3 of the Chiang Mai land and cruise program.",
  },
  nan: {
    file: "nan-temple-and-old-town",
    alt: "A temple in the town of Nan, northern Thailand",
    ratio: "3/2",
    shot: "One of Nan's temples visited on day 1 of the Nan program.",
  },
  charter: {
    file: "private-group-on-board",
    alt: "A private group seated on board for a meeting on the Mekong",
    ratio: "3/2",
    shot: "The boat set up for a group (theatre or classroom style), people engaged.",
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoId = keyof typeof slots;
export const photos: Record<PhotoId, PhotoSlot> = slots;
