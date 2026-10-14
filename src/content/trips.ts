import type { Trip } from "./types";

/**
 * Cruises and land + cruise journeys.
 * Source: nagiofmekong.com pages "Home & downstream cruise", "Upstream cruises",
 * "Pre-cruise program" and "Nan - Luang Prabang" (audited October 2026).
 *
 * To change a price, edit the numbers below. To run a seasonal offer, add an option with
 * `validFrom` / `validTo`: it appears and disappears on its own (the site re-checks on each build).
 */
export const trips: Trip[] = [
  {
    slug: "downstream",
    name: "Downstream cruise: Houay Xai to Luang Prabang",
    shortName: "Downstream · Houay Xai → Luang Prabang",
    kind: "River cruise",
    summary:
      "Two days down the Mekong from the Thai–Lao border to the UNESCO World Heritage town of Luang Prabang, with a night in Pak Beng at the hotel of your choice.",
    route: ["Houay Xai", "Pak Beng", "Luang Prabang"],
    duration: "2 days · 1 night",
    departures: {
      weekdays: [0, 3, 5],
      label: "Boat leaves Houay Xai",
    },
    options: [
      {
        id: "standard",
        twinShare: true,
        label: "Standard hotel",
        detail: "Air-conditioned room in Pak Beng with breakfast.",
        perPerson: { USD: 160, EUR: 150 },
        singleSupplement: { USD: 20, EUR: 15 },
      },
      {
        id: "le-grande",
        twinShare: true,
        label: "Le Grande Pak Beng",
        detail: "Premium hotel with swimming pool, breakfast included.",
        perPerson: { USD: 195, EUR: 185 },
        singleSupplement: { USD: 45, EUR: 50 },
      },
      {
        id: "sanctuary",
        twinShare: true,
        label: "Sanctuary Pak Beng Lodge",
        detail: "Lodge with swimming pool, breakfast included.",
        perPerson: { USD: 195, EUR: 180 },
        singleSupplement: { USD: 40 },
        validFrom: "2025-10-01",
      },
      {
        id: "sanctuary-summer-2026",
        twinShare: true,
        label: "Sanctuary Pak Beng Lodge — summer offer",
        detail: "Seasonal promotion.",
        perPerson: { USD: 165 },
        singleSupplement: { USD: 15 },
        validFrom: "2026-04-20",
        validTo: "2026-09-30",
        badge: "Summer offer",
      },
      {
        id: "cruise-only",
        label: "Cruise only",
        detail:
          "Seat on the boat, both lunches, sightseeing and transfers. You arrange your own night in Pak Beng.",
        perPerson: { THB: 4900, USD: 140, EUR: 130 },
      },
    ],
    included: [
      "Hotel pick-up in Chiang Khong or Houay Xai and transfer to the pier",
      "Luggage handling and help with the border crossing and visa on arrival",
      "Travel insurance",
      "Two-day escorted cruise with an English-speaking host",
      "Freshly cooked lunch and refreshments each day (vegan, vegetarian and halal options)",
      "Sightseeing stops, including Pak Ou cave",
      "One night in Pak Beng at the hotel you choose (not in “cruise only”)",
      "Transfer from the Luang Prabang pier to your hotel",
    ],
    notIncluded: [
      "Lao visa fee, payable in US dollars, plus one passport photo",
      "Personal expenses",
    ],
    itinerary: [
      {
        label: "Day 1",
        title: "Houay Xai to Pak Beng",
        meals: "Lunch",
        stops: [
          {
            title: "Hotel pick-up",
            text: "After breakfast we collect you from your hotel in Chiang Khong or Houay Xai, look after your luggage and help you through the border and visa on arrival.",
          },
          {
            title: "On board",
            text: "Tea and coffee once you are settled, then watch daily life along the banks of the Mekong.",
          },
          { title: "Village stop", text: "A visit to a rural village on the riverbank." },
          { title: "Hot lunch on board" },
          {
            title: "Pak Beng",
            text: "Afternoon arrival and transfer to your hotel. The evening is yours.",
          },
        ],
      },
      {
        label: "Day 2",
        title: "Pak Beng to Luang Prabang",
        meals: "Breakfast at your hotel, lunch on board",
        stops: [
          { title: "Back on the river", text: "Board after breakfast for the final leg." },
          { title: "Ethnic village stop" },
          {
            title: "Lunch on board",
            text: "Elephants bathing and gold panning may be seen along the riverbank.",
          },
          {
            title: "Pak Ou cave",
            text: "The cave temple and its many Buddha images.",
          },
          {
            title: "Luang Prabang",
            text: "From the pier, a tuk-tuk or minivan takes you to where you are staying in town.",
          },
        ],
      },
    ],
    goodToKnow: [
      "Bring US dollars and one passport photo for the Lao visa on arrival.",
      "Cruise-only seats are available on every departure.",
      "Book by email or WhatsApp; we confirm within 24 hours.",
    ],
    seo: {
      title: "Downstream Mekong cruise, Houay Xai to Luang Prabang",
      description:
        "Two-day slow-boat cruise from Houay Xai to Luang Prabang with a night in Pak Beng. Sundays, Wednesdays and Fridays. From US$140 per person.",
    },
  },
  {
    slug: "upstream",
    name: "Upstream cruise: Luang Prabang to Houay Xai",
    shortName: "Upstream · Luang Prabang → Houay Xai",
    kind: "River cruise",
    summary:
      "The same river journey in reverse, from Luang Prabang up to the Thai border at Houay Xai, arriving in time to cross into Chiang Khong.",
    route: ["Luang Prabang", "Pak Beng", "Houay Xai"],
    duration: "2 days · 1 night",
    departures: {
      weekdays: [1, 4],
      label: "Boat leaves Luang Prabang",
      note: "A minimum number of passengers is required.",
    },
    options: [
      {
        id: "standard",
        label: "Cruise with Pak Beng hotel",
        detail: "Mekong Riverside Lodge, BKC Villa or similar, with breakfast.",
        perPerson: { USD: 190, EUR: 190 },
      },
    ],
    included: [
      "Early-morning hotel pick-up in Luang Prabang and transfer to the pier",
      "Simple breakfast, coffee and tea on board on day one",
      "Freshly cooked lunch on board each day",
      "Stops at Pak Ou cave and riverside villages",
      "One night in Pak Beng with breakfast",
      "Transfer to the Lao–Thai border and a bus ticket across to Chiang Khong",
    ],
    notIncluded: [
      "Premium hotels in Pak Beng (Sanctuary Pak Beng Lodge or Le Grande Pak Beng): available at extra cost, ask us",
    ],
    itinerary: [
      {
        label: "Day 1",
        title: "Luang Prabang to Pak Beng",
        meals: "Breakfast and lunch on board",
        stops: [
          {
            title: "Early pick-up",
            text: "From your hotel to the pier, then a simple breakfast, coffee and tea on board.",
          },
          { title: "Pak Ou cave" },
          { title: "Ethnic Lao village" },
          { title: "Lunch cooked on board" },
          {
            title: "Pak Beng",
            text: "Afternoon arrival. Explore the small town in the evening; your host can suggest places to eat.",
          },
        ],
        note: "Pak Beng can be very cold from November to January. Bring warm clothes or a jacket.",
      },
      {
        label: "Day 2",
        title: "Pak Beng to Houay Xai",
        meals: "Breakfast at your hotel, lunch on board",
        stops: [
          { title: "Check out and board", text: "Breakfast at your hotel, then the final leg." },
          { title: "Village stop", text: "One stop at a village along the river." },
          { title: "Lunch on board" },
          {
            title: "Houay Xai, around 16:30",
            text: "In time to cross to Thailand: transfer to the border and a bus ticket to Chiang Khong for your onward journey.",
          },
        ],
      },
    ],
    goodToKnow: [
      "Combine it with two or three days overland in northern Thailand, from Chiang Khong to Chiang Mai via Chiang Rai. Ask us for a plan.",
      "Premium hotels in Pak Beng are available for a small extra cost.",
    ],
    seo: {
      title: "Upstream Mekong cruise, Luang Prabang to Houay Xai",
      description:
        "Two-day slow-boat cruise up the Mekong from Luang Prabang to Houay Xai via Pak Beng. Mondays and Thursdays. US$190 per person.",
    },
  },
  {
    slug: "chiang-mai-land-and-cruise",
    name: "Chiang Mai, Golden Triangle and the Mekong",
    shortName: "Land & cruise · Chiang Mai → Luang Prabang",
    kind: "Land & cruise",
    summary:
      "Five days from Chiang Mai to Luang Prabang: two nights in Chiang Mai, a scenic drive to the Mekong via the White Temple and the Golden Triangle, then the two-day downstream cruise.",
    route: ["Chiang Mai", "Chiang Khong", "Pak Beng", "Luang Prabang"],
    duration: "5 days · 4 nights",
    departures: {
      weekdays: [2, 4, 0],
      label: "Arrive in Chiang Mai",
      note: "Arrive Tuesday for Friday’s boat, Thursday for Sunday’s, or Sunday for Wednesday’s.",
    },
    minimum: "Minimum 2 people. Families of 3 or more: email us for the right price.",
    options: [
      {
        id: "package",
        twinShare: true,
        label: "Full program",
        detail: "Twin or double sharing, everything listed below.",
        perPerson: { THB: 15470, USD: 455, EUR: 455 },
      },
    ],
    included: [
      "Air-conditioned private car or minivan transfers with an English-speaking guide",
      "Two nights at the Dusit Princess Chiang Mai (4★) or similar, with breakfast",
      "Chiang Mai to Chiang Khong drive with sightseeing stops, lunch, admission fees and an English-speaking escort",
      "One night at a 4★ hotel in Chiang Khong with breakfast",
      "Two-day cruise with daily lunch, Pak Beng accommodation and sightseeing stops",
      "Insurance",
    ],
    notIncluded: ["Personal expenses", "Alcoholic drinks", "Visa fees"],
    itinerary: [
      {
        label: "Days 1–2",
        title: "Chiang Mai",
        meals: "Breakfast",
        stops: [
          {
            title: "Meet and greet at Chiang Mai airport",
            text: "Transfer to the Dusit Princess, a 4★ hotel in the city centre, two minutes’ walk from the night market.",
          },
          {
            title: "Free time",
            text: "Optional tours and excursions can be arranged, or a tailor-made program.",
          },
        ],
      },
      {
        label: "Day 3",
        title: "Chiang Mai to Chiang Khong",
        meals: "Breakfast, lunch",
        stops: [
          { title: "Scenic drive of about 300 km" },
          { title: "Hot spring and the White Temple" },
          {
            title: "Golden Triangle",
            text: "Including the Hall of Opium.",
          },
          { title: "Lunch at a local restaurant" },
          {
            title: "Chiang Khong",
            text: "Overnight at Chiang Khong Teak Garden or Fortune Riverview.",
          },
        ],
      },
      {
        label: "Days 4–5",
        title: "Down the Mekong to Luang Prabang",
        meals: "Lunch on board each day",
        stops: [
          {
            title: "Two-day downstream cruise",
            text: "With a night in Pak Beng, freshly cooked lunches and sightseeing stops, as in the downstream cruise.",
          },
        ],
      },
    ],
    goodToKnow: [
      "Choose your arrival day to match a boat departure: Tuesday, Thursday or Sunday.",
      "We can add tours in Chiang Mai or build a tailor-made program.",
    ],
    seo: {
      title: "Chiang Mai to Luang Prabang: 5-day land and Mekong cruise",
      description:
        "Five days from Chiang Mai to Luang Prabang via the White Temple, the Golden Triangle and a two-day Mekong cruise. US$455 per person.",
    },
  },
  {
    slug: "nan-to-luang-prabang",
    name: "Nan to Luang Prabang overland and by river",
    shortName: "Land & cruise · Nan → Luang Prabang",
    kind: "Land & cruise",
    summary:
      "Four days from the northern Thai town of Nan, across the border at Huai Kon to Pak Beng, then a day on the Mekong to Luang Prabang.",
    route: ["Bangkok", "Nan", "Pak Beng", "Luang Prabang"],
    duration: "4 days · 3 nights",
    departures: {
      weekdays: [1, 3, 5],
      label: "Arrive in Nan",
    },
    priceOnRequest: "Prices on request: email us and we’ll send a quote.",
    options: [],
    included: [
      "One-way economy flight Bangkok → Nan (15 kg checked, 7 kg cabin bag)",
      "Transfers and tours as described with an English-speaking guide (driver only from the Lao border to Pak Beng)",
      "Meals as stated in the program",
      "Admission fees",
      "3★ hotels in Nan and Pak Beng",
      "One-day cruise Pak Beng → Luang Prabang with lunch, refreshments and stops at a village and Pak Ou cave",
      "Transfer from the Luang Prabang pier to the city centre",
    ],
    notIncluded: [],
    itinerary: [
      {
        label: "Day 1",
        title: "Arrive in Nan",
        stops: [
          {
            title: "Meet and greet at Nan airport",
            text: "Transfer to a city-centre hotel.",
          },
          { title: "Afternoon visit to Nan’s most outstanding temples" },
          {
            title: "Night market",
            text: "Hundreds of stalls with food, local souvenirs and handicrafts.",
          },
        ],
      },
      {
        label: "Day 2",
        title: "Markets, villages and a farm lunch",
        meals: "Breakfast, lunch",
        stops: [
          {
            title: "Local markets and villages",
            text: "Including the chicken-coop sauna and massage.",
          },
          { title: "Northern Thai lunch in a farming setting" },
          { title: "Afternoon at leisure" },
        ],
      },
      {
        label: "Day 3",
        title: "Across the border to Pak Beng",
        meals: "Breakfast, lunch",
        stops: [
          {
            title: "Through farmland and rice fields",
            text: "With stops in Pua district and lunch at a local restaurant; a Thailand Community Based Tourism day.",
          },
          {
            title: "Huai Kon border",
            text: "Thai passport formalities, then a Lao driver takes you through Lao immigration.",
          },
          {
            title: "Pak Beng",
            text: "About 55 km, roughly one hour, to the hotel of your choice in this small riverside village.",
          },
        ],
        note: "You must get your Lao visa before you travel, from a Lao embassy at home or in Bangkok, stating you will enter Laos at Muang Ngeun, Xayaboury province.",
      },
      {
        label: "Day 4",
        title: "Pak Beng to Luang Prabang by boat",
        meals: "Breakfast, lunch on board",
        stops: [
          { title: "Board the Nagi of Mekong", text: "A one-day downstream river trip." },
          { title: "Riverside villages and Pak Ou cave" },
          {
            title: "Luang Prabang",
            text: "Afternoon arrival and transfer to a city-centre hotel.",
          },
        ],
      },
    ],
    goodToKnow: [
      "A Lao visa obtained in advance is required for this route.",
      "Arrival days in Nan: Monday, Wednesday or Friday.",
    ],
    seo: {
      title: "Nan to Luang Prabang: 4-day overland and Mekong journey",
      description:
        "Four days from Nan in northern Thailand to Luang Prabang via the Huai Kon border, Pak Beng and a day on the Mekong.",
    },
  },
];

export function getTrip(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}
