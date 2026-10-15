/**
 * English copy: the source of truth for every translation key.
 *
 * Every other language file is typed as `Messages` (the shape of this file), so a missing
 * or extra key fails `npm run typecheck` and the build. `npm test` also checks that lists
 * have the same length and that `{placeholders}` and `<tags>` match in every language.
 *
 * Conventions:
 *  - `{name}` is a value filled in by the code (a price, a date, a count…).
 *  - `<link>text</link>` marks text that becomes a link; keep the tags, translate the text.
 *  - `{price:option-id}` (FAQ answers) is replaced by the live price of that option.
 *  - Place names (Houay Xai, Pak Beng, Luang Prabang…), hotel names and "Nagi of Mekong"
 *    are never translated.
 */
const en = {
  meta: {
    siteTitle: "Mekong slow boat cruise, Houay Xai to Luang Prabang · Nagi of Mekong",
    siteDescription:
      "Two days on the Mekong from Houay Xai (Chiang Khong) to Luang Prabang via Pak Beng, door to door: pick-up, border help, lunch and hotel included. From {from}.",
    tagline: "Cruise the majestic Mekong river in comfort and safety",
    ogAlt: "Nagi of Mekong: slow-boat cruises from Houay Xai to Luang Prabang",
    notFoundTitle: "Page not found",
  },

  common: {
    skipToContent: "Skip to content",
    home: "Home",
    breadcrumb: "Breadcrumb",
    perPerson: "per person",
    perPersonShort: "/ person",
    from: "From",
    priceOnRequest: "Price on request",
    opensNewTab: "(opens in a new tab)",
    askOnWhatsApp: "Ask on WhatsApp",
    whatsapp: "WhatsApp",
    call: "Call",
    included: "Included",
    notIncluded: "Not included",
    meals: "Meals:",
    route: "Route",
    routeTo: "to",
    keyFacts: "Key facts",
    photo: "Photo",
    placeholder: "Placeholder",
    pauseMotion: "Pause the moving text",
  },

  nav: {
    main: "Main",
    mobile: "Mobile",
    footer: "Footer",
    homeLabel: "{name}, home",
    cruises: "Cruises",
    whereToStay: "Where to stay",
    charters: "Private charters",
    guide: "Route guide",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    menuDescription: "Site navigation, language, currency and contact options",
    visit: "Visit",
    talkToUs: "Talk to us",
    whatsappNumber: "WhatsApp {phone}",
    open: "Open {hours}",
    bookingLabel: "Check availability",
  },

  switcher: {
    region: "Language and currency",
    language: "Language",
    currency: "Currency",
    languageButton: "Language: {name}",
    currencyButton: "Currency: {name}",
    currencyHint: "Prices are charged in US dollars. Other currencies are shown for guidance.",
  },

  /** Shown to visitors whose browser prefers this language, written in this language. */
  banner: {
    label: "Language",
    text: "This page is also available in English.",
    accept: "Read in English",
    dismiss: "No thanks",
    dismissLabel: "Close and stay in this language",
  },

  currency: {
    approx: "about {amount}",
    /** Under prices when a currency other than US dollars is selected. */
    note: "Amounts in {currency} are approximate. Bookings are charged in US dollars.",
    /** Under prices in US dollars (same height, so switching causes no layout shift). */
    noteUsd: "Prices in US dollars, the currency bookings are charged in.",
    rates: "Exchange rate: European Central Bank via Frankfurter, {date}.",
    ratesTitle: "Rates of {date}",
    noRates: "Exchange rates are unavailable: prices are shown in US dollars.",
  },

  facts: [
    { value: "2", label: "days on the river" },
    { value: "40", label: "seats, usually with room to spare" },
    { value: "3", label: "downstream departures a week" },
  ],

  contact: {
    replyPromise: "We reply to every booking request within 24 hours.",
    country: "Thailand",
    locationNote: "Across the river from Houay Xai, Laos",
  },

  home: {
    offerName: "The two-day Mekong cruise, door to door",
    title: "Houay Xai to Luang Prabang, in comfort and safety",
    intro:
      "Two days down the Mekong, with a night in Pak Beng. We pick you up from your hotel in Chiang Khong or Houay Xai, help you across the border, serve lunch on board and drop you off at your hotel in Luang Prabang.",
    departures: "Departures",
    loopPhrase: "Two days by slow boat to Luang Prabang",
    freeToAsk: "Free to ask, no commitment.",
    journeyEyebrow: "The journey",
    journeyTitle: "Two days on the river",
    dayChip: "D{n}",
    dayLabel: "Day {n}:",
    fullItinerary: "See the full downstream itinerary",
    compareHotels: "Compare the Pak Beng hotels",
    onboardEyebrow: "On board the Nagi of Mekong",
    onboardTitle: "A river cruise to reminisce",
    onboardIntro:
      "We are a mid-range cruise operator: a comfortable, safe boat, a fresh lunch every day and a host who looks after the details from the pier to your hotel.",
    moreEyebrow: "More ways to travel",
    moreTitle: "Going upstream, or starting further away?",
    moreIntro:
      "Sail up from Luang Prabang, or start in Chiang Mai or Nan and let us handle the road to the river.",
    readGuide: "Read the route guide",
    faqEyebrow: "Good to know",
    faqTitle: "Questions before you sail",
    allQuestions: "All questions about visas, food and weather",
  },

  packagesSection: {
    eyebrow: "Prices per person",
    title: "Same boat, choose your night in Pak Beng",
    intro:
      "Every package includes the pick-up, the border help, both lunches, the stops and the transfers. What changes is where you sleep.",
  },

  handled: {
    eyebrow: "Door to door",
    title: "Everything between your hotel and Luang Prabang, handled",
    intro:
      "Travelling the river on your own means sorting out each of these yourself. On the Nagi of Mekong they’re part of the trip.",
    onYourOwn: "On your own, you’d sort out…",
    withUs: "With us",
    onYourOwnSr: "On your own:",
    rows: [
      {
        task: "Getting from your hotel to the pier",
        handled: "We pick you up at your hotel and drive you to the pier.",
      },
      {
        task: "The Thai–Lao border and visa on arrival",
        handled: "We help you cross the border and get your visa.",
      },
      {
        task: "Carrying bags through the border and on board",
        handled: "We carry your luggage for you.",
      },
      {
        task: "Finding food for a long day on the river",
        handled: "We cook a fresh lunch every day, with vegan and halal options.",
      },
      {
        task: "Finding a bed in Pak Beng",
        handled: "We book your hotel in Pak Beng, with breakfast.",
      },
      {
        task: "Knowing where to stop along the way",
        handled: "We stop at villages and Pak Ou Cave, with an English-speaking host.",
      },
      {
        task: "Getting from the Luang Prabang pier into town",
        handled: "We drive you from the pier to your hotel in Luang Prabang.",
      },
      {
        task: "Worrying about the unexpected",
        handled: "We give everyone travel insurance and a life vest.",
      },
    ],
  },

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

  reviews: {
    eyebrow: "Reviews",
    title: "What travellers say",
    intro:
      "Unedited reviews from Tripadvisor and Viator, each linked to the original, in the language they were written in.",
    ratingsLabel: "Traveller ratings",
    reviewCount: "{count} reviews",
    asOf: "as of {date}",
    note: "Total reviews and rating from Viator & Tripadvisor",
    copiedOn: "Ratings and reviews copied from each platform on {date}.",
    showAll: "Show all {count} reviews",
    readAllOn: "Read all reviews on {name}",
    seeAllOn: "(see all reviews on {name}, opens in a new tab)",
    written: "Written {date}",
    reviewFrom: "Review from",
    readOn: "Read on {name}",
    language: "Review language:",
    rated: "Rated {rating} out of 5",
    levels: {
      "5": "Excellent",
      "4": "Very good",
      "3": "Average",
      "2": "Poor",
      "1": "Terrible",
    },
  },

  tiktok: {
    eyebrow: "On TikTok",
    title: "What travellers say on TikTok",
    intro:
      "Travellers who sailed with us and filmed it. Their videos and their captions, unedited and in their own words. These are not ratings.",
    play: "Play TikTok by @{handle}",
    privacy: "Plays from TikTok after you click. TikTok may then set cookies.",
    watchOn: "Watch on TikTok",
    opensTikTok: "Opens TikTok",
    captionLabel: "Caption by @{handle}:",
    showMore: "Show full caption",
    showLess: "Show less",
    dialogTitle: "TikTok by @{handle}",
    dialogDescription: "The video is loaded from TikTok. Press Escape or Close to return.",
    close: "Close",
    loading: "Loading the video from TikTok…",
    retrieved: "Captions as published on TikTok, copied on {date}.",
    placeholder: "Caption not available yet: add it in src/content/tiktok.ts.",
  },

  trip: {
    duration: "Duration",
    group: "Group",
    groupDefault: "Up to 40 passengers on board",
    includedEyebrow: "Handled for you",
    includedTitle: "What’s included",
    includedIntro:
      "Everything below is part of the price, so there’s nothing to organise on the way.",
    itineraryEyebrow: "Day by day",
    itineraryTitle: "Itinerary",
    pricesEyebrow: "Prices",
    pricesTitle: "Prices per person",
    pricesOnRequestTitle: "Prices on request",
    knowEyebrow: "Before you go",
    knowTitle: "Good to know",
    asideLabel: "Book this trip",
    askEarly: "{note} Ask early.",
    bookIntro:
      "Pick a departure and tell us who is coming. Sending a request is free and doesn’t commit you.",
    dayOne: "{stop} on day one",
    moreEyebrow: "More ways to travel",
    moreTitle: "Other journeys",
    seeItinerary: "See itinerary & prices",
    twinShare: ", twin or double sharing",
    singleSupplement: "Single supplement {price}",
    singleSupplementInline: "single supplement {price}",
    offerEnds: "Offer ends {date}",
    validUntil: "Valid until {date}",
    validFrom: "From {date}",
    kind: { cruise: "River cruise", landCruise: "Land & cruise" },
  },

  nextSailings: {
    label: "Next sailings",
    every: "every {days}",
  },

  nextSteps: {
    stepSr: "Step {n}:",
    defaultDayOne: "Hotel pick-up on departure morning",
    send: {
      title: "You send your request",
      text: "A pre-filled WhatsApp or email message. It’s free and doesn’t commit you.",
    },
    confirm: {
      title: "We confirm within 24 hours",
      text: "Availability on your date and the final price.",
    },
    travel: { title: "You travel" },
  },

  cta: {
    title: "Send your dates, we’ll handle the rest",
    text: "Tell us when you’d like to sail and how many of you are travelling.",
    orCall: "Or call",
    orEmail: "or email",
  },

  booking: {
    checkCount: { one: "Please check one detail", other: "Please check {count} details" },
    stepTrip: "Your trip",
    tripField: "Cruise or journey",
    dateHint: "Pick a date or tell us you’re flexible.",
    chooseDate: "{label}: choose a date",
    anotherDate: "Another date",
    flexible: "I’m flexible",
    flexibleLabel: "Another date or I’m flexible",
    loadingDates: "Loading the next departures…",
    stepTravellers: "Travellers & stay",
    travellers: "Number of travellers",
    fewer: "One traveller fewer",
    more: "One more traveller",
    nightIn: "Night in Pak Beng",
    alsoAsk: "Also ask us about",
    optional: "(optional)",
    alsoAskHint: "We’ll include it in our reply. No commitment.",
    stepDetails: "Your details",
    name: "Full name",
    email: "Email",
    phone: "Phone or WhatsApp",
    diet: "Dietary needs",
    dietHint: "Vegan, vegetarian and halal available",
    message: "Anything else?",
    summary: "Booking summary",
    yourRequest: "Your request",
    trip: "Trip",
    date: "Date",
    flexibleShort: "Flexible",
    notChosen: "Not chosen yet",
    travellersShort: "Travellers",
    option: "Option",
    alsoAsking: "Also asking",
    estimate: "Estimated total",
    estimateFor: { one: "for {count} traveller", other: "for {count} travellers" },
    basedOn: "Based on published prices",
    inclSupplement: ", incl. single supplement",
    weConfirm: "We confirm the final price.",
    quote: "We’ll send you a quote.",
    sendWhatsApp: "Send on WhatsApp",
    sendEmail: "Send by email",
    nothingCharged:
      "Nothing is charged online. Your message opens in WhatsApp or your email app, ready to send.",
    readyIn: "Your request is ready in {channel}. Press send there.",
    channelWhatsApp: "WhatsApp",
    channelEmail: "your email app",
    nothingOpened: "Nothing opened? Write to {email} or call {phone}.",
    errors: {
      name: "Please tell us your name.",
      trip: "Choose a cruise or journey.",
      travellers: "Travellers must be between 1 and 40.",
      email: "This email address doesn’t look right.",
    },
  },

  faqPage: {
    title: "Mekong cruise FAQ: Lao visa, border, food and weather",
    description:
      "Answers before you sail: hotel pick-up and the Thai–Lao border, the Lao visa on arrival, lunch on board, cruise-only seats and the cold season in Pak Beng.",
    eyebrow: "Plan your trip",
    heading: "Mekong cruise questions, answered",
    intro:
      "From the border crossing to what’s for lunch: the practical side of two days on the Mekong.",
    essentialsEyebrow: "Essentials",
    essentialsTitle: "The practical side",
    essentials: [
      {
        title: "Pick-up & border",
        text: "We collect you from your hotel in Chiang Khong or Houay Xai, handle your luggage and help you through the Thai and Lao border formalities.",
      },
      {
        title: "Lao visa",
        text: "For the downstream cruise, bring the visa-on-arrival fee in US dollars and one passport photo. The Nan route requires a visa obtained in advance from a Lao embassy.",
      },
      {
        title: "Food on board",
        text: "A freshly cooked lunch every day plus tea, coffee and refreshments. Vegan, vegetarian and halal options: just let us know.",
      },
      {
        title: "Weather",
        text: "Pak Beng can be very cold from November to January. Pack warm clothes or a jacket.",
      },
    ],
    links:
      "Step-by-step route, border and packing advice: <guide>the Houay Xai to Luang Prabang route guide</guide>. Coming from further away? Start in <chiangMai>Chiang Mai</chiangMai> or <nan>Nan</nan> and we take care of the road to the river.",
    boatEyebrow: "The boat",
    boatTitle: "Comfort and safety on board",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
  },

  faq: [
    {
      question: "How do I book?",
      answer:
        "Send us a request through the booking form, by WhatsApp or by email with your preferred departure date, number of travellers and Pak Beng hotel. We reply within 24 hours to confirm.",
    },
    {
      question: "Which days does the boat leave?",
      answer:
        "Downstream from Houay Xai to Luang Prabang on Sunday, Wednesday and Friday. Upstream from Luang Prabang to Houay Xai on Monday and Thursday; upstream departures need a minimum number of passengers.",
    },
    {
      question: "Where do you pick us up?",
      answer:
        "From your hotel in Chiang Khong (Thailand) or Houay Xai (Laos). We transfer you to the pier, handle your luggage and help you through the border.",
    },
    {
      question: "Do I need a visa for Laos?",
      answer:
        "On the downstream cruise we assist with the visa on arrival: bring the fee in US dollars and one passport photo. On the Nan route you must get your Lao visa in advance from a Lao embassy.",
    },
    {
      question: "What is served on board?",
      answer:
        "A freshly cooked lunch every day with tea, coffee and refreshments. Vegan, vegetarian and halal options are available; tell us when you book.",
    },
    {
      question: "Can I book the boat without a hotel in Pak Beng?",
      answer:
        "Yes. Cruise-only seats are available on every departure for {price:cruise-only} per person. You arrange your own night in Pak Beng.",
    },
    {
      question: "Is it cold on the river?",
      answer: "Pak Beng can be very cold from November to January. Bring warm clothes or a jacket.",
    },
    {
      question: "Can we charter the boat for a group or event?",
      answer:
        "Yes. We host small-group meetings, training, incentives and special events for up to 40 people, with coffee breaks and lunch on board.",
    },
  ],

  whereToStay: {
    title: "Pak Beng hotels for your Mekong cruise",
    description:
      "Standard and deluxe Pak Beng (Pakbeng) hotels with cruise package prices, plus Villa Mira in Luang Prabang and a dorm by the Houay Xai pier.",
    eyebrow: "Where to stay",
    heading: "Pak Beng hotels and stays along the route",
    intro:
      "Choose your comfort level for the night in Pak Beng, and find places for the nights before and after your cruise in Luang Prabang and Houay Xai.",
    groups: {
      pakBeng: {
        title: "Pak Beng, the night on the river",
        intro:
          "Your downstream package includes one night here. The price depends on the hotel you choose.",
      },
      luangPrabang: {
        title: "Luang Prabang, before or after",
        intro: "A guest house in the old town for the nights around your cruise.",
      },
      houayXai: {
        title: "Houay Xai, by the pier",
        intro:
          "A budget stay five minutes from the slow-boat pier. Contact the owner directly for rates.",
      },
    },
    cruisePackage: "Cruise package",
    hotelWebsite: "Hotel website",
  },

  stays: {
    "mon-savahn": {
      tier: "Standard",
      description:
        "Our basic option, included in the standard cruise package: simple, air-conditioned rooms with breakfast.",
      facts: ["Air-conditioned rooms", "Breakfast included"],
    },
    "le-grande": {
      tier: "Deluxe",
      description:
        "Around 50 air-conditioned villas, most with a river view and a balcony, and a swimming pool.",
      facts: ["About 50 villas", "River views & balconies", "Swimming pool"],
    },
    sanctuary: {
      tier: "Deluxe",
      description:
        "A lodge of 48 rooms, with superior fan rooms and deluxe air-conditioned rooms, and a swimming pool.",
      facts: ["48 rooms", "Fan or air-conditioned", "Swimming pool"],
    },
    "villa-mira": {
      tier: "3★ guest house",
      description:
        "Eleven rooms on a quiet cobbled street near Wat Xiengthong, for nights in Luang Prabang before or after the cruise.",
      facts: [
        "9 superior twin/double rooms and 2 family rooms, 27 m²",
        "Air conditioning, private shower, cable TV",
        "Safe, fridge, hairdryer, kettle with tea & coffee",
      ],
    },
    "homy-dormy": {
      tier: "Budget",
      description:
        "Homely dormitory-style stay five minutes from the slow-boat pier, for the night before or after your cruise.",
      facts: ["4 rooms with 4 bunk beds each", "Simple breakfast", "5 minutes to the pier"],
    },
  },

  charters: {
    title: "Private Mekong boat charter for groups and events",
    description:
      "Charter the Nagi of Mekong for meetings, training, incentives or a special event for up to 40 people, with coffee breaks and lunch on board.",
    eyebrow: "Pleasure & meetings afloat",
    heading: "Meetings, training and special events on the river",
    intro:
      "We arrange small-group meetings, training, incentives and special events on board the Nagi of Mekong.",
    emailButton: "Email us your event",
    emailSubject: "Private charter / event on the Mekong",
    offerLabel: "What we offer",
    points: [
      { title: "Up to 40 people", text: "Aboard one of our large boats." },
      {
        title: "Classroom or theatre",
        text: "Set up the way your session needs, with standard equipment.",
      },
      { title: "Coffee breaks & lunch", text: "Served on board during your event." },
    ],
    tellUs: "Tell us the date, the size of your group and what you have in mind.",
    ctaTitle: "Plan an event afloat",
    ctaText: "Write to us with your date and group size.",
  },

  contactPage: {
    title: "Book a Mekong cruise or contact us",
    description:
      "Check availability for the Nagi of Mekong by WhatsApp or email. Call +66 95 507 3264 or write to adisak.star@gmail.com. We reply within 24 hours.",
    eyebrow: "Book & contact",
    heading: "Check availability",
    intro: "Send us your request: it’s free and doesn’t commit you.",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    basedIn: "Based in",
    bookingTitle: "Your booking request",
    bookingIntro:
      "Four short steps. Your message opens in WhatsApp or your email app, ready to send.",
  },

  privacy: {
    title: "Privacy",
    description:
      "How the Nagi of Mekong website handles your information: no tracking, two small preferences stored in your browser.",
    heading: "Privacy",
    intro: "This website is designed to collect as little as possible.",
    sections: [
      {
        title: "What this website stores",
        text: "The site has no user accounts, no analytics and no advertising trackers. Fonts are served from this website, not from a third party. Like any website, the server that hosts it may keep standard technical logs (such as IP addresses and the pages requested) for security and reliability.",
      },
      {
        title: "Your language and currency",
        text: "When you choose a language, a small cookie (nagi_locale) remembers it for a year so we don’t ask again. When you choose a currency, it is saved in your browser’s local storage. Neither is sent to anyone or used to track you, and you can clear both in your browser settings. Your language is never guessed from your location: we only read the languages your browser asks for.",
      },
      {
        title: "TikTok videos",
        text: "The TikTok videos are not loaded until you click one. Only then does your browser contact TikTok, which may set its own cookies under its own privacy policy. The “Watch on TikTok” links open TikTok’s website.",
      },
      {
        title: "The booking form",
        text: "The booking form does not send your details to a server. When you press “Send on WhatsApp” or “Send by email”, your message is prepared in your browser and opened in WhatsApp or your own email app. Nothing is sent until you press send there.",
      },
      {
        title: "When you contact us",
        text: "Messages you send reach Nagi of Mekong through WhatsApp or email and are used to answer your request and arrange your trip. Those services have their own privacy policies.",
      },
    ],
    questionsTitle: "Questions",
    questions: "Write to <email>{email}</email>.",
  },

  guide: {
    title: "Huay Xai to Luang Prabang by slow boat: route guide",
    description:
      "How the two-day slow boat from Chiang Khong and Houay Xai (Huay Xai) to Luang Prabang works: departure days, border and Lao visa, the Pak Beng night, upstream.",
    eyebrow: "Route guide",
    crumb: "Route guide",
    heading: "Houay Xai to Luang Prabang by slow boat",
    intro:
      "How the two-day Mekong journey between the Thai–Lao border and Luang Prabang works, from the border crossing to the night in Pak Beng. Houay Xai is also written Huay Xai or Houayxay, and Pak Beng is often written Pakbeng.",
    askWhatsApp: "Ask us on WhatsApp",
    onThisPage: "On this page",
    toc: {
      route: "The route at a glance",
      border: "Chiang Khong, Houay Xai and the border",
      dayOne: "Day one: Houay Xai to Pak Beng",
      pakBeng: "The night in Pak Beng",
      dayTwo: "Day two: Pak Beng to Luang Prabang",
      upstream: "Going upstream",
      fromChiangMai: "Starting in Chiang Mai",
      fromNan: "Starting in Nan",
      packing: "What to bring",
    },
    upstreamTitle: "Going upstream, from Luang Prabang to Houay Xai",
    route:
      "The river journey takes two days with one night in Pak Beng, the village halfway between the border and Luang Prabang. Downstream boats leave Houay Xai every {downDays}. Upstream boats leave Luang Prabang every {upDays}.",
    border: [
      "Chiang Khong, in Thailand’s Chiang Rai province, sits across the Mekong from Houay Xai in Laos. On our downstream cruise we pick you up after breakfast from your hotel in either town, look after your luggage and help you through the Thai and Lao border formalities and the visa on arrival.",
      "For the Lao visa on arrival, bring the fee in US dollars and one passport photo.",
    ],
    dayOne:
      "Once on board there’s tea and coffee while the riverbanks go by. The boat stops at a rural village, a hot lunch is cooked on board, and you reach Pak Beng in the afternoon. We take you to your hotel and the evening is yours.",
    pakBengIntro:
      "Our downstream packages include the night in Pak Beng, and the price depends on the hotel you pick:",
    pakBengStay: "<name>{name}</name> ({tier}): {facts}.",
    pakBengPrice: "Cruise package {price} per person.",
    cruiseOnly:
      "Already have a room? A cruise-only seat costs {price} per person and you arrange your own night.",
    pakBengCold:
      "Pak Beng can be very cold from November to January. <link>Compare the Pak Beng hotels</link>.",
    dayTwo:
      "After breakfast at your hotel you’re back on the river. The boat stops at an ethnic village, serves lunch on board, and elephants bathing or gold panning may be seen along the banks. The last stop is Pak Ou cave, with its many Buddha images. From the Luang Prabang pier a tuk-tuk or minivan takes you to where you’re staying in town.",
    dayTwoLink: "<link>See the downstream cruise itinerary, prices and what’s included</link>.",
    upstream:
      "Upstream boats leave Luang Prabang on {days} after an early hotel pick-up, with a simple breakfast on board, Pak Ou cave and an ethnic Lao village on day one. You arrive in Houay Xai around 16:30 on day two, in time to cross into Thailand: we transfer you to the border and include a bus ticket to Chiang Khong. Upstream sailings need a minimum number of passengers, so ask early.",
    upstreamPrice: "The price is {price} per person.",
    upstreamMore:
      "You can combine it with two or three days overland from Chiang Khong to Chiang Mai via Chiang Rai: ask us for a plan. <link>See the upstream cruise</link>.",
    chiangMai:
      "Our five-day program starts with two nights in Chiang Mai. On day three we drive about 300 km to Chiang Khong, stopping at a hot spring, the White Temple and the Golden Triangle with its Hall of Opium, then spend the night in Chiang Khong before the two-day cruise. Arrive in Chiang Mai on a {days} to match a boat departure.",
    chiangMaiPrice: "{price} per person, minimum two people.",
    chiangMaiLink: "<link>See the Chiang Mai land and cruise program</link>.",
    nan: "From Nan, in northern Thailand, the road crosses into Laos at the Huai Kon border, about an hour’s drive from Pak Beng, where you join the boat for a day on the river to Luang Prabang. This route needs a Lao visa obtained in advance from a Lao embassy, stating entry at Muang Ngeun.",
    nanLink: "<link>See the Nan to Luang Prabang journey</link>.",
    packing: [
      "Your passport, the Lao visa fee in US dollars and one passport photo.",
      "Warm clothes or a jacket from November to January.",
      "No need to pack lunch: it’s cooked on board. Tell us if you need vegan, vegetarian or halal food.",
    ],
    packingLink: "<link>More questions about visas, food and weather</link>.",
    ctaTitle: "Want us to handle the whole route?",
  },

  notFound: {
    title: "This page drifted downstream",
    text: "The page you are looking for doesn’t exist, or has moved with the new website.",
    home: "Back to the home page",
    contact: "Contact us",
  },

  map: {
    title: "Route map: the Mekong from Houay Xai, overnight in Pak Beng, to Luang Prabang",
    board: "Day 1 · board",
    overnight: "Overnight",
    arrive: "Day 2 · arrive",
  },

  photos: {
    hero: { alt: "The Nagi of Mekong slow boat cruising on the Mekong with hills behind" },
    riverBanks: { alt: "Sandbanks, rocks and forested hills along the Mekong seen from the deck" },
    pakOuCave: { alt: "Rows of Buddha images inside Pak Ou cave above the Mekong" },
    pakBeng: { alt: "The boat moored at Pak Beng in the late afternoon" },
    village: {
      alt: "Travellers walking through a riverside village during a stop on the cruise",
    },
    boatExterior: { alt: "The Nagi of Mekong boat moored at the pier, ready for boarding" },
    boatInterior: {
      alt: "Rows of comfortable seats and tables inside the boat with river views on both sides",
      caption: "Comfortable seats and ample room to move around",
    },
    lunch: {
      alt: "A buffet of freshly cooked dishes served on board for lunch",
      caption: "Buffet-style, freshly cooked lunches are served daily",
    },
    host: {
      alt: "The English-speaking host talking with guests on deck",
      caption: "An English-speaking host travels with you for both days",
    },
    crew: { alt: "The Nagi of Mekong crew standing together in front of the boat" },
    upstream: { alt: "Early-morning departure from the Luang Prabang pier" },
    chiangMai: {
      alt: "The White Temple in Chiang Rai province, a stop on the drive to the Mekong",
    },
    nan: { alt: "A temple in the town of Nan, northern Thailand" },
    charter: { alt: "A private group seated on board for a meeting on the Mekong" },
  },

  trips: {
    downstream: {
      name: "Downstream cruise: Houay Xai to Luang Prabang",
      shortName: "Downstream · Houay Xai → Luang Prabang",
      bookTitle: "Book the downstream cruise",
      summary:
        "Two days down the Mekong from the Thai–Lao border to the UNESCO World Heritage town of Luang Prabang, with a night in Pak Beng at the hotel of your choice.",
      duration: "2 days · 1 night",
      departuresLabel: "Boat leaves Houay Xai",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Standard hotel",
          detail: "Air-conditioned room in Pak Beng with breakfast.",
          badge: "",
        },
        "le-grande": {
          label: "Le Grande Pak Beng",
          detail: "Premium hotel with swimming pool, breakfast included.",
          badge: "",
        },
        sanctuary: {
          label: "Sanctuary Pak Beng Lodge",
          detail: "Lodge with swimming pool, breakfast included.",
          badge: "",
        },
        "sanctuary-summer-2026": {
          label: "Sanctuary Pak Beng Lodge — summer offer",
          detail: "Seasonal promotion.",
          badge: "Summer offer",
        },
        "cruise-only": {
          label: "Cruise only",
          detail:
            "Seat on the boat, both lunches, sightseeing and transfers. You arrange your own night in Pak Beng.",
          badge: "",
        },
      },
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
          note: "",
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
            { title: "Hot lunch on board", text: "" },
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
          note: "",
          stops: [
            { title: "Back on the river", text: "Board after breakfast for the final leg." },
            { title: "Ethnic village stop", text: "" },
            {
              title: "Lunch on board",
              text: "Elephants bathing and gold panning may be seen along the riverbank.",
            },
            { title: "Pak Ou cave", text: "The cave temple and its many Buddha images." },
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
      packages: {
        standard: {
          name: "Cruise + Standard hotel",
          summary: "The whole trip, with a simple air-conditioned room in Pak Beng.",
          highlight: "Everything included",
          points: [
            "Air-conditioned room with breakfast in Pak Beng",
            "Pick-up, border help, both lunches, stops and transfers",
            "English-speaking host and travel insurance",
          ],
        },
        deluxe: {
          name: "Cruise + Deluxe lodge",
          summary: "The same trip, with your night at a Pak Beng lodge with a swimming pool.",
          highlight: "",
          points: [
            "Le Grande Pak Beng: about 50 villas, most with a river view and balcony",
            "Sanctuary Pak Beng Lodge: 48 rooms",
            "Swimming pool and breakfast at both",
          ],
        },
        "cruise-only": {
          name: "Cruise only",
          summary: "Already have a bed in Pak Beng? Take the boat on its own.",
          highlight: "",
          points: [
            "Same boat, host, lunches, stops and transfers",
            "You arrange your own night in Pak Beng",
          ],
        },
      },
      extras: [
        "A night in Houay Xai before the cruise",
        "Nights in Luang Prabang after the cruise",
      ],
      seo: {
        title: "Houay Xai to Luang Prabang slow boat cruise, 2 days",
        description:
          "Two-day Mekong cruise from Houay Xai (Huay Xai), across from Chiang Khong, to Luang Prabang via Pak Beng. Pick-up, lunch and border help included. From {from}.",
      },
    },

    upstream: {
      name: "Upstream cruise: Luang Prabang to Houay Xai",
      shortName: "Upstream · Luang Prabang → Houay Xai",
      bookTitle: "Book the upstream cruise",
      summary:
        "The same river journey in reverse, from Luang Prabang up to the Thai border at Houay Xai, arriving in time to cross into Chiang Khong.",
      duration: "2 days · 1 night",
      departuresLabel: "Boat leaves Luang Prabang",
      departuresNote: "A minimum number of passengers is required.",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Cruise with Pak Beng hotel",
          detail: "Mekong Riverside Lodge, BKC Villa or similar, with breakfast.",
          badge: "",
        },
      },
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
          note: "Pak Beng can be very cold from November to January. Bring warm clothes or a jacket.",
          stops: [
            {
              title: "Early pick-up",
              text: "From your hotel to the pier, then a simple breakfast, coffee and tea on board.",
            },
            { title: "Pak Ou cave", text: "" },
            { title: "Ethnic Lao village", text: "" },
            { title: "Lunch cooked on board", text: "" },
            {
              title: "Pak Beng",
              text: "Afternoon arrival. Explore the small town in the evening; your host can suggest places to eat.",
            },
          ],
        },
        {
          label: "Day 2",
          title: "Pak Beng to Houay Xai",
          meals: "Breakfast at your hotel, lunch on board",
          note: "",
          stops: [
            {
              title: "Check out and board",
              text: "Breakfast at your hotel, then the final leg.",
            },
            { title: "Village stop", text: "One stop at a village along the river." },
            { title: "Lunch on board", text: "" },
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
      packages: {},
      extras: [
        "A premium hotel in Pak Beng (Sanctuary Pak Beng Lodge or Le Grande Pak Beng)",
        "A plan for continuing overland to Chiang Rai and Chiang Mai",
      ],
      seo: {
        title: "Luang Prabang to Houay Xai slow boat cruise, 2 days",
        description:
          "Two days up the Mekong from Luang Prabang to Houay Xai (Huay Xai) via Pak Beng, arriving in time to cross to Chiang Khong. Mondays and Thursdays. {from}.",
      },
    },

    "chiang-mai-land-and-cruise": {
      name: "Chiang Mai, Golden Triangle and the Mekong",
      shortName: "Land & cruise · Chiang Mai → Luang Prabang",
      bookTitle: "Book the land & cruise journey",
      summary:
        "Five days from Chiang Mai to Luang Prabang: two nights in Chiang Mai, a scenic drive to the Mekong via the White Temple and the Golden Triangle, then the two-day downstream cruise.",
      duration: "5 days · 4 nights",
      departuresLabel: "Arrive in Chiang Mai",
      departuresNote:
        "Arrive Tuesday for Friday’s boat, Thursday for Sunday’s, or Sunday for Wednesday’s.",
      minimum: "Minimum 2 people. Families of 3 or more: email us for the right price.",
      priceOnRequest: "",
      options: {
        package: {
          label: "Full program",
          detail: "Twin or double sharing, everything listed below.",
          badge: "",
        },
      },
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
          note: "",
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
          note: "",
          stops: [
            { title: "Scenic drive of about 300 km", text: "" },
            { title: "Hot spring and the White Temple", text: "" },
            { title: "Golden Triangle", text: "Including the Hall of Opium." },
            { title: "Lunch at a local restaurant", text: "" },
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
          note: "",
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
      packages: {},
      extras: ["Tours and excursions in Chiang Mai", "A tailor-made program"],
      seo: {
        title: "Chiang Mai to Luang Prabang by slow boat: 5-day tour",
        description:
          "Chiang Mai to Luang Prabang in five days: the White Temple, the Golden Triangle, a night in Chiang Khong and the two-day Mekong cruise via Pak Beng. {from}.",
      },
    },

    "nan-to-luang-prabang": {
      name: "Nan to Luang Prabang overland and by river",
      shortName: "Land & cruise · Nan → Luang Prabang",
      bookTitle: "Book the land & cruise journey",
      summary:
        "Four days from the northern Thai town of Nan, across the border at Huai Kon to Pak Beng, then a day on the Mekong to Luang Prabang.",
      duration: "4 days · 3 nights",
      departuresLabel: "Arrive in Nan",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "Prices on request: email us and we’ll send a quote.",
      options: {},
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
          meals: "",
          note: "",
          stops: [
            { title: "Meet and greet at Nan airport", text: "Transfer to a city-centre hotel." },
            { title: "Afternoon visit to Nan’s most outstanding temples", text: "" },
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
          note: "",
          stops: [
            {
              title: "Local markets and villages",
              text: "Including the chicken-coop sauna and massage.",
            },
            { title: "Northern Thai lunch in a farming setting", text: "" },
            { title: "Afternoon at leisure", text: "" },
          ],
        },
        {
          label: "Day 3",
          title: "Across the border to Pak Beng",
          meals: "Breakfast, lunch",
          note: "You must get your Lao visa before you travel, from a Lao embassy at home or in Bangkok, stating you will enter Laos at Muang Ngeun, Xayaboury province.",
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
        },
        {
          label: "Day 4",
          title: "Pak Beng to Luang Prabang by boat",
          meals: "Breakfast, lunch on board",
          note: "",
          stops: [
            { title: "Board the Nagi of Mekong", text: "A one-day downstream river trip." },
            { title: "Riverside villages and Pak Ou cave", text: "" },
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
      packages: {},
      extras: [],
      seo: {
        title: "Nan to Luang Prabang via Pak Beng: 4-day journey",
        description:
          "Four days from Nan in northern Thailand to Luang Prabang via the Huai Kon border, Pak Beng and a day on the Mekong.",
      },
    },
  },
};

/** Same shape as the English file, with every string widened (what a translation must match). */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;

export default en satisfies Messages;
