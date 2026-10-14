import type { Stay } from "./types";

/** Source: nagiofmekong.com "Hotels in Pak Beng and Luang Prabang" and "Homely stay in Houy Xai". */
export const stays: Stay[] = [
  {
    name: "Mon Savahn & Villa Mekong",
    place: "Pak Beng",
    tier: "Standard",
    description:
      "Our basic option, included in the standard cruise package: simple, air-conditioned rooms with breakfast.",
    facts: ["Air-conditioned rooms", "Breakfast included"],
    packageOptionId: "standard",
  },
  {
    name: "Le Grande Pak Beng",
    place: "Pak Beng",
    tier: "Deluxe",
    description:
      "Around 50 air-conditioned villas, most with a river view and a balcony, and a swimming pool.",
    facts: ["About 50 villas", "River views & balconies", "Swimming pool"],
    url: "http://www.legrandpakbeng.com",
    packageOptionId: "le-grande",
  },
  {
    name: "Sanctuary Pak Beng Lodge",
    place: "Pak Beng",
    tier: "Deluxe",
    description:
      "A lodge of 48 rooms, with superior fan rooms and deluxe air-conditioned rooms, and a swimming pool.",
    facts: ["48 rooms", "Fan or air-conditioned", "Swimming pool"],
    packageOptionId: "sanctuary",
  },
  {
    name: "Villa Mira",
    place: "Luang Prabang",
    tier: "3★ guest house",
    description:
      "Eleven rooms on a quiet cobbled street near Wat Xiengthong, for nights in Luang Prabang before or after the cruise.",
    facts: [
      "9 superior twin/double rooms and 2 family rooms, 27 m²",
      "Air conditioning, private shower, cable TV",
      "Safe, fridge, hairdryer, kettle with tea & coffee",
    ],
  },
  {
    name: "Homy Dormy",
    place: "Houay Xai",
    tier: "Budget",
    description:
      "Homely dormitory-style stay five minutes from the slow-boat pier, for the night before or after your cruise.",
    facts: ["4 rooms with 4 bunk beds each", "Simple breakfast", "5 minutes to the pier"],
    contact: "keophaseuth77@gmail.com",
  },
];
