import type { Messages } from "./en";

/** Deutsch (Sie-Form). Needs a native review: see docs/07-translation-review.md. */
const de: Messages = {
  meta: {
    siteTitle: "Mekong-Kreuzfahrt von Houay Xai nach Luang Prabang · Nagi of Mekong",
    siteDescription:
      "Zwei Tage auf dem Mekong von Houay Xai (Chiang Khong) über Pak Beng nach Luang Prabang, von Hotel zu Hotel: Abholung, Hilfe an der Grenze, Mittagessen und Hotel inklusive. Ab {from}.",
    tagline: "Erleben Sie den majestätischen Mekong bequem und sicher",
    ogAlt: "Nagi of Mekong: Slowboat-Kreuzfahrten von Houay Xai nach Luang Prabang",
    notFoundTitle: "Seite nicht gefunden",
  },

  common: {
    skipToContent: "Zum Inhalt springen",
    home: "Startseite",
    breadcrumb: "Brotkrümelnavigation",
    perPerson: "pro Person",
    perPersonShort: "/ Person",
    from: "Ab",
    priceOnRequest: "Preis auf Anfrage",
    opensNewTab: "(öffnet in einem neuen Tab)",
    askOnWhatsApp: "Per WhatsApp fragen",
    whatsapp: "WhatsApp",
    call: "Anrufen",
    included: "Inklusive",
    notIncluded: "Nicht inklusive",
    meals: "Mahlzeiten:",
    route: "Route",
    routeTo: "nach",
    keyFacts: "Auf einen Blick",
    photo: "Foto",
    placeholder: "Platzhalter",
    pauseMotion: "Laufschrift anhalten",
  },

  nav: {
    main: "Hauptnavigation",
    mobile: "Mobile Navigation",
    footer: "Fußzeile",
    homeLabel: "{name}, Startseite",
    cruises: "Kreuzfahrten",
    whereToStay: "Unterkünfte",
    charters: "Privatcharter",
    guide: "Reiseführer",
    faq: "FAQ",
    contact: "Kontakt",
    privacy: "Datenschutz",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    menu: "Menü",
    menuDescription: "Navigation, Sprache, Währung und Kontakt",
    visit: "Entdecken",
    talkToUs: "Kontakt",
    whatsappNumber: "WhatsApp {phone}",
    open: "Erreichbar {hours} Uhr",
    bookingLabel: "Verfügbarkeit prüfen",
  },

  switcher: {
    region: "Sprache und Währung",
    language: "Sprache",
    currency: "Währung",
    languageButton: "Sprache: {name}",
    currencyButton: "Währung: {name}",
    currencyHint:
      "Gebucht und abgerechnet wird in US-Dollar. Andere Währungen dienen nur zur Orientierung.",
  },

  banner: {
    label: "Sprache",
    text: "Diese Seite gibt es auch auf Deutsch.",
    accept: "Auf Deutsch lesen",
    dismiss: "Nein, danke",
    dismissLabel: "Schließen und in dieser Sprache bleiben",
  },

  currency: {
    approx: "ca. {amount}",
    note: "Beträge in {currency} sind Richtwerte. Abgerechnet wird in US-Dollar.",
    noteUsd: "Preise in US-Dollar, der Währung, in der abgerechnet wird.",
    rates: "Wechselkurs: Europäische Zentralbank über Frankfurter, {date}.",
    ratesTitle: "Kurse vom {date}",
    noRates: "Wechselkurse nicht verfügbar: Preise in US-Dollar.",
  },

  facts: [
    { value: "2", label: "Tage auf dem Fluss" },
    { value: "40", label: "Sitzplätze, meist mit viel Platz" },
    { value: "3", label: "Abfahrten pro Woche flussabwärts" },
  ],

  contact: {
    replyPromise: "Wir beantworten jede Buchungsanfrage innerhalb von 24 Stunden.",
    country: "Thailand",
    locationNote: "Gegenüber von Houay Xai (Laos), auf der anderen Flussseite",
  },

  home: {
    offerName: "Die zweitägige Mekong-Kreuzfahrt, von Tür zu Tür",
    title: "Von Houay Xai nach Luang Prabang, bequem und sicher",
    intro:
      "Zwei Tage den Mekong hinunter, mit einer Nacht in Pak Beng. Wir holen Sie in Ihrem Hotel in Chiang Khong oder Houay Xai ab, helfen Ihnen über die Grenze, servieren das Mittagessen an Bord und bringen Sie zu Ihrem Hotel in Luang Prabang.",
    departures: "Abfahrten",
    loopPhrase: "Zwei Tage mit dem Slowboat nach Luang Prabang",
    freeToAsk: "Anfrage kostenlos und unverbindlich.",
    journeyEyebrow: "Die Reise",
    journeyTitle: "Zwei Tage auf dem Fluss",
    dayChip: "T{n}",
    dayLabel: "Tag {n}:",
    fullItinerary: "Den ganzen Ablauf flussabwärts ansehen",
    compareHotels: "Die Hotels in Pak Beng vergleichen",
    onboardEyebrow: "An Bord der Nagi of Mekong",
    onboardTitle: "Eine Flussreise, an die Sie sich erinnern",
    onboardIntro:
      "Wir sind ein Anbieter der Mittelklasse: ein bequemes, sicheres Boot, jeden Tag ein frisches Mittagessen und ein Reiseleiter, der sich vom Anleger bis zu Ihrem Hotel um alles kümmert.",
    moreEyebrow: "Weitere Reisemöglichkeiten",
    moreTitle: "Flussaufwärts, oder starten Sie weiter weg?",
    moreIntro:
      "Fahren Sie von Luang Prabang flussaufwärts, oder starten Sie in Chiang Mai oder Nan – den Weg zum Fluss übernehmen wir.",
    readGuide: "Zum Reiseführer",
    faqEyebrow: "Gut zu wissen",
    faqTitle: "Fragen vor der Abfahrt",
    allQuestions: "Alle Fragen zu Visum, Essen und Wetter",
  },

  packagesSection: {
    eyebrow: "Preise pro Person",
    title: "Dasselbe Boot, Sie wählen Ihre Nacht in Pak Beng",
    intro:
      "Jedes Paket umfasst Abholung, Hilfe an der Grenze, beide Mittagessen, die Stopps und die Transfers. Nur Ihre Unterkunft ändert sich.",
  },

  handled: {
    eyebrow: "Von Tür zu Tür",
    title: "Alles zwischen Ihrem Hotel und Luang Prabang, für Sie erledigt",
    intro:
      "Wer den Fluss auf eigene Faust bereist, muss sich um all das selbst kümmern. Auf der Nagi of Mekong gehört es zur Reise.",
    onYourOwn: "Auf eigene Faust kümmern Sie sich um …",
    withUs: "Mit uns",
    onYourOwnSr: "Auf eigene Faust:",
    rows: [
      {
        task: "Vom Hotel zum Anleger kommen",
        handled: "Wir holen Sie im Hotel ab und bringen Sie zum Anleger.",
      },
      {
        task: "Die thailändisch-laotische Grenze und das Visum bei Ankunft",
        handled: "Wir helfen Ihnen über die Grenze und beim Visum.",
      },
      {
        task: "Das Gepäck über die Grenze und an Bord tragen",
        handled: "Wir tragen Ihr Gepäck für Sie.",
      },
      {
        task: "Essen für einen langen Tag auf dem Fluss finden",
        handled: "Wir kochen jeden Tag ein frisches Mittagessen, auch vegan und halal.",
      },
      {
        task: "Ein Bett in Pak Beng finden",
        handled: "Wir buchen Ihr Hotel in Pak Beng, mit Frühstück.",
      },
      {
        task: "Wissen, wo sich ein Halt lohnt",
        handled:
          "Wir halten in Dörfern und an der Pak-Ou-Höhle, mit englischsprachigem Reiseleiter.",
      },
      {
        task: "Vom Anleger in Luang Prabang in die Stadt kommen",
        handled: "Wir bringen Sie vom Anleger zu Ihrem Hotel in Luang Prabang.",
      },
      {
        task: "Sich um Unvorhergesehenes sorgen",
        handled: "Alle erhalten eine Reiseversicherung und eine Schwimmweste.",
      },
    ],
  },

  boat: [
    {
      title: "Platz zum Bewegen",
      text: "Das Boot hat 40 Plätze, fährt aber meist mit freien Sitzen: bequeme Sitze und viel Platz, um sich zu bewegen.",
    },
    {
      title: "Sicherheit zuerst",
      text: "Schwimmwesten für alle und Sicherheitsausrüstung an Bord. Moderne Toiletten, bequeme Sitze und Tische für Karten, Spiele oder Postkarten.",
    },
    {
      title: "An Bord gekocht",
      text: "Jeden Tag ein frisch gekochtes Mittagessen mit Tee, Kaffee und Erfrischungen. Vegane, vegetarische und Halal-Gerichte gibt es auch.",
    },
    {
      title: "Den ganzen Weg begleitet",
      text: "Ein englischsprachiger Reiseleiter ist an beiden Tagen dabei – mit Gepäckservice, Hilfe an der Grenze und Transfers an beiden Enden.",
    },
  ],

  reviews: {
    eyebrow: "Bewertungen",
    title: "Das sagen Reisende",
    intro:
      "Unbearbeitete Bewertungen von Tripadvisor und Viator, jeweils mit Link zum Original und in der Sprache, in der sie geschrieben wurden.",
    ratingsLabel: "Bewertungen von Reisenden",
    reviewCount: "{count} Bewertungen",
    asOf: "Stand {date}",
    note: "Gesamtzahl der Bewertungen und Note von Viator und Tripadvisor",
    copiedOn: "Noten und Bewertungen am {date} von den Plattformen übernommen.",
    showAll: "Alle {count} Bewertungen anzeigen",
    readAllOn: "Alle Bewertungen auf {name} lesen",
    seeAllOn: "(alle Bewertungen auf {name}, öffnet in einem neuen Tab)",
    written: "Verfasst: {date}",
    reviewFrom: "Bewertung von",
    readOn: "Auf {name} lesen",
    language: "Sprache der Bewertung:",
    rated: "Bewertet mit {rating} von 5",
    levels: {
      "5": "Ausgezeichnet",
      "4": "Sehr gut",
      "3": "Befriedigend",
      "2": "Mangelhaft",
      "1": "Ungenügend",
    },
  },

  tiktok: {
    eyebrow: "Auf TikTok",
    title: "Das sagen Reisende auf TikTok",
    intro:
      "Reisende, die mit uns gefahren sind und es gefilmt haben. Ihre Videos und Bildunterschriften, unverändert und in ihren eigenen Worten. Das sind keine Bewertungen.",
    play: "TikTok von @{handle} abspielen",
    privacy: "Wird erst nach Ihrem Klick von TikTok geladen. TikTok kann dann Cookies setzen.",
    watchOn: "Auf TikTok ansehen",
    opensTikTok: "Öffnet TikTok",
    captionLabel: "Bildunterschrift von @{handle}:",
    showMore: "Ganze Bildunterschrift zeigen",
    showLess: "Weniger zeigen",
    dialogTitle: "TikTok von @{handle}",
    dialogDescription:
      "Das Video wird von TikTok geladen. Mit Esc oder Schließen kehren Sie zurück.",
    close: "Schließen",
    loading: "Video wird von TikTok geladen …",
    retrieved: "Bildunterschriften wie auf TikTok veröffentlicht, übernommen am {date}.",
    placeholder: "Bildunterschrift noch nicht verfügbar: in src/content/tiktok.ts ergänzen.",
  },

  trip: {
    duration: "Dauer",
    group: "Gruppe",
    groupDefault: "Bis zu 40 Gäste an Bord",
    includedEyebrow: "Für Sie erledigt",
    includedTitle: "Was inklusive ist",
    includedIntro:
      "Alles Folgende ist im Preis enthalten – unterwegs müssen Sie nichts organisieren.",
    itineraryEyebrow: "Tag für Tag",
    itineraryTitle: "Reiseverlauf",
    pricesEyebrow: "Preise",
    pricesTitle: "Preise pro Person",
    pricesOnRequestTitle: "Preise auf Anfrage",
    knowEyebrow: "Vor der Reise",
    knowTitle: "Gut zu wissen",
    asideLabel: "Diese Reise buchen",
    askEarly: "{note} Fragen Sie früh an.",
    bookIntro:
      "Wählen Sie eine Abfahrt und sagen Sie uns, wer mitkommt. Eine Anfrage ist kostenlos und unverbindlich.",
    dayOne: "{stop} am ersten Tag",
    moreEyebrow: "Weitere Reisemöglichkeiten",
    moreTitle: "Andere Reisen",
    seeItinerary: "Ablauf und Preise ansehen",
    twinShare: ", im geteilten Doppel- oder Zweibettzimmer",
    singleSupplement: "Einzelzuschlag {price}",
    singleSupplementInline: "Einzelzuschlag {price}",
    offerEnds: "Angebot gültig bis {date}",
    validUntil: "Gültig bis {date}",
    validFrom: "Ab {date}",
    kind: { cruise: "Flusskreuzfahrt", landCruise: "Land & Fluss" },
  },

  nextSailings: {
    label: "Nächste Abfahrten",
    every: "jeden {days}",
  },

  nextSteps: {
    stepSr: "Schritt {n}:",
    defaultDayOne: "Abholung im Hotel am Morgen der Abfahrt",
    send: {
      title: "Sie senden Ihre Anfrage",
      text: "Eine vorausgefüllte WhatsApp- oder E-Mail-Nachricht. Kostenlos und unverbindlich.",
    },
    confirm: {
      title: "Wir bestätigen innerhalb von 24 Stunden",
      text: "Verfügbarkeit an Ihrem Datum und den Endpreis.",
    },
    travel: { title: "Sie reisen" },
  },

  cta: {
    title: "Schicken Sie uns Ihre Daten, den Rest übernehmen wir",
    text: "Sagen Sie uns, wann Sie fahren möchten und wie viele Sie sind.",
    orCall: "Oder rufen Sie an:",
    orEmail: "oder schreiben Sie an",
  },

  booking: {
    checkCount: {
      one: "Bitte prüfen Sie eine Angabe",
      other: "Bitte prüfen Sie {count} Angaben",
    },
    stepTrip: "Ihre Reise",
    tripField: "Kreuzfahrt oder Reise",
    dateHint: "Wählen Sie ein Datum oder sagen Sie uns, dass Sie flexibel sind.",
    chooseDate: "{label}: Datum wählen",
    anotherDate: "Anderes Datum",
    flexible: "Ich bin flexibel",
    flexibleLabel: "Anderes Datum oder ich bin flexibel",
    loadingDates: "Die nächsten Abfahrten werden geladen …",
    stepTravellers: "Reisende & Unterkunft",
    travellers: "Anzahl der Reisenden",
    fewer: "Eine Person weniger",
    more: "Eine Person mehr",
    nightIn: "Nacht in Pak Beng",
    alsoAsk: "Fragen Sie uns auch nach",
    optional: "(optional)",
    alsoAskHint: "Wir gehen in unserer Antwort darauf ein. Unverbindlich.",
    stepDetails: "Ihre Angaben",
    name: "Vollständiger Name",
    email: "E-Mail",
    phone: "Telefon oder WhatsApp",
    diet: "Ernährungswünsche",
    dietHint: "Vegan, vegetarisch und halal möglich",
    message: "Sonst noch etwas?",
    summary: "Zusammenfassung der Anfrage",
    yourRequest: "Ihre Anfrage",
    trip: "Reise",
    date: "Datum",
    flexibleShort: "Flexibel",
    notChosen: "Noch nicht gewählt",
    travellersShort: "Reisende",
    option: "Option",
    alsoAsking: "Außerdem gefragt",
    estimate: "Geschätzter Gesamtpreis",
    estimateFor: { one: "für {count} Person", other: "für {count} Personen" },
    basedOn: "Auf Basis der veröffentlichten Preise",
    inclSupplement: ", inkl. Einzelzuschlag",
    weConfirm: "Den Endpreis bestätigen wir.",
    quote: "Wir schicken Ihnen ein Angebot.",
    sendWhatsApp: "Per WhatsApp senden",
    sendEmail: "Per E-Mail senden",
    nothingCharged:
      "Online wird nichts abgebucht. Ihre Nachricht öffnet sich in WhatsApp oder Ihrem E-Mail-Programm, bereit zum Senden.",
    readyIn: "Ihre Anfrage ist in {channel} bereit. Drücken Sie dort auf Senden.",
    channelWhatsApp: "WhatsApp",
    channelEmail: "Ihrem E-Mail-Programm",
    nothingOpened: "Nichts geöffnet? Schreiben Sie an {email} oder rufen Sie {phone} an.",
    errors: {
      name: "Bitte geben Sie Ihren Namen an.",
      trip: "Wählen Sie eine Kreuzfahrt oder Reise.",
      travellers: "Die Zahl der Reisenden muss zwischen 1 und 40 liegen.",
      email: "Diese E-Mail-Adresse scheint nicht zu stimmen.",
    },
  },

  faqPage: {
    title: "Mekong-Kreuzfahrt FAQ: Laos-Visum, Grenze, Essen und Wetter",
    description:
      "Antworten vor der Abfahrt: Abholung im Hotel und die thailändisch-laotische Grenze, das Visum bei Ankunft, Mittagessen an Bord, Plätze ohne Hotel und die kühle Jahreszeit in Pak Beng.",
    eyebrow: "Reise planen",
    heading: "Mekong-Kreuzfahrt: Ihre Fragen, unsere Antworten",
    intro:
      "Vom Grenzübertritt bis zum Mittagessen: die praktische Seite von zwei Tagen auf dem Mekong.",
    essentialsEyebrow: "Das Wichtigste",
    essentialsTitle: "Die praktische Seite",
    essentials: [
      {
        title: "Abholung & Grenze",
        text: "Wir holen Sie in Ihrem Hotel in Chiang Khong oder Houay Xai ab, kümmern uns um Ihr Gepäck und helfen Ihnen bei den thailändischen und laotischen Grenzformalitäten.",
      },
      {
        title: "Visum für Laos",
        text: "Für die Fahrt flussabwärts bringen Sie die Visagebühr in US-Dollar und ein Passfoto mit. Für die Route ab Nan brauchen Sie ein vorab bei einer laotischen Botschaft beantragtes Visum.",
      },
      {
        title: "Essen an Bord",
        text: "Jeden Tag ein frisch gekochtes Mittagessen sowie Tee, Kaffee und Erfrischungen. Vegan, vegetarisch oder halal: Sagen Sie einfach Bescheid.",
      },
      {
        title: "Wetter",
        text: "Von November bis Januar kann es in Pak Beng sehr kalt werden. Packen Sie warme Kleidung oder eine Jacke ein.",
      },
    ],
    links:
      "Route, Grenze und Packliste Schritt für Schritt: <guide>der Reiseführer von Houay Xai nach Luang Prabang</guide>. Sie kommen von weiter her? Starten Sie in <chiangMai>Chiang Mai</chiangMai> oder <nan>Nan</nan>, den Weg zum Fluss übernehmen wir.",
    boatEyebrow: "Das Boot",
    boatTitle: "Komfort und Sicherheit an Bord",
    faqEyebrow: "FAQ",
    faqTitle: "Häufige Fragen",
  },

  faq: [
    {
      question: "Wie buche ich?",
      answer:
        "Schicken Sie uns eine Anfrage über das Buchungsformular, per WhatsApp oder E-Mail mit Wunschtermin, Zahl der Reisenden und Hotel in Pak Beng. Wir bestätigen innerhalb von 24 Stunden.",
    },
    {
      question: "An welchen Tagen fährt das Boot?",
      answer:
        "Flussabwärts von Houay Xai nach Luang Prabang am Sonntag, Mittwoch und Freitag. Flussaufwärts von Luang Prabang nach Houay Xai am Montag und Donnerstag; für diese Fahrten ist eine Mindestzahl an Gästen nötig.",
    },
    {
      question: "Wo holen Sie uns ab?",
      answer:
        "In Ihrem Hotel in Chiang Khong (Thailand) oder Houay Xai (Laos). Wir bringen Sie zum Anleger, kümmern uns um Ihr Gepäck und helfen Ihnen über die Grenze.",
    },
    {
      question: "Brauche ich ein Visum für Laos?",
      answer:
        "Flussabwärts helfen wir Ihnen beim Visum bei Ankunft: Bringen Sie die Gebühr in US-Dollar und ein Passfoto mit. Für die Route ab Nan müssen Sie Ihr Laos-Visum vorab bei einer laotischen Botschaft beantragen.",
    },
    {
      question: "Was gibt es an Bord zu essen?",
      answer:
        "Jeden Tag ein frisch gekochtes Mittagessen mit Tee, Kaffee und Erfrischungen. Vegane, vegetarische und Halal-Gerichte sind möglich; sagen Sie es uns bei der Buchung.",
    },
    {
      question: "Kann ich das Boot ohne Hotel in Pak Beng buchen?",
      answer:
        "Ja. Plätze nur für die Fahrt gibt es bei jeder Abfahrt für {price:cruise-only} pro Person. Die Nacht in Pak Beng organisieren Sie selbst.",
    },
    {
      question: "Ist es kalt auf dem Fluss?",
      answer:
        "Von November bis Januar kann es in Pak Beng sehr kalt werden. Bringen Sie warme Kleidung oder eine Jacke mit.",
    },
    {
      question: "Können wir das Boot für eine Gruppe oder Veranstaltung chartern?",
      answer:
        "Ja. Wir richten Meetings in kleinen Gruppen, Schulungen, Incentives und besondere Anlässe für bis zu 40 Personen aus, mit Kaffeepausen und Mittagessen an Bord.",
    },
  ],

  whereToStay: {
    title: "Hotels in Pak Beng für Ihre Mekong-Kreuzfahrt",
    description:
      "Standard- und Deluxe-Hotels in Pak Beng (Pakbeng) mit Paketpreisen, dazu die Villa Mira in Luang Prabang und ein Schlafsaal am Anleger von Houay Xai.",
    eyebrow: "Unterkünfte",
    heading: "Hotels in Pak Beng und Unterkünfte entlang der Route",
    intro:
      "Wählen Sie Ihren Komfort für die Nacht in Pak Beng und finden Sie Unterkünfte für die Nächte vor und nach der Kreuzfahrt in Luang Prabang und Houay Xai.",
    groups: {
      pakBeng: {
        title: "Pak Beng, die Nacht am Fluss",
        intro:
          "Ihr Paket flussabwärts enthält eine Nacht hier. Der Preis hängt vom Hotel ab, das Sie wählen.",
      },
      luangPrabang: {
        title: "Luang Prabang, davor oder danach",
        intro: "Ein Gästehaus in der Altstadt für die Nächte rund um Ihre Kreuzfahrt.",
      },
      houayXai: {
        title: "Houay Xai, am Anleger",
        intro:
          "Eine günstige Unterkunft fünf Minuten vom Slowboat-Anleger. Preise direkt beim Besitzer erfragen.",
      },
    },
    cruisePackage: "Kreuzfahrtpaket",
    hotelWebsite: "Website des Hotels",
  },

  stays: {
    "mon-savahn": {
      tier: "Standard",
      description:
        "Unsere einfache Option, im Standardpaket enthalten: schlichte Zimmer mit Klimaanlage und Frühstück.",
      facts: ["Zimmer mit Klimaanlage", "Frühstück inklusive"],
    },
    "le-grande": {
      tier: "Deluxe",
      description:
        "Rund 50 klimatisierte Villen, die meisten mit Flussblick und Balkon, dazu ein Pool.",
      facts: ["Rund 50 Villen", "Flussblick & Balkone", "Pool"],
    },
    sanctuary: {
      tier: "Deluxe",
      description:
        "Eine Lodge mit 48 Zimmern, von Superior-Zimmern mit Ventilator bis zu klimatisierten Deluxe-Zimmern, mit Pool.",
      facts: ["48 Zimmer", "Ventilator oder Klimaanlage", "Pool"],
    },
    "villa-mira": {
      tier: "Gästehaus 3★",
      description:
        "Elf Zimmer in einer ruhigen Pflastergasse nahe dem Wat Xieng Thong, für Nächte in Luang Prabang vor oder nach der Kreuzfahrt.",
      facts: [
        "9 Superior-Zimmer (Doppel- oder Zweibett) und 2 Familienzimmer, 27 m²",
        "Klimaanlage, eigene Dusche, Kabel-TV",
        "Safe, Kühlschrank, Föhn, Wasserkocher mit Tee & Kaffee",
      ],
    },
    "homy-dormy": {
      tier: "Budget",
      description:
        "Gemütliche Schlafsaal-Unterkunft fünf Minuten vom Slowboat-Anleger, für die Nacht vor oder nach der Kreuzfahrt.",
      facts: ["4 Zimmer mit je 4 Stockbetten", "Einfaches Frühstück", "5 Minuten zum Anleger"],
    },
  },

  charters: {
    title: "Privates Boot auf dem Mekong chartern, für Gruppen und Events",
    description:
      "Chartern Sie die Nagi of Mekong für Meetings, Schulungen, Incentives oder einen besonderen Anlass mit bis zu 40 Personen, mit Kaffeepausen und Mittagessen an Bord.",
    eyebrow: "Genuss & Meetings auf dem Wasser",
    heading: "Meetings, Schulungen und besondere Anlässe auf dem Fluss",
    intro:
      "Wir organisieren Meetings in kleinen Gruppen, Schulungen, Incentives und besondere Anlässe an Bord der Nagi of Mekong.",
    emailButton: "Ihr Event per E-Mail anfragen",
    emailSubject: "Privatcharter / Veranstaltung auf dem Mekong",
    offerLabel: "Unser Angebot",
    points: [
      { title: "Bis zu 40 Personen", text: "An Bord eines unserer großen Boote." },
      {
        title: "Seminar- oder Theaterbestuhlung",
        text: "So eingerichtet, wie Ihre Veranstaltung es braucht, mit Standardausstattung.",
      },
      {
        title: "Kaffeepausen & Mittagessen",
        text: "Während Ihrer Veranstaltung an Bord serviert.",
      },
    ],
    tellUs: "Nennen Sie uns das Datum, die Größe Ihrer Gruppe und was Sie vorhaben.",
    ctaTitle: "Planen Sie ein Event auf dem Wasser",
    ctaText: "Schreiben Sie uns Ihr Datum und die Gruppengröße.",
  },

  contactPage: {
    title: "Mekong-Kreuzfahrt buchen oder Kontakt aufnehmen",
    description:
      "Prüfen Sie die Verfügbarkeit der Nagi of Mekong per WhatsApp oder E-Mail. Telefon +66 95 507 3264, E-Mail adisak.star@gmail.com. Antwort innerhalb von 24 Stunden.",
    eyebrow: "Buchen & Kontakt",
    heading: "Verfügbarkeit prüfen",
    intro: "Senden Sie uns Ihre Anfrage: kostenlos und unverbindlich.",
    phone: "Telefon",
    email: "E-Mail",
    hours: "Erreichbar",
    basedIn: "Sitz",
    bookingTitle: "Ihre Buchungsanfrage",
    bookingIntro:
      "Vier kurze Schritte. Ihre Nachricht öffnet sich in WhatsApp oder Ihrem E-Mail-Programm, bereit zum Senden.",
  },

  privacy: {
    title: "Datenschutz",
    description:
      "Wie die Website von Nagi of Mekong mit Ihren Daten umgeht: kein Tracking, zwei kleine Einstellungen in Ihrem Browser.",
    heading: "Datenschutz",
    intro: "Diese Website ist darauf ausgelegt, so wenig wie möglich zu erfassen.",
    sections: [
      {
        title: "Was diese Website speichert",
        text: "Die Website hat keine Benutzerkonten, keine Webanalyse und keine Werbetracker. Schriften werden von dieser Website geladen, nicht von Dritten. Wie bei jeder Website kann der Server, auf dem sie liegt, übliche technische Protokolle (etwa IP-Adressen und aufgerufene Seiten) für Sicherheit und Betrieb speichern.",
      },
      {
        title: "Ihre Sprache und Währung",
        text: "Wenn Sie eine Sprache wählen, merkt sich ein kleines Cookie (nagi_locale) diese ein Jahr lang, damit wir nicht erneut fragen. Wenn Sie eine Währung wählen, wird sie im lokalen Speicher Ihres Browsers abgelegt. Beides wird an niemanden übermittelt und nicht zum Tracking genutzt; Sie können es in den Browsereinstellungen löschen. Ihre Sprache wird nie aus Ihrem Standort abgeleitet: Wir lesen nur die Sprachen, die Ihr Browser anfragt.",
      },
      {
        title: "TikTok-Videos",
        text: "Die TikTok-Videos werden erst geladen, wenn Sie auf eines klicken. Erst dann verbindet sich Ihr Browser mit TikTok, das nach seiner eigenen Datenschutzerklärung eigene Cookies setzen kann. Die Links „Auf TikTok ansehen“ öffnen die Website von TikTok.",
      },
      {
        title: "Das Buchungsformular",
        text: "Das Buchungsformular sendet Ihre Angaben an keinen Server. Wenn Sie auf „Per WhatsApp senden“ oder „Per E-Mail senden“ drücken, wird Ihre Nachricht in Ihrem Browser vorbereitet und in WhatsApp oder Ihrem E-Mail-Programm geöffnet. Nichts wird verschickt, bevor Sie dort auf Senden drücken.",
      },
      {
        title: "Wenn Sie uns kontaktieren",
        text: "Ihre Nachrichten erreichen Nagi of Mekong über WhatsApp oder E-Mail und dienen dazu, Ihre Anfrage zu beantworten und Ihre Reise zu organisieren. Diese Dienste haben eigene Datenschutzerklärungen.",
      },
    ],
    questionsTitle: "Fragen",
    questions: "Schreiben Sie an <email>{email}</email>.",
  },

  guide: {
    title: "Von Huay Xai nach Luang Prabang mit dem Slowboat: Reiseführer",
    description:
      "So funktioniert das zweitägige Slowboat von Chiang Khong und Houay Xai (Huay Xai) nach Luang Prabang: Abfahrtstage, Grenze und Laos-Visum, die Nacht in Pak Beng, flussaufwärts.",
    eyebrow: "Reiseführer",
    crumb: "Reiseführer",
    heading: "Von Houay Xai nach Luang Prabang mit dem Slowboat",
    intro:
      "So läuft die zweitägige Mekong-Reise zwischen der thailändisch-laotischen Grenze und Luang Prabang ab, vom Grenzübertritt bis zur Nacht in Pak Beng. Houay Xai wird auch Huay Xai oder Houayxay geschrieben, Pak Beng oft Pakbeng.",
    askWhatsApp: "Per WhatsApp fragen",
    onThisPage: "Auf dieser Seite",
    toc: {
      route: "Die Route auf einen Blick",
      border: "Chiang Khong, Houay Xai und die Grenze",
      dayOne: "Tag 1: von Houay Xai nach Pak Beng",
      pakBeng: "Die Nacht in Pak Beng",
      dayTwo: "Tag 2: von Pak Beng nach Luang Prabang",
      upstream: "Flussaufwärts",
      fromChiangMai: "Start in Chiang Mai",
      fromNan: "Start in Nan",
      packing: "Was Sie mitnehmen sollten",
    },
    upstreamTitle: "Flussaufwärts, von Luang Prabang nach Houay Xai",
    route:
      "Die Flussreise dauert zwei Tage mit einer Nacht in Pak Beng, dem Dorf auf halber Strecke zwischen der Grenze und Luang Prabang. Flussabwärts legen die Boote in Houay Xai jeden {downDays} ab. Flussaufwärts legen sie in Luang Prabang jeden {upDays} ab.",
    border: [
      "Chiang Khong in der thailändischen Provinz Chiang Rai liegt Houay Xai in Laos am Mekong gegenüber. Flussabwärts holen wir Sie nach dem Frühstück in Ihrem Hotel in einer der beiden Städte ab, kümmern uns um Ihr Gepäck und helfen Ihnen bei den thailändischen und laotischen Grenzformalitäten und beim Visum bei Ankunft.",
      "Für das laotische Visum bei Ankunft bringen Sie die Gebühr in US-Dollar und ein Passfoto mit.",
    ],
    dayOne:
      "Einmal an Bord gibt es Tee und Kaffee, während die Ufer vorbeiziehen. Das Boot hält in einem Bauerndorf, an Bord wird ein warmes Mittagessen gekocht, und am Nachmittag erreichen Sie Pak Beng. Wir bringen Sie zu Ihrem Hotel, der Abend gehört Ihnen.",
    pakBengIntro:
      "Unsere Pakete flussabwärts enthalten die Nacht in Pak Beng, und der Preis hängt vom gewählten Hotel ab:",
    pakBengStay: "<name>{name}</name> ({tier}): {facts}.",
    pakBengPrice: "Kreuzfahrtpaket für {price} pro Person.",
    cruiseOnly:
      "Sie haben schon ein Zimmer? Ein Platz nur für die Fahrt kostet {price} pro Person, die Nacht organisieren Sie selbst.",
    pakBengCold:
      "Von November bis Januar kann es in Pak Beng sehr kalt werden. <link>Die Hotels in Pak Beng vergleichen</link>.",
    dayTwo:
      "Nach dem Frühstück im Hotel geht es zurück auf den Fluss. Das Boot hält in einem Dorf einer ethnischen Minderheit, serviert das Mittagessen an Bord, und mit etwas Glück sehen Sie badende Elefanten oder Goldwäscher am Ufer. Letzter Halt ist die Pak-Ou-Höhle mit ihren unzähligen Buddhafiguren. Vom Anleger in Luang Prabang bringt Sie ein Tuk-Tuk oder Minibus zu Ihrer Unterkunft in der Stadt.",
    dayTwoLink: "<link>Ablauf, Preise und Leistungen der Fahrt flussabwärts ansehen</link>.",
    upstream:
      "Flussaufwärts legen die Boote in Luang Prabang am {days} nach einer frühen Abholung im Hotel ab, mit einfachem Frühstück an Bord, der Pak-Ou-Höhle und einem laotischen Dorf am ersten Tag. Am zweiten Tag erreichen Sie Houay Xai gegen 16:30 Uhr, rechtzeitig für die Einreise nach Thailand: Wir bringen Sie zur Grenze, das Busticket nach Chiang Khong ist inklusive. Für diese Fahrten ist eine Mindestzahl an Gästen nötig, fragen Sie also früh an.",
    upstreamPrice: "Der Preis beträgt {price} pro Person.",
    upstreamMore:
      "Sie können sie mit zwei, drei Tagen über Land von Chiang Khong über Chiang Rai nach Chiang Mai verbinden: Fragen Sie uns nach einem Plan. <link>Die Fahrt flussaufwärts ansehen</link>.",
    chiangMai:
      "Unser fünftägiges Programm beginnt mit zwei Nächten in Chiang Mai. Am dritten Tag fahren wir rund 300 km nach Chiang Khong, mit Stopps an einer heißen Quelle, am Weißen Tempel und im Goldenen Dreieck mit der Hall of Opium, und übernachten vor der zweitägigen Kreuzfahrt in Chiang Khong. Reisen Sie an einem {days} in Chiang Mai an, damit es zu einer Abfahrt passt.",
    chiangMaiPrice: "{price} pro Person, mindestens zwei Personen.",
    chiangMaiLink: "<link>Das Land-&-Fluss-Programm ab Chiang Mai ansehen</link>.",
    nan: "Von Nan im Norden Thailands führt die Straße am Grenzübergang Huai Kon nach Laos, etwa eine Autostunde von Pak Beng, wo Sie für einen Tag auf dem Fluss nach Luang Prabang an Bord gehen. Für diese Route brauchen Sie ein vorab bei einer laotischen Botschaft beantragtes Visum mit Einreise in Muang Ngeun.",
    nanLink: "<link>Die Reise von Nan nach Luang Prabang ansehen</link>.",
    packing: [
      "Ihren Reisepass, die Visagebühr für Laos in US-Dollar und ein Passfoto.",
      "Warme Kleidung oder eine Jacke von November bis Januar.",
      "Kein Proviant nötig: Das Mittagessen wird an Bord gekocht. Sagen Sie uns, ob Sie vegan, vegetarisch oder halal essen.",
    ],
    packingLink: "<link>Weitere Fragen zu Visum, Essen und Wetter</link>.",
    ctaTitle: "Sollen wir die ganze Route für Sie übernehmen?",
  },

  notFound: {
    title: "Diese Seite ist flussabwärts getrieben",
    text: "Die gesuchte Seite gibt es nicht oder sie ist mit der neuen Website umgezogen.",
    home: "Zur Startseite",
    contact: "Kontakt",
  },

  map: {
    title: "Routenkarte: der Mekong von Houay Xai über Nacht in Pak Beng nach Luang Prabang",
    board: "Tag 1 · Abfahrt",
    overnight: "Übernachtung",
    arrive: "Tag 2 · Ankunft",
  },

  photos: {
    hero: { alt: "Das Slowboat Nagi of Mekong auf dem Mekong vor bewaldeten Hügeln" },
    riverBanks: { alt: "Sandbänke, Felsen und bewaldete Hügel am Mekong, vom Deck aus gesehen" },
    pakOuCave: { alt: "Reihen von Buddhafiguren in der Pak-Ou-Höhle über dem Mekong" },
    pakBeng: { alt: "Das Boot am späten Nachmittag in Pak Beng vertäut" },
    village: { alt: "Reisende in einem Dorf am Flussufer bei einem Stopp der Kreuzfahrt" },
    boatExterior: { alt: "Das Boot der Nagi of Mekong am Anleger, bereit zum Einsteigen" },
    boatInterior: {
      alt: "Reihen bequemer Sitze und Tische im Boot mit Blick auf den Fluss zu beiden Seiten",
      caption: "Bequeme Sitze und viel Platz zum Bewegen",
    },
    lunch: {
      alt: "Ein Buffet mit frisch gekochten Gerichten zum Mittagessen an Bord",
      caption: "Jeden Tag ein frisch gekochtes Mittagsbuffet",
    },
    host: {
      alt: "Der englischsprachige Reiseleiter im Gespräch mit Gästen an Deck",
      caption: "Ein englischsprachiger Reiseleiter begleitet Sie beide Tage",
    },
    crew: { alt: "Die Crew der Nagi of Mekong gemeinsam vor dem Boot" },
    upstream: { alt: "Abfahrt am frühen Morgen vom Anleger in Luang Prabang" },
    chiangMai: {
      alt: "Der Weiße Tempel in der Provinz Chiang Rai, ein Stopp auf dem Weg zum Mekong",
    },
    nan: { alt: "Ein Tempel in der Stadt Nan im Norden Thailands" },
    charter: { alt: "Eine private Gruppe an Bord bei einem Meeting auf dem Mekong" },
  },

  trips: {
    downstream: {
      name: "Flussabwärts: von Houay Xai nach Luang Prabang",
      shortName: "Flussabwärts · Houay Xai → Luang Prabang",
      bookTitle: "Die Fahrt flussabwärts buchen",
      summary:
        "Zwei Tage den Mekong hinunter, von der thailändisch-laotischen Grenze bis Luang Prabang, UNESCO-Welterbestadt, mit einer Nacht in Pak Beng im Hotel Ihrer Wahl.",
      duration: "2 Tage · 1 Nacht",
      departuresLabel: "Abfahrt in Houay Xai",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Standardhotel",
          detail: "Zimmer mit Klimaanlage in Pak Beng, mit Frühstück.",
          badge: "",
        },
        "le-grande": {
          label: "Le Grande Pak Beng",
          detail: "Gehobenes Hotel mit Pool, Frühstück inklusive.",
          badge: "",
        },
        sanctuary: {
          label: "Sanctuary Pak Beng Lodge",
          detail: "Lodge mit Pool, Frühstück inklusive.",
          badge: "",
        },
        "sanctuary-summer-2026": {
          label: "Sanctuary Pak Beng Lodge — Sommerangebot",
          detail: "Saisonaktion.",
          badge: "Sommerangebot",
        },
        "cruise-only": {
          label: "Nur Kreuzfahrt",
          detail:
            "Platz an Bord, beide Mittagessen, Stopps und Transfers. Die Nacht in Pak Beng organisieren Sie selbst.",
          badge: "",
        },
      },
      included: [
        "Abholung im Hotel in Chiang Khong oder Houay Xai und Transfer zum Anleger",
        "Gepäckservice und Hilfe beim Grenzübertritt und beim Visum bei Ankunft",
        "Reiseversicherung",
        "Zweitägige begleitete Kreuzfahrt mit englischsprachigem Reiseleiter",
        "Täglich frisch gekochtes Mittagessen und Erfrischungen (auch vegan, vegetarisch und halal)",
        "Besichtigungsstopps, darunter die Pak-Ou-Höhle",
        "Eine Nacht in Pak Beng im Hotel Ihrer Wahl (nicht bei „Nur Kreuzfahrt“)",
        "Transfer vom Anleger in Luang Prabang zu Ihrem Hotel",
      ],
      notIncluded: [
        "Visagebühr für Laos, zahlbar in US-Dollar, plus ein Passfoto",
        "Persönliche Ausgaben",
      ],
      itinerary: [
        {
          label: "Tag 1",
          title: "Von Houay Xai nach Pak Beng",
          meals: "Mittagessen",
          note: "",
          stops: [
            {
              title: "Abholung im Hotel",
              text: "Nach dem Frühstück holen wir Sie in Ihrem Hotel in Chiang Khong oder Houay Xai ab, kümmern uns um Ihr Gepäck und helfen Ihnen über die Grenze und beim Visum bei Ankunft.",
            },
            {
              title: "An Bord",
              text: "Tee und Kaffee, sobald Sie sitzen, dann zieht das Alltagsleben an den Ufern des Mekong vorbei.",
            },
            { title: "Halt im Dorf", text: "Besuch eines Bauerndorfs am Flussufer." },
            { title: "Warmes Mittagessen an Bord", text: "" },
            {
              title: "Pak Beng",
              text: "Ankunft am Nachmittag und Transfer zu Ihrem Hotel. Der Abend gehört Ihnen.",
            },
          ],
        },
        {
          label: "Tag 2",
          title: "Von Pak Beng nach Luang Prabang",
          meals: "Frühstück im Hotel, Mittagessen an Bord",
          note: "",
          stops: [
            {
              title: "Zurück auf dem Fluss",
              text: "Nach dem Frühstück an Bord für die letzte Etappe.",
            },
            { title: "Halt in einem Dorf einer ethnischen Minderheit", text: "" },
            {
              title: "Mittagessen an Bord",
              text: "Mit etwas Glück sehen Sie badende Elefanten und Goldwäscher am Ufer.",
            },
            {
              title: "Pak-Ou-Höhle",
              text: "Der Höhlentempel mit seinen unzähligen Buddhafiguren.",
            },
            {
              title: "Luang Prabang",
              text: "Vom Anleger bringt Sie ein Tuk-Tuk oder Minibus zu Ihrer Unterkunft in der Stadt.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Bringen Sie US-Dollar und ein Passfoto für das laotische Visum bei Ankunft mit.",
        "Plätze nur für die Fahrt gibt es bei jeder Abfahrt.",
        "Buchung per E-Mail oder WhatsApp; wir bestätigen innerhalb von 24 Stunden.",
      ],
      packages: {
        standard: {
          name: "Kreuzfahrt + Standardhotel",
          summary: "Die ganze Reise, mit einem einfachen klimatisierten Zimmer in Pak Beng.",
          highlight: "Alles inklusive",
          points: [
            "Zimmer mit Klimaanlage und Frühstück in Pak Beng",
            "Abholung, Hilfe an der Grenze, beide Mittagessen, Stopps und Transfers",
            "Englischsprachiger Reiseleiter und Reiseversicherung",
          ],
        },
        deluxe: {
          name: "Kreuzfahrt + Deluxe-Lodge",
          summary: "Dieselbe Reise, mit Ihrer Nacht in einer Lodge mit Pool in Pak Beng.",
          highlight: "",
          points: [
            "Le Grande Pak Beng: rund 50 Villen, die meisten mit Flussblick und Balkon",
            "Sanctuary Pak Beng Lodge: 48 Zimmer",
            "Pool und Frühstück in beiden",
          ],
        },
        "cruise-only": {
          name: "Nur Kreuzfahrt",
          summary: "Schon ein Bett in Pak Beng? Nehmen Sie einfach nur das Boot.",
          highlight: "",
          points: [
            "Dasselbe Boot, derselbe Reiseleiter, Mittagessen, Stopps und Transfers",
            "Die Nacht in Pak Beng organisieren Sie selbst",
          ],
        },
      },
      extras: ["Eine Nacht in Houay Xai vor der Kreuzfahrt", "Nächte in Luang Prabang danach"],
      seo: {
        title: "Slowboat von Houay Xai nach Luang Prabang, 2-tägige Kreuzfahrt",
        description:
          "Zweitägige Mekong-Kreuzfahrt von Houay Xai (Huay Xai), gegenüber von Chiang Khong, über Pak Beng nach Luang Prabang. Abholung, Mittagessen und Hilfe an der Grenze inklusive. Ab {from}.",
      },
    },

    upstream: {
      name: "Flussaufwärts: von Luang Prabang nach Houay Xai",
      shortName: "Flussaufwärts · Luang Prabang → Houay Xai",
      bookTitle: "Die Fahrt flussaufwärts buchen",
      summary:
        "Dieselbe Flussreise in umgekehrter Richtung, von Luang Prabang hinauf zur thailändischen Grenze in Houay Xai, rechtzeitig für die Weiterreise nach Chiang Khong.",
      duration: "2 Tage · 1 Nacht",
      departuresLabel: "Abfahrt in Luang Prabang",
      departuresNote: "Eine Mindestzahl an Gästen ist erforderlich.",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Kreuzfahrt mit Hotel in Pak Beng",
          detail: "Mekong Riverside Lodge, BKC Villa oder ähnlich, mit Frühstück.",
          badge: "",
        },
      },
      included: [
        "Frühe Abholung im Hotel in Luang Prabang und Transfer zum Anleger",
        "Einfaches Frühstück, Kaffee und Tee an Bord am ersten Tag",
        "Täglich frisch gekochtes Mittagessen an Bord",
        "Stopps an der Pak-Ou-Höhle und in Dörfern am Fluss",
        "Eine Nacht in Pak Beng mit Frühstück",
        "Transfer zur laotisch-thailändischen Grenze und Busticket nach Chiang Khong",
      ],
      notIncluded: [
        "Gehobene Hotels in Pak Beng (Sanctuary Pak Beng Lodge oder Le Grande Pak Beng): gegen Aufpreis, fragen Sie uns",
      ],
      itinerary: [
        {
          label: "Tag 1",
          title: "Von Luang Prabang nach Pak Beng",
          meals: "Frühstück und Mittagessen an Bord",
          note: "Von November bis Januar kann es in Pak Beng sehr kalt werden. Bringen Sie warme Kleidung oder eine Jacke mit.",
          stops: [
            {
              title: "Frühe Abholung",
              text: "Von Ihrem Hotel zum Anleger, dann einfaches Frühstück, Kaffee und Tee an Bord.",
            },
            { title: "Pak-Ou-Höhle", text: "" },
            { title: "Laotisches Dorf", text: "" },
            { title: "An Bord gekochtes Mittagessen", text: "" },
            {
              title: "Pak Beng",
              text: "Ankunft am Nachmittag. Erkunden Sie abends den kleinen Ort; Ihr Reiseleiter empfiehlt gern ein Restaurant.",
            },
          ],
        },
        {
          label: "Tag 2",
          title: "Von Pak Beng nach Houay Xai",
          meals: "Frühstück im Hotel, Mittagessen an Bord",
          note: "",
          stops: [
            {
              title: "Auschecken und an Bord",
              text: "Frühstück im Hotel, dann die letzte Etappe.",
            },
            { title: "Halt im Dorf", text: "Ein Halt in einem Dorf am Fluss." },
            { title: "Mittagessen an Bord", text: "" },
            {
              title: "Houay Xai, gegen 16:30 Uhr",
              text: "Rechtzeitig für die Einreise nach Thailand: Transfer zur Grenze und Busticket nach Chiang Khong für Ihre Weiterreise.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Verbinden Sie sie mit zwei, drei Tagen über Land in Nordthailand, von Chiang Khong über Chiang Rai nach Chiang Mai. Fragen Sie uns nach einem Plan.",
        "Gehobene Hotels in Pak Beng gibt es gegen einen kleinen Aufpreis.",
      ],
      packages: {},
      extras: [
        "Ein gehobenes Hotel in Pak Beng (Sanctuary Pak Beng Lodge oder Le Grande Pak Beng)",
        "Ein Plan für die Weiterreise über Land nach Chiang Rai und Chiang Mai",
      ],
      seo: {
        title: "Slowboat von Luang Prabang nach Houay Xai, 2-tägige Kreuzfahrt",
        description:
          "Zwei Tage den Mekong hinauf, von Luang Prabang über Pak Beng nach Houay Xai (Huay Xai), rechtzeitig für die Weiterreise nach Chiang Khong. Montags und donnerstags. {from}.",
      },
    },

    "chiang-mai-land-and-cruise": {
      name: "Chiang Mai, das Goldene Dreieck und der Mekong",
      shortName: "Land & Fluss · Chiang Mai → Luang Prabang",
      bookTitle: "Die Land-&-Fluss-Reise buchen",
      summary:
        "Fünf Tage von Chiang Mai nach Luang Prabang: zwei Nächte in Chiang Mai, eine schöne Fahrt zum Mekong über den Weißen Tempel und das Goldene Dreieck, dann die zweitägige Kreuzfahrt flussabwärts.",
      duration: "5 Tage · 4 Nächte",
      departuresLabel: "Ankunft in Chiang Mai",
      departuresNote:
        "Anreise am Dienstag für das Boot am Freitag, am Donnerstag für Sonntag oder am Sonntag für Mittwoch.",
      minimum:
        "Mindestens 2 Personen. Familien ab 3 Personen: Schreiben Sie uns für den richtigen Preis.",
      priceOnRequest: "",
      options: {
        package: {
          label: "Komplettprogramm",
          detail: "Im geteilten Doppel- oder Zweibettzimmer, mit allem unten Aufgeführten.",
          badge: "",
        },
      },
      included: [
        "Transfers im klimatisierten Privatwagen oder Minibus mit englischsprachigem Guide",
        "Zwei Nächte im Dusit Princess Chiang Mai (4★) oder ähnlich, mit Frühstück",
        "Fahrt von Chiang Mai nach Chiang Khong mit Besichtigungen, Mittagessen, Eintritten und englischsprachiger Begleitung",
        "Eine Nacht in einem 4★-Hotel in Chiang Khong mit Frühstück",
        "Zweitägige Kreuzfahrt mit täglichem Mittagessen, Übernachtung in Pak Beng und Besichtigungsstopps",
        "Versicherung",
      ],
      notIncluded: ["Persönliche Ausgaben", "Alkoholische Getränke", "Visagebühren"],
      itinerary: [
        {
          label: "Tage 1–2",
          title: "Chiang Mai",
          meals: "Frühstück",
          note: "",
          stops: [
            {
              title: "Empfang am Flughafen Chiang Mai",
              text: "Transfer ins Dusit Princess, ein 4★-Hotel im Zentrum, zwei Gehminuten vom Nachtmarkt.",
            },
            {
              title: "Freie Zeit",
              text: "Ausflüge und Touren auf Wunsch, oder ein individuelles Programm.",
            },
          ],
        },
        {
          label: "Tag 3",
          title: "Von Chiang Mai nach Chiang Khong",
          meals: "Frühstück, Mittagessen",
          note: "",
          stops: [
            { title: "Schöne Fahrt von rund 300 km", text: "" },
            { title: "Heiße Quelle und Weißer Tempel", text: "" },
            { title: "Goldenes Dreieck", text: "Mit der Hall of Opium." },
            { title: "Mittagessen in einem lokalen Restaurant", text: "" },
            {
              title: "Chiang Khong",
              text: "Übernachtung im Chiang Khong Teak Garden oder Fortune Riverview.",
            },
          ],
        },
        {
          label: "Tage 4–5",
          title: "Den Mekong hinunter nach Luang Prabang",
          meals: "Täglich Mittagessen an Bord",
          note: "",
          stops: [
            {
              title: "Zweitägige Kreuzfahrt flussabwärts",
              text: "Mit einer Nacht in Pak Beng, frisch gekochten Mittagessen und Besichtigungsstopps, wie bei der Fahrt flussabwärts.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Wählen Sie Ihren Anreisetag passend zu einer Abfahrt: Dienstag, Donnerstag oder Sonntag.",
        "Wir können Touren in Chiang Mai ergänzen oder ein individuelles Programm zusammenstellen.",
      ],
      packages: {},
      extras: ["Touren und Ausflüge in Chiang Mai", "Ein individuelles Programm"],
      seo: {
        title: "Von Chiang Mai nach Luang Prabang mit dem Slowboat: 5-Tage-Tour",
        description:
          "In fünf Tagen von Chiang Mai nach Luang Prabang: der Weiße Tempel, das Goldene Dreieck, eine Nacht in Chiang Khong und die zweitägige Mekong-Kreuzfahrt über Pak Beng. {from}.",
      },
    },

    "nan-to-luang-prabang": {
      name: "Von Nan nach Luang Prabang über Land und Fluss",
      shortName: "Land & Fluss · Nan → Luang Prabang",
      bookTitle: "Die Land-&-Fluss-Reise buchen",
      summary:
        "Vier Tage von der nordthailändischen Stadt Nan über den Grenzübergang Huai Kon nach Pak Beng, dann ein Tag auf dem Mekong nach Luang Prabang.",
      duration: "4 Tage · 3 Nächte",
      departuresLabel: "Ankunft in Nan",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "Preise auf Anfrage: Schreiben Sie uns, wir schicken Ihnen ein Angebot.",
      options: {},
      included: [
        "Einfacher Economy-Flug Bangkok → Nan (15 kg Aufgabegepäck, 7 kg Handgepäck)",
        "Transfers und Touren wie beschrieben mit englischsprachigem Guide (von der laotischen Grenze bis Pak Beng nur Fahrer)",
        "Mahlzeiten laut Programm",
        "Eintrittsgelder",
        "3★-Hotels in Nan und Pak Beng",
        "Eintägige Kreuzfahrt Pak Beng → Luang Prabang mit Mittagessen, Erfrischungen und Stopps in einem Dorf und an der Pak-Ou-Höhle",
        "Transfer vom Anleger in Luang Prabang ins Stadtzentrum",
      ],
      notIncluded: [],
      itinerary: [
        {
          label: "Tag 1",
          title: "Ankunft in Nan",
          meals: "",
          note: "",
          stops: [
            { title: "Empfang am Flughafen Nan", text: "Transfer zu einem Hotel im Zentrum." },
            { title: "Nachmittags Besuch der schönsten Tempel von Nan", text: "" },
            {
              title: "Nachtmarkt",
              text: "Hunderte Stände mit Essen, Souvenirs und Kunsthandwerk aus der Region.",
            },
          ],
        },
        {
          label: "Tag 2",
          title: "Märkte, Dörfer und Mittagessen auf dem Land",
          meals: "Frühstück, Mittagessen",
          note: "",
          stops: [
            {
              title: "Lokale Märkte und Dörfer",
              text: "Inklusive Sauna und Massage im Hühnerstall.",
            },
            { title: "Nordthailändisches Mittagessen auf einem Bauernhof", text: "" },
            { title: "Nachmittag zur freien Verfügung", text: "" },
          ],
        },
        {
          label: "Tag 3",
          title: "Über die Grenze nach Pak Beng",
          meals: "Frühstück, Mittagessen",
          note: "Sie müssen Ihr Laos-Visum vor der Reise bei einer laotischen Botschaft in Ihrem Heimatland oder in Bangkok beantragen, mit Einreise in Muang Ngeun, Provinz Xayaboury.",
          stops: [
            {
              title: "Durch Felder und Reisterrassen",
              text: "Mit Stopps im Bezirk Pua und Mittagessen in einem lokalen Restaurant; ein Tag des thailändischen Community Based Tourism.",
            },
            {
              title: "Grenze Huai Kon",
              text: "Thailändische Passkontrolle, dann begleitet Sie ein laotischer Fahrer durch die laotische Einreise.",
            },
            {
              title: "Pak Beng",
              text: "Rund 55 km, etwa eine Stunde, bis zum Hotel Ihrer Wahl in diesem kleinen Dorf am Fluss.",
            },
          ],
        },
        {
          label: "Tag 4",
          title: "Mit dem Boot von Pak Beng nach Luang Prabang",
          meals: "Frühstück, Mittagessen an Bord",
          note: "",
          stops: [
            { title: "An Bord der Nagi of Mekong", text: "Ein Tag flussabwärts." },
            { title: "Dörfer am Fluss und Pak-Ou-Höhle", text: "" },
            {
              title: "Luang Prabang",
              text: "Ankunft am Nachmittag und Transfer zu einem Hotel im Zentrum.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Für diese Route ist ein vorab beantragtes Laos-Visum Pflicht.",
        "Anreisetage in Nan: Montag, Mittwoch oder Freitag.",
      ],
      packages: {},
      extras: [],
      seo: {
        title: "Von Nan nach Luang Prabang über Pak Beng: 4-Tage-Reise",
        description:
          "Vier Tage von Nan in Nordthailand nach Luang Prabang über den Grenzübergang Huai Kon, Pak Beng und einen Tag auf dem Mekong.",
      },
    },
  },
};

export default de;
