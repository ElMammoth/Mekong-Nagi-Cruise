import type { PhotoId, PhotoSlotData } from "./types";

/**
 * Every photo slot on the site. To add a photo, save it as `photos/<file>.jpg` (or .png,
 * .webp) and run `npm run build`: it is resized, converted to WebP and appears in its
 * slot with no layout change. Shot briefs: docs/06-shot-list.md.
 *
 * Alt text and captions are in the translation files (`photos.<id>`). They describe what
 * the photo is planned to show: if your photo shows something different, update them.
 */
const slots = {
  // Hero
  hero: {
    file: "nagi-of-mekong-boat-cruising-the-mekong",
    ratio: "4/3",
    shot: "The boat in full, side-on, on the river with hills behind. Morning light.",
  },

  // Journey
  riverBanks: {
    file: "mekong-riverbanks-between-houay-xai-and-pak-beng",
    ratio: "3/2",
    shot: "Landscape from on board: river, sandbanks, hills. No people needed.",
  },
  pakOuCave: {
    file: "pak-ou-cave-buddha-images",
    ratio: "3/2",
    shot: "Inside Pak Ou cave: the many Buddha images, natural light from the entrance.",
  },
  pakBeng: {
    file: "arriving-in-pak-beng-afternoon",
    ratio: "3/2",
    shot: "Arrival at Pak Beng pier, late-afternoon light, guests stepping off.",
  },

  // Villages
  village: {
    file: "riverside-village-stop-on-the-mekong",
    ratio: "3/2",
    shot: "Guests on the village path with the host. Ask permission before photographing residents.",
  },

  // Boat
  boatExterior: {
    file: "nagi-of-mekong-boat-at-the-pier",
    ratio: "3/2",
    shot: "The whole boat at the pier, bow three-quarter view, clean deck.",
  },
  boatInterior: {
    file: "nagi-of-mekong-boat-seats-and-tables",
    ratio: "4/3",
    shot: "Interior from the bow looking aft: seats, tables, open windows, a few relaxed guests.",
  },

  // Food
  lunch: {
    file: "freshly-cooked-lunch-on-board",
    ratio: "4/3",
    shot: "The lunch buffet laid out on board, top-down or 45°, with the river in the background.",
  },

  // Team
  host: {
    file: "english-speaking-host-with-guests",
    ratio: "4/3",
    shot: "The host with guests, natural and smiling, on deck.",
  },
  crew: {
    file: "nagi-of-mekong-crew-at-the-pier",
    ratio: "4/3",
    shot: "Group photo of the crew and host in front of the boat.",
  },

  // Trip headers
  upstream: {
    file: "luang-prabang-pier-early-morning",
    ratio: "3/2",
    shot: "The boat at the Luang Prabang pier at dawn, guests boarding.",
  },
  chiangMai: {
    file: "white-temple-chiang-rai",
    ratio: "3/2",
    shot: "The White Temple, a stop on day 3 of the Chiang Mai land and cruise program.",
  },
  nan: {
    file: "nan-temple-and-old-town",
    ratio: "3/2",
    shot: "One of Nan's temples visited on day 1 of the Nan program.",
  },
  charter: {
    file: "private-group-on-board",
    ratio: "3/2",
    shot: "The boat set up for a group (theatre or classroom style), people engaged.",
  },
} satisfies Record<PhotoId, PhotoSlotData>;

export const photoSlots: Record<PhotoId, PhotoSlotData> = slots;
