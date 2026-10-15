import type { StayData } from "./types";

/**
 * Hotels and stays (copy in the translation files under `stays.<id>`).
 * Source: nagiofmekong.com "Hotels in Pak Beng and Luang Prabang" and "Homely stay in Houy Xai".
 */
export const stays: StayData[] = [
  {
    id: "mon-savahn",
    name: "Mon Savahn & Villa Mekong",
    place: "Pak Beng",
    packageOptionId: "standard",
  },
  {
    id: "le-grande",
    name: "Le Grande Pak Beng",
    place: "Pak Beng",
    url: "http://www.legrandpakbeng.com",
    packageOptionId: "le-grande",
  },
  {
    id: "sanctuary",
    name: "Sanctuary Pak Beng Lodge",
    place: "Pak Beng",
    packageOptionId: "sanctuary",
  },
  { id: "villa-mira", name: "Villa Mira", place: "Luang Prabang" },
  { id: "homy-dormy", name: "Homy Dormy", place: "Houay Xai", contact: "keophaseuth77@gmail.com" },
];
