/**
 * Organisation-wide details. Source: nagiofmekong.com (audited October 2026).
 */
export const site = {
  name: "Nagi of Mekong",
  url: "https://nagiofmekong.com",
  title: "Mekong slow boat cruise, Houay Xai to Luang Prabang · Nagi of Mekong",
  description:
    "Two days on the Mekong from Houay Xai (Chiang Khong) to Luang Prabang via Pak Beng, door to door: pick-up, border help, lunch and hotel included. From US$140.",
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

  /** Short phrase looped in the hero ribbon (complements the h1, never replaces it). */
  loopPhrase: "Door to door on the Mekong",

  /** Name of the core offer (docs/04-offer-brief.md §4). */
  offerName: "The two-day Mekong cruise, door to door",

  /**
   * The offer, as the problems a traveller would otherwise solve alone, each matched to
   * something already included in the downstream cruise (see docs/04-offer-brief.md).
   */
  handledForYou: [
    {
      task: "Getting from your hotel to the pier",
      handled: "Hotel pick-up in Chiang Khong or Houay Xai and transfer to the pier",
    },
    {
      task: "The Thai–Lao border and visa on arrival",
      handled: "Help with the border crossing and the visa on arrival",
    },
    { task: "Carrying bags through the border and on board", handled: "Luggage handling" },
    {
      task: "Finding food for a long day on the river",
      handled: "A freshly cooked lunch each day, with vegan, vegetarian and halal options",
    },
    {
      task: "Finding a bed in Pak Beng",
      handled: "One night at the hotel you choose, with breakfast",
    },
    {
      task: "Knowing where to stop along the way",
      handled: "Village stops and Pak Ou cave, with an English-speaking host",
    },
    {
      task: "Getting from the Luang Prabang pier into town",
      handled: "Transfer to your hotel in Luang Prabang",
    },
    { task: "Worrying about the unexpected", handled: "Travel insurance and life vests for all" },
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
