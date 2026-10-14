/**
 * Organisation-wide details. Source: nagiofmekong.com (audited October 2026).
 */
export const site = {
  name: "Nagi of Mekong",
  url: "https://nagiofmekong.com",
  title: "Nagi of Mekong — Slow-boat cruises from Houay Xai to Luang Prabang",
  description:
    "Two-day Mekong river cruises between Houay Xai and Luang Prabang with a night in Pak Beng. Departures every Sunday, Wednesday and Friday. Lunch, transfers and an English-speaking host included.",
  tagline: "Cruise the majestic Mekong river in comfort and safety",
  locale: "en",

  contact: {
    phoneDisplay: "+66 95 507 3264",
    phoneHref: "tel:+66955073264",
    whatsappNumber: "66955073264",
    whatsappHref: "https://wa.me/66955073264",
    email: "adisak.star@gmail.com",
    hours: "09:00–20:00",
    replyPromise: "We reply to every booking request within 24 hours.",
    location: {
      locality: "Chiang Khong",
      region: "Chiang Rai",
      postalCode: "57140",
      country: "Thailand",
      note: "Across the river from Houay Xai, Laos",
    },
  },

  /** Headline facts used on the home page and in structured data. */
  facts: [
    { value: "2", label: "days on the river" },
    { value: "40", label: "seats, usually with room to spare" },
    { value: "3", label: "downstream departures a week" },
  ],

  boat: [
    {
      title: "Room to move",
      text: "The boat seats 40 but usually sails with empty seats, so there are comfortable seats and ample room to move around.",
    },
    {
      title: "Safety first",
      text: "Life vests for every passenger and safety equipment on board. Modern toilets, comfortable seats and tables for cards, games or postcards.",
    },
    {
      title: "Lunch cooked on board",
      text: "A freshly cooked lunch every day, with tea, coffee and refreshments. Vegan, vegetarian and halal options are available.",
    },
    {
      title: "Escorted all the way",
      text: "An English-speaking host travels with you for both days, with luggage handling, help at the border and transfers at each end.",
    },
  ],
} as const;

export type Site = typeof site;
