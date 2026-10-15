import type { Messages } from "./en";

/** Español (de España, tuteo). Needs a native review: see docs/07-translation-review.md. */
const es: Messages = {
  meta: {
    siteTitle: "Crucero por el Mekong de Houay Xai a Luang Prabang · Nagi of Mekong",
    siteDescription:
      "Dos días por el Mekong de Houay Xai (Chiang Khong) a Luang Prabang pasando por Pak Beng, de hotel a hotel: recogida, ayuda en la frontera, comidas y hotel incluidos. Desde {from}.",
    tagline: "Navega por el majestuoso Mekong con comodidad y seguridad",
    ogAlt: "Nagi of Mekong: cruceros en slow boat de Houay Xai a Luang Prabang",
    notFoundTitle: "Página no encontrada",
  },

  common: {
    skipToContent: "Ir al contenido",
    home: "Inicio",
    breadcrumb: "Ruta de navegación",
    perPerson: "por persona",
    perPersonShort: "/ persona",
    from: "Desde",
    priceOnRequest: "Precio a consultar",
    opensNewTab: "(se abre en una pestaña nueva)",
    askOnWhatsApp: "Pregúntanos por WhatsApp",
    whatsapp: "WhatsApp",
    call: "Llamar",
    included: "Incluido",
    notIncluded: "No incluido",
    meals: "Comidas:",
    route: "Ruta",
    routeTo: "a",
    keyFacts: "Datos clave",
    photo: "Foto",
    placeholder: "Pendiente",
    pauseMotion: "Pausar el texto en movimiento",
  },

  nav: {
    main: "Navegación principal",
    mobile: "Navegación móvil",
    footer: "Pie de página",
    homeLabel: "{name}, inicio",
    cruises: "Cruceros",
    whereToStay: "Alojamiento",
    charters: "Barco privado",
    guide: "Guía de la ruta",
    faq: "Preguntas",
    contact: "Contacto",
    privacy: "Privacidad",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    menu: "Menú",
    menuDescription: "Navegación, idioma, moneda y contacto",
    visit: "Descubre",
    talkToUs: "Habla con nosotros",
    whatsappNumber: "WhatsApp {phone}",
    open: "Abierto de {hours}",
    bookingLabel: "Ver disponibilidad",
  },

  switcher: {
    region: "Idioma y moneda",
    language: "Idioma",
    currency: "Moneda",
    languageButton: "Idioma: {name}",
    currencyButton: "Moneda: {name}",
  },

  banner: {
    label: "Idioma",
    text: "Esta página también está en español.",
    accept: "Leer en español",
    dismiss: "No, gracias",
    dismissLabel: "Cerrar y seguir en este idioma",
  },

  consent: {
    title: "Cookies y vídeos de TikTok",
    text: "Esta web solo usa almacenamiento esencial para tu idioma y tu moneda. Si lo aceptas, los vídeos de TikTok se reproducen directamente en la página, y TikTok instala sus propias cookies.",
    privacy: "Política de privacidad",
    acceptAll: "Aceptar todo",
    rejectAll: "Rechazar todo",
    customize: "Personalizar",
    save: "Guardar mi elección",
    essential: "Esenciales",
    essentialHint: "Preferencias de idioma y moneda. Siempre activas.",
    tiktok: "Vídeos de TikTok",
    tiktokHint: "Reproduce aquí vídeos de viajeros publicados en TikTok. TikTok instala cookies.",
    settings: "Configuración de cookies",
  },

  currency: {
    approx: "≈ {amount}",
    note: "Los importes en {currency} son orientativos.",
  },

  facts: [
    { value: "2", label: "días en el río" },
    { value: "40", label: "plazas, casi siempre con sitio de sobra" },
    { value: "3", label: "salidas río abajo cada semana" },
  ],

  contact: {
    replyPromise: "Respondemos a todas las solicitudes de reserva en menos de 24 horas.",
    country: "Tailandia",
  },

  home: {
    offerName: "El crucero de dos días por el Mekong, puerta a puerta",
    title: "De Houay Xai a Luang Prabang, con comodidad y seguridad",
    intro:
      "Dos días bajando el Mekong, con una noche en Pak Beng. Te recogemos en tu hotel de Chiang Khong o Houay Xai, te ayudamos a cruzar la frontera, te servimos la comida a bordo y te dejamos en tu hotel de Luang Prabang.",
    departures: "Salidas",
    loopPhrase: "Dos días en slow boat hasta Luang Prabang",
    freeToAsk: "Preguntar es gratis y sin compromiso.",
    journeyEyebrow: "El viaje",
    journeyTitle: "Dos días en el río",
    dayChip: "D{n}",
    dayLabel: "Día {n}:",
    fullItinerary: "Ver todo el itinerario río abajo",
    compareHotels: "Comparar los hoteles de Pak Beng",
    onboardEyebrow: "A bordo del Nagi of Mekong",
    onboardTitle: "Un crucero por el río para recordar",
    onboardIntro:
      "Somos un operador de gama media: un barco cómodo y seguro, una comida recién hecha cada día y un guía que se ocupa de todo, del embarcadero a tu hotel.",
    moreEyebrow: "Otras formas de viajar",
    moreTitle: "¿Vas río arriba o empiezas más lejos?",
    moreIntro:
      "Remonta el río desde Luang Prabang o empieza en Chiang Mai o Nan, y nosotros nos encargamos del camino hasta el río.",
    readGuide: "Leer la guía de la ruta",
    faqEyebrow: "Conviene saber",
    faqTitle: "Preguntas antes de zarpar",
    allQuestions: "Todas las preguntas sobre visado, comida y clima",
  },

  packagesSection: {
    eyebrow: "Precios por persona",
    title: "El mismo barco; tú eliges tu noche en Pak Beng",
    intro:
      "Todos los paquetes incluyen la recogida, la ayuda en la frontera, las dos comidas, las paradas y los traslados. Lo único que cambia es dónde duermes.",
  },

  handled: {
    eyebrow: "Puerta a puerta",
    title: "Todo entre tu hotel y Luang Prabang, resuelto",
    intro:
      "Recorrer el río por tu cuenta significa resolver tú cada uno de estos puntos. En el Nagi of Mekong forman parte del viaje.",
    onYourOwn: "Por tu cuenta, tendrías que resolver…",
    withUs: "Con nosotros",
    onYourOwnSr: "Por tu cuenta:",
    rows: [
      {
        task: "Ir del hotel al embarcadero",
        handled: "Te recogemos en tu hotel y te llevamos al embarcadero.",
      },
      {
        task: "La frontera entre Tailandia y Laos y el visado a la llegada",
        handled: "Te ayudamos a cruzar la frontera y a conseguir el visado.",
      },
      {
        task: "Cargar con el equipaje en la frontera y a bordo",
        handled: "Llevamos tu equipaje por ti.",
      },
      {
        task: "Encontrar comida para un largo día en el río",
        handled: "Cocinamos una comida fresca cada día, con opciones veganas y halal.",
      },
      {
        task: "Encontrar cama en Pak Beng",
        handled: "Reservamos tu hotel en Pak Beng, con desayuno.",
      },
      {
        task: "Saber dónde merece la pena parar",
        handled: "Paramos en aldeas y en la cueva de Pak Ou, con un guía de habla inglesa.",
      },
      {
        task: "Llegar del embarcadero de Luang Prabang al centro",
        handled: "Te llevamos del embarcadero a tu hotel en Luang Prabang.",
      },
      {
        task: "Preocuparte por los imprevistos",
        handled: "Todos tienen seguro de viaje y chaleco salvavidas.",
      },
    ],
  },

  boat: [
    {
      title: "Espacio para moverte",
      text: "El barco tiene 40 plazas, pero suele navegar con asientos libres: asientos cómodos y mucho espacio para moverse.",
    },
    {
      title: "La seguridad, primero",
      text: "Chalecos salvavidas para todos y equipo de seguridad a bordo. Baños modernos, asientos cómodos y mesas para jugar a las cartas o escribir postales.",
    },
    {
      title: "Comida cocinada a bordo",
      text: "Una comida recién hecha cada día, con té, café y refrescos. Hay opciones veganas, vegetarianas y halal.",
    },
    {
      title: "Acompañados todo el camino",
      text: "Un guía de habla inglesa viaja contigo los dos días: equipaje, ayuda en la frontera y traslados en cada extremo.",
    },
  ],

  reviews: {
    eyebrow: "Opiniones",
    title: "Lo que dicen los viajeros",
    ratingsLabel: "Valoraciones de viajeros",
    reviewCount: "{count} opiniones",
    asOf: "a {date}",
    note: "Total de opiniones y valoración de Viator y Tripadvisor",
    copiedOn: "Valoraciones y opiniones copiadas de cada plataforma el {date}.",
    showAll: "Ver las {count} opiniones",
    readAllOn: "Leer todas las opiniones en {name}",
    seeAllOn: "(ver todas las opiniones en {name}, se abre en una pestaña nueva)",
    written: "Fecha: {date}",
    reviewFrom: "Opinión de",
    readOn: "Leer en {name}",
    language: "Idioma de la opinión:",
    rated: "Valorado con {rating} de 5",
    levels: {
      "5": "Excelente",
      "4": "Muy bueno",
      "3": "Normal",
      "2": "Malo",
      "1": "Pésimo",
    },
  },

  why: {
    eyebrow: "Por qué Nagi of Mekong",
    title: "Dos días en el río, sin nada que organizar",
    intro:
      "El río es la parte fácil. Nos ocupamos de todo lo demás y publicamos exactamente qué incluye y cuánto cuesta.",
    points: [
      {
        title: "De hotel a hotel, no de muelle a muelle",
        text: "Te recogemos en tu hotel de Chiang Khong o Houay Xai, te ayudamos a cruzar la frontera y te llevamos a tu hotel de Luang Prabang.",
        proof:
          "La recogida, el equipaje y los traslados están incluidos en todos los paquetes río abajo.",
      },
      {
        title: "Alguien contigo los dos días",
        text: "Un anfitrión de habla inglesa viaja contigo del primer muelle al último, y cada pasajero tiene chaleco salvavidas.",
        proof: "El seguro de viaje está incluido en el precio.",
      },
      {
        title: "Precios a la vista antes de preguntar",
        text: "Cada paquete tiene su precio en esta web. Enviar una solicitud es gratis y no te compromete a nada, y respondemos en 24 horas.",
        proof: "Desde {price} por persona.",
      },
    ],
  },

  newsletter: {
    title: "Novedades del Mekong",
    intro:
      "Correos ocasionales con nuevas fechas de salida, ofertas de temporada y noticias del río. Puedes darte de baja cuando quieras.",
    label: "Tu correo electrónico",
    placeholder: "nombre@ejemplo.com",
    submit: "Suscribirme",
    consent:
      "Al suscribirte, aceptas recibir estos correos. Consulta nuestra <privacy>política de privacidad</privacy>.",
    sending: "Suscribiéndote…",
    success: "Gracias. Revisa tu bandeja de entrada y confirma tu dirección.",
    errorInvalid: "Introduce un correo electrónico válido, como nombre@ejemplo.com.",
    errorFailed: "Lo sentimos, no ha funcionado. Inténtalo de nuevo o escríbenos a {email}.",
    honeypot: "Deja este campo vacío",
  },

  tiktok: {
    eyebrow: "En TikTok",
    title: "Lo que cuentan los viajeros en TikTok",
    rowLabel: "Vídeos de TikTok, desplázate hacia los lados",
    watchOn: "Ver en TikTok",
    videoTitle: "Vídeo de TikTok de @{handle}",
  },

  trip: {
    duration: "Duración",
    group: "Grupo",
    groupDefault: "Hasta 40 pasajeros a bordo",
    includedEyebrow: "Nos encargamos",
    includedTitle: "Qué incluye",
    includedIntro: "Todo lo siguiente va incluido en el precio: no tendrás nada que organizar.",
    itineraryEyebrow: "Día a día",
    itineraryTitle: "Itinerario",
    pricesEyebrow: "Precios",
    pricesTitle: "Precios por persona",
    pricesOnRequestTitle: "Precios a consultar",
    knowEyebrow: "Antes de ir",
    knowTitle: "Conviene saber",
    asideLabel: "Reservar este viaje",
    askEarly: "{note} Consúltanos con antelación.",
    bookIntro:
      "Elige una salida y dinos quién viene. Enviar una solicitud es gratis y no te compromete a nada.",
    dayOne: "{stop} el primer día",
    moreEyebrow: "Otras formas de viajar",
    moreTitle: "Otros viajes",
    seeItinerary: "Ver itinerario y precios",
    twinShare: ", en habitación doble o twin compartida",
    singleSupplement: "Suplemento individual {price}",
    singleSupplementInline: "suplemento individual {price}",
    offerEnds: "Oferta válida hasta el {date}",
    validUntil: "Válido hasta el {date}",
    validFrom: "Desde el {date}",
    kind: { cruise: "Crucero fluvial", landCruise: "Tierra y crucero" },
  },

  nextSteps: {
    stepSr: "Paso {n}:",
    defaultDayOne: "Recogida en tu hotel la mañana de la salida",
    send: {
      title: "Envías tu solicitud",
      text: "Un mensaje de WhatsApp o un correo ya rellenado. Es gratis y sin compromiso.",
    },
    confirm: {
      title: "Te confirmamos en 24 horas",
      text: "La disponibilidad en tu fecha y el precio final.",
    },
    travel: { title: "Viajas" },
  },

  cta: {
    title: "Envíanos tus fechas y nosotros nos ocupamos del resto",
    text: "Dinos cuándo quieres navegar y cuántos viajáis.",
    orCall: "O llama al",
    orEmail: "o escribe a",
  },

  booking: {
    checkCount: {
      one: "Revisa un dato, por favor",
      other: "Revisa {count} datos, por favor",
    },
    stepTrip: "Tu viaje",
    tripField: "Crucero o viaje",
    dateHint: "Elige una fecha o dinos que tienes flexibilidad.",
    chooseDate: "{label}: elige una fecha",
    anotherDate: "Otra fecha",
    flexible: "Soy flexible",
    flexibleLabel: "Otra fecha o soy flexible",
    loadingDates: "Cargando las próximas salidas…",
    stepTravellers: "Viajeros y alojamiento",
    travellers: "Número de viajeros",
    fewer: "Un viajero menos",
    more: "Un viajero más",
    nightIn: "Noche en Pak Beng",
    alsoAsk: "Pregúntanos también por",
    optional: "(opcional)",
    required: "obligatorio",
    alsoAskHint: "Lo incluiremos en nuestra respuesta. Sin compromiso.",
    stepDetails: "Tus datos",
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono o WhatsApp",
    phoneHint: "Con el prefijo del país, p. ej. +34",
    diet: "Necesidades alimentarias",
    dietHint: "Opciones veganas, vegetarianas y halal",
    message: "¿Algo más?",
    summary: "Resumen de la solicitud",
    yourRequest: "Tu solicitud",
    trip: "Viaje",
    date: "Fecha",
    flexibleShort: "Flexible",
    notChosen: "Aún sin elegir",
    travellersShort: "Viajeros",
    option: "Opción",
    alsoAsking: "También pregunta por",
    estimate: "Total estimado",
    estimateFor: { one: "para {count} viajero", other: "para {count} viajeros" },
    basedOn: "Según los precios publicados",
    inclSupplement: ", con suplemento individual",
    weConfirm: "Te confirmamos el precio final.",
    quote: "Te enviaremos un presupuesto.",
    sendWhatsApp: "Enviar por WhatsApp",
    sendEmail: "Enviar por correo",
    readyIn: "Tu solicitud está lista en {channel}. Solo tienes que enviarla.",
    channelWhatsApp: "WhatsApp",
    channelEmail: "tu aplicación de correo",
    nothingOpened: "¿No se ha abierto nada? Escribe a {email} o llama al {phone}.",
    errors: {
      name: "Dinos tu nombre, por favor.",
      trip: "Elige un crucero o un viaje.",
      travellers: "El número de viajeros debe estar entre 1 y 40.",
      email: "Este correo electrónico no parece correcto.",
    },
  },

  faqPage: {
    title: "Preguntas sobre el crucero por el Mekong: visado de Laos, frontera, comida y clima",
    description:
      "Respuestas antes de zarpar: recogida en el hotel y frontera entre Tailandia y Laos, visado a la llegada, comida a bordo, plazas solo crucero y la temporada fría en Pak Beng.",
    eyebrow: "Planifica tu viaje",
    heading: "Crucero por el Mekong: tus preguntas, respondidas",
    intro:
      "Del paso de la frontera a lo que hay para comer: el lado práctico de dos días en el Mekong.",
    essentialsEyebrow: "Lo esencial",
    essentialsTitle: "El lado práctico",
    essentials: [
      {
        title: "Recogida y frontera",
        text: "Te recogemos en tu hotel de Chiang Khong o Houay Xai, nos ocupamos de tu equipaje y te ayudamos con los trámites fronterizos de Tailandia y Laos.",
      },
      {
        title: "Visado de Laos",
        text: "Para el crucero río abajo, lleva la tasa del visado a la llegada en dólares estadounidenses y una foto de carné. La ruta desde Nan exige un visado tramitado antes en una embajada de Laos.",
      },
      {
        title: "Comida a bordo",
        text: "Una comida recién hecha cada día, además de té, café y refrescos. Opciones veganas, vegetarianas y halal: solo tienes que avisarnos.",
      },
      {
        title: "Clima",
        text: "En Pak Beng puede hacer mucho frío de noviembre a enero. Lleva ropa de abrigo o una chaqueta.",
      },
    ],
    links:
      "Ruta, frontera y qué llevar, paso a paso: <guide>la guía de la ruta de Houay Xai a Luang Prabang</guide>. ¿Vienes de más lejos? Empieza en <chiangMai>Chiang Mai</chiangMai> o en <nan>Nan</nan> y nosotros nos encargamos del camino hasta el río.",
    boatEyebrow: "El barco",
    boatTitle: "Comodidad y seguridad a bordo",
    faqEyebrow: "Preguntas",
    faqTitle: "Preguntas frecuentes",
    listLabel: "Preguntas",
  },

  faq: [
    {
      question: "¿Cómo reservo?",
      answer:
        "Envíanos una solicitud con el formulario, por WhatsApp o por correo con la fecha de salida que prefieres, el número de viajeros y el hotel en Pak Beng. Te confirmamos en menos de 24 horas.",
    },
    {
      question: "¿Qué días sale el barco?",
      answer:
        "Río abajo, de Houay Xai a Luang Prabang, los domingos, miércoles y viernes. Río arriba, de Luang Prabang a Houay Xai, los lunes y jueves; estas salidas necesitan un mínimo de pasajeros.",
    },
    {
      question: "¿Dónde nos recogéis?",
      answer:
        "En tu hotel de Chiang Khong (Tailandia) o Houay Xai (Laos). Te llevamos al embarcadero, nos ocupamos del equipaje y te ayudamos a cruzar la frontera.",
    },
    {
      question: "¿Necesito visado para Laos?",
      answer:
        "En el crucero río abajo te ayudamos con el visado a la llegada: lleva la tasa en dólares estadounidenses y una foto de carné. En la ruta desde Nan debes tramitar el visado de Laos con antelación en una embajada de Laos.",
    },
    {
      question: "¿Qué se come a bordo?",
      answer:
        "Una comida recién hecha cada día, con té, café y refrescos. Hay opciones veganas, vegetarianas y halal; avísanos al reservar.",
    },
    {
      question: "¿Puedo reservar el barco sin hotel en Pak Beng?",
      answer:
        "Sí. Hay plazas solo crucero en todas las salidas por {price:cruise-only} por persona. Tú te encargas de tu noche en Pak Beng.",
    },
    {
      question: "¿Hace frío en el río?",
      answer:
        "En Pak Beng puede hacer mucho frío de noviembre a enero. Lleva ropa de abrigo o una chaqueta.",
    },
    {
      question: "¿Podemos alquilar el barco para un grupo o un evento?",
      answer:
        "Sí. Organizamos reuniones de grupos pequeños, formaciones, viajes de incentivo y eventos especiales para hasta 40 personas, con pausas para el café y comida a bordo.",
    },
  ],

  whereToStay: {
    title: "Hoteles en Pak Beng para tu crucero por el Mekong",
    description:
      "Hoteles estándar y de lujo en Pak Beng (Pakbeng) con el precio del paquete de crucero, además de Villa Mira en Luang Prabang y un dormitorio junto al embarcadero de Houay Xai.",
    eyebrow: "Alojamiento",
    heading: "Hoteles en Pak Beng y alojamientos en la ruta",
    intro:
      "Elige tu nivel de comodidad para la noche en Pak Beng y encuentra dónde dormir antes y después del crucero en Luang Prabang y Houay Xai.",
    groups: {
      pakBeng: {
        title: "Pak Beng, la noche en el río",
        intro:
          "Tu paquete río abajo incluye una noche aquí. El precio depende del hotel que elijas.",
      },
      luangPrabang: {
        title: "Luang Prabang, antes o después",
        intro:
          "Una casa de huéspedes en el casco antiguo para las noches antes o después del crucero.",
      },
      houayXai: {
        title: "Houay Xai, junto al embarcadero",
        intro:
          "Un alojamiento económico a cinco minutos del embarcadero del slow boat. Consulta las tarifas directamente con el dueño.",
      },
    },
    cruisePackage: "Paquete de crucero",
    hotelWebsite: "Web del hotel",
  },

  stays: {
    "mon-savahn": {
      tier: "Estándar",
      description:
        "Nuestra opción básica, incluida en el paquete estándar: habitaciones sencillas con aire acondicionado y desayuno.",
      facts: ["Habitaciones con aire acondicionado", "Desayuno incluido"],
    },
    "le-grande": {
      tier: "De lujo",
      description:
        "Unas 50 villas con aire acondicionado, la mayoría con vistas al río y balcón, y piscina.",
      facts: ["Unas 50 villas", "Vistas al río y balcones", "Piscina"],
    },
    sanctuary: {
      tier: "De lujo",
      description:
        "Un lodge de 48 habitaciones, desde superiores con ventilador hasta de lujo con aire acondicionado, con piscina.",
      facts: ["48 habitaciones", "Ventilador o aire acondicionado", "Piscina"],
    },
    "villa-mira": {
      tier: "Casa de huéspedes 3★",
      description:
        "Once habitaciones en una calle empedrada y tranquila cerca de Wat Xieng Thong, para tus noches en Luang Prabang antes o después del crucero.",
      facts: [
        "9 habitaciones superiores dobles o twin y 2 familiares, de 27 m²",
        "Aire acondicionado, ducha privada, TV por cable",
        "Caja fuerte, nevera, secador, hervidor con té y café",
      ],
    },
    "homy-dormy": {
      tier: "Económico",
      description:
        "Alojamiento acogedor tipo albergue a cinco minutos del embarcadero, para la noche antes o después del crucero.",
      facts: [
        "4 habitaciones con 4 literas cada una",
        "Desayuno sencillo",
        "A 5 minutos del embarcadero",
      ],
    },
  },

  charters: {
    title: "Alquiler de barco privado en el Mekong para grupos y eventos",
    description:
      "Alquila el Nagi of Mekong para reuniones, formaciones, incentivos o un evento especial de hasta 40 personas, con pausas para el café y comida a bordo.",
    eyebrow: "Ocio y reuniones a flote",
    heading: "Reuniones, formaciones y eventos especiales en el río",
    intro:
      "Organizamos reuniones de grupos pequeños, formaciones, incentivos y eventos especiales a bordo del Nagi of Mekong.",
    emailButton: "Cuéntanos tu evento por correo",
    emailSubject: "Barco privado / evento en el Mekong",
    offerLabel: "Qué ofrecemos",
    points: [
      { title: "Hasta 40 personas", text: "A bordo de uno de nuestros barcos grandes." },
      {
        title: "Formato aula o auditorio",
        text: "Montado como lo necesite tu sesión, con el equipamiento básico.",
      },
      { title: "Pausas para el café y comida", text: "Servidas a bordo durante tu evento." },
    ],
    tellUs: "Cuéntanos la fecha, el tamaño de tu grupo y lo que tienes en mente.",
    ctaTitle: "Organiza un evento a flote",
    ctaText: "Escríbenos con la fecha y el tamaño del grupo.",
  },

  contactPage: {
    title: "Reserva un crucero por el Mekong o contacta con nosotros",
    description:
      "Consulta la disponibilidad del Nagi of Mekong por WhatsApp o correo. Llama al +66 95 507 3264 o escribe a adisak.star@gmail.com. Respondemos en menos de 24 horas.",
    eyebrow: "Reserva y contacto",
    heading: "Ver disponibilidad",
    intro: "Envíanos tu solicitud: es gratis y no te compromete a nada.",
    phoneWhatsApp: "Teléfono / WhatsApp",
    call: "Llamar",
    email: "Correo",
    hours: "Horario",
    basedIn: "Estamos en",
    bookingTitle: "Tu solicitud de reserva",
    bookingIntro: "Cuatro pasos cortos.",
  },

  privacy: {
    title: "Privacidad",
    description:
      "Cómo trata tus datos la web de Nagi of Mekong: sin seguimiento, solo unas pocas preferencias guardadas en tu navegador.",
    heading: "Privacidad",
    intro: "Esta web está pensada para recoger lo mínimo posible.",
    sections: [
      {
        title: "Qué guarda esta web",
        text: "La web no tiene cuentas de usuario, ni analítica, ni rastreadores publicitarios. Las fuentes se sirven desde esta web, no desde terceros. Como cualquier web, el servidor que la aloja puede guardar registros técnicos estándar (como direcciones IP y páginas solicitadas) por seguridad y fiabilidad.",
      },
      {
        title: "Tu idioma y tu moneda",
        text: "Cuando eliges un idioma, una pequeña cookie (nagi_locale) lo recuerda durante un año para no volver a preguntarte. Cuando eliges una moneda, se guarda en el almacenamiento local de tu navegador. Ninguna de las dos se envía a nadie ni sirve para seguirte, y puedes borrarlas en los ajustes del navegador. Nunca deducimos tu idioma de tu ubicación: solo leemos los idiomas que pide tu navegador.",
      },
      {
        title: "Vídeos de TikTok",
        text: "Los vídeos de TikTok solo se cargan si los permites en el aviso de cookies («Aceptar todo», o «Vídeos de TikTok» en «Personalizar»). Tu elección se guarda en el almacenamiento local de tu navegador. Si los permites, los vídeos se reproducen aquí desde TikTok mientras te desplazas, y TikTok instala sus propias cookies según su propia política de privacidad. Si no, no se carga nada de TikTok y cada vídeo es un simple enlace a TikTok. Puedes cambiar tu elección en cualquier momento con «Configuración de cookies», al pie de cada página.",
      },
      {
        title: "El formulario de reserva",
        text: "El formulario no envía tus datos a ningún servidor. Cuando pulsas «Enviar por WhatsApp» o «Enviar por correo», tu mensaje se prepara en tu navegador y se abre en WhatsApp o en tu aplicación de correo. No se envía nada hasta que pulsas enviar allí.",
      },
      {
        title: "Novedades por correo",
        text: "Si te suscribes a las novedades en el pie de página, tu correo electrónico y el idioma de la página se envían a Brevo (Sendinblue SAS, Francia), el servicio de correo que usamos, para que te mande esos mensajes. Brevo te envía primero un enlace para confirmar tu dirección. No se usan para nada más. Cada correo incluye un enlace para darte de baja, y puedes pedirnos que borremos tu dirección en cualquier momento.",
      },
      {
        title: "Cuando nos escribes",
        text: "Los mensajes que nos envías llegan a Nagi of Mekong por WhatsApp o correo y se usan para responder a tu solicitud y organizar tu viaje. Esos servicios tienen sus propias políticas de privacidad.",
      },
    ],
    questionsTitle: "Preguntas",
    questions: "Escribe a <email>{email}</email>.",
  },

  guide: {
    title: "De Huay Xai a Luang Prabang en slow boat: guía de la ruta",
    description:
      "Cómo funciona el slow boat de dos días de Chiang Khong y Houay Xai (Huay Xai) a Luang Prabang: días de salida, frontera y visado de Laos, la noche en Pak Beng y el viaje río arriba.",
    eyebrow: "Guía de la ruta",
    crumb: "Guía de la ruta",
    heading: "De Houay Xai a Luang Prabang en slow boat",
    intro:
      "Cómo funciona el viaje de dos días por el Mekong entre la frontera de Tailandia y Laos y Luang Prabang, del paso de la frontera a la noche en Pak Beng. Houay Xai también se escribe Huay Xai o Houayxay, y Pak Beng a menudo Pakbeng.",
    askWhatsApp: "Pregúntanos por WhatsApp",
    onThisPage: "En esta página",
    toc: {
      route: "La ruta de un vistazo",
      border: "Chiang Khong, Houay Xai y la frontera",
      dayOne: "Día 1: de Houay Xai a Pak Beng",
      pakBeng: "La noche en Pak Beng",
      dayTwo: "Día 2: de Pak Beng a Luang Prabang",
      upstream: "Río arriba",
      fromChiangMai: "Empezar en Chiang Mai",
      fromNan: "Empezar en Nan",
      packing: "Qué llevar",
    },
    upstreamTitle: "Río arriba, de Luang Prabang a Houay Xai",
    route:
      "El viaje por el río dura dos días con una noche en Pak Beng, el pueblo a medio camino entre la frontera y Luang Prabang. Los barcos río abajo salen de Houay Xai cada {downDays}. Los barcos río arriba salen de Luang Prabang cada {upDays}.",
    border: [
      "Chiang Khong, en la provincia tailandesa de Chiang Rai, está frente a Houay Xai, en Laos, al otro lado del Mekong. En nuestro crucero río abajo te recogemos después del desayuno en tu hotel de cualquiera de las dos ciudades, nos ocupamos de tu equipaje y te ayudamos con los trámites fronterizos de Tailandia y Laos y con el visado a la llegada.",
      "Para el visado de Laos a la llegada, lleva la tasa en dólares estadounidenses y una foto de carné.",
    ],
    dayOne:
      "Ya a bordo, té y café mientras pasan las orillas. El barco para en una aldea rural, a bordo se cocina una comida caliente y llegas a Pak Beng por la tarde. Te llevamos a tu hotel y la noche es tuya.",
    pakBengIntro:
      "Nuestros paquetes río abajo incluyen la noche en Pak Beng, y el precio depende del hotel que elijas:",
    pakBengStay: "<name>{name}</name> ({tier}): {facts}.",
    pakBengPrice: "Paquete de crucero por {price} por persona.",
    cruiseOnly:
      "¿Ya tienes habitación? Una plaza solo crucero cuesta {price} por persona y tú te encargas de tu noche.",
    pakBengCold:
      "En Pak Beng puede hacer mucho frío de noviembre a enero. <link>Compara los hoteles de Pak Beng</link>.",
    dayTwo:
      "Después del desayuno en el hotel vuelves al río. El barco para en una aldea de una etnia local, sirve la comida a bordo y a veces se ven elefantes bañándose o buscadores de oro en las orillas. La última parada es la cueva de Pak Ou, con sus innumerables imágenes de Buda. Desde el embarcadero de Luang Prabang, un tuk-tuk o un minibús te lleva a tu alojamiento en la ciudad.",
    dayTwoLink:
      "<link>Ver el itinerario, los precios y lo que incluye el crucero río abajo</link>.",
    upstream:
      "Los barcos río arriba salen de Luang Prabang los {days} tras una recogida temprana en el hotel, con un desayuno sencillo a bordo, la cueva de Pak Ou y una aldea lao el primer día. Llegas a Houay Xai hacia las 16:30 del segundo día, a tiempo para cruzar a Tailandia: te llevamos a la frontera y el billete de autobús a Chiang Khong está incluido. Estas salidas necesitan un mínimo de pasajeros, así que consúltanos con antelación.",
    upstreamPrice: "El precio es de {price} por persona.",
    upstreamMore:
      "Puedes combinarlo con dos o tres días por tierra de Chiang Khong a Chiang Mai pasando por Chiang Rai: pídenos un plan. <link>Ver el crucero río arriba</link>.",
    chiangMai:
      "Nuestro programa de cinco días empieza con dos noches en Chiang Mai. El tercer día recorremos unos 300 km hasta Chiang Khong con paradas en unas aguas termales, el Templo Blanco y el Triángulo de Oro con su Hall of Opium, y pasamos la noche en Chiang Khong antes de los dos días de crucero. Llega a Chiang Mai un {days} para coincidir con una salida del barco.",
    chiangMaiPrice: "{price} por persona, mínimo dos personas.",
    chiangMaiLink: "<link>Ver el programa de tierra y crucero desde Chiang Mai</link>.",
    nan: "Desde Nan, en el norte de Tailandia, la carretera entra en Laos por el paso fronterizo de Huai Kon, a una hora en coche de Pak Beng, donde embarcas para pasar un día en el río hasta Luang Prabang. Esta ruta exige un visado de Laos tramitado antes en una embajada de Laos, indicando la entrada por Muang Ngeun.",
    nanLink: "<link>Ver el viaje de Nan a Luang Prabang</link>.",
    packing: [
      "Tu pasaporte, la tasa del visado de Laos en dólares estadounidenses y una foto de carné.",
      "Ropa de abrigo o una chaqueta de noviembre a enero.",
      "No hace falta llevar comida: se cocina a bordo. Dinos si necesitas comida vegana, vegetariana o halal.",
    ],
    packingLink: "<link>Más preguntas sobre visado, comida y clima</link>.",
    ctaTitle: "¿Quieres que nos encarguemos de toda la ruta?",
  },

  notFound: {
    title: "Esta página se fue río abajo",
    text: "La página que buscas no existe o ha cambiado de dirección con la nueva web.",
    home: "Volver al inicio",
    contact: "Contactar",
  },

  map: {
    title: "Mapa de la ruta: el Mekong de Houay Xai a Luang Prabang, con noche en Pak Beng",
    board: "Día 1 · embarque",
    overnight: "Noche",
    arrive: "Día 2 · llegada",
  },

  photos: {
    hero: { alt: "El slow boat Nagi of Mekong navegando por el Mekong con colinas al fondo" },
    riverBanks: {
      alt: "Bancos de arena, rocas y colinas boscosas a orillas del Mekong vistos desde cubierta",
    },
    pakOuCave: { alt: "Hileras de imágenes de Buda dentro de la cueva de Pak Ou, sobre el Mekong" },
    pakBeng: { alt: "El barco amarrado en Pak Beng al final de la tarde" },
    village: {
      alt: "Viajeros paseando por una aldea a orillas del río durante una parada del crucero",
    },
    boatExterior: {
      alt: "El barco Nagi of Mekong amarrado en el embarcadero, listo para embarcar",
    },
    boatInterior: {
      alt: "Filas de asientos cómodos y mesas dentro del barco, con vistas al río a ambos lados",
      caption: "Asientos cómodos y mucho espacio para moverse",
    },
    lunch: {
      alt: "Un bufé de platos recién hechos servido a bordo para la comida",
      caption: "Cada día, comida recién hecha servida en bufé",
    },
    host: {
      alt: "El guía de habla inglesa charlando con pasajeros en cubierta",
      caption: "Un guía de habla inglesa viaja contigo los dos días",
    },
    crew: { alt: "La tripulación del Nagi of Mekong reunida delante del barco" },
    upstream: { alt: "Salida al amanecer desde el embarcadero de Luang Prabang" },
    chiangMai: {
      alt: "El Templo Blanco, en la provincia de Chiang Rai, una parada en el camino al Mekong",
    },
    nan: { alt: "Un templo en la ciudad de Nan, en el norte de Tailandia" },
    charter: { alt: "Un grupo privado sentado a bordo para una reunión en el Mekong" },
  },

  trips: {
    downstream: {
      name: "Crucero río abajo: de Houay Xai a Luang Prabang",
      shortName: "Río abajo · Houay Xai → Luang Prabang",
      bookTitle: "Reservar el crucero río abajo",
      summary:
        "Dos días bajando el Mekong, de la frontera entre Tailandia y Laos a Luang Prabang, ciudad Patrimonio de la Humanidad de la UNESCO, con una noche en Pak Beng en el hotel que elijas.",
      duration: "2 días · 1 noche",
      departuresLabel: "Salida desde Houay Xai",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Hotel estándar",
          detail: "Habitación con aire acondicionado en Pak Beng, con desayuno.",
          badge: "",
        },
        "le-grande": {
          label: "Le Grande Pak Beng",
          detail: "Hotel superior con piscina, desayuno incluido.",
          badge: "",
        },
        sanctuary: {
          label: "Sanctuary Pak Beng Lodge",
          detail: "Lodge con piscina, desayuno incluido.",
          badge: "",
        },
        "sanctuary-summer-2026": {
          label: "Sanctuary Pak Beng Lodge — oferta de verano",
          detail: "Promoción de temporada.",
          badge: "Oferta de verano",
        },
        "cruise-only": {
          label: "Solo crucero",
          detail:
            "Plaza en el barco, las dos comidas, las visitas y los traslados. Tú te encargas de tu noche en Pak Beng.",
          badge: "",
        },
      },
      included: [
        "Recogida en tu hotel de Chiang Khong o Houay Xai y traslado al embarcadero",
        "Manejo del equipaje y ayuda para cruzar la frontera y con el visado a la llegada",
        "Seguro de viaje",
        "Crucero acompañado de dos días con un guía de habla inglesa",
        "Comida recién hecha y refrescos cada día (opciones veganas, vegetarianas y halal)",
        "Paradas para visitar, entre ellas la cueva de Pak Ou",
        "Una noche en Pak Beng en el hotel que elijas (no en «solo crucero»)",
        "Traslado del embarcadero de Luang Prabang a tu hotel",
      ],
      notIncluded: [
        "Tasa del visado de Laos, a pagar en dólares estadounidenses, más una foto de carné",
        "Gastos personales",
      ],
      itinerary: [
        {
          label: "Día 1",
          title: "De Houay Xai a Pak Beng",
          meals: "Comida",
          note: "",
          stops: [
            {
              title: "Recogida en el hotel",
              text: "Después del desayuno te recogemos en tu hotel de Chiang Khong o Houay Xai, nos ocupamos de tu equipaje y te ayudamos con la frontera y el visado a la llegada.",
            },
            {
              title: "A bordo",
              text: "Té y café en cuanto te instalas, y después la vida diaria pasa por las orillas del Mekong.",
            },
            { title: "Parada en una aldea", text: "Visita a una aldea rural a orillas del río." },
            { title: "Comida caliente a bordo", text: "" },
            {
              title: "Pak Beng",
              text: "Llegada por la tarde y traslado a tu hotel. La noche es tuya.",
            },
          ],
        },
        {
          label: "Día 2",
          title: "De Pak Beng a Luang Prabang",
          meals: "Desayuno en el hotel, comida a bordo",
          note: "",
          stops: [
            {
              title: "De vuelta al río",
              text: "Embarque después del desayuno para el último tramo.",
            },
            { title: "Parada en una aldea de una etnia local", text: "" },
            {
              title: "Comida a bordo",
              text: "A veces se ven elefantes bañándose y buscadores de oro en la orilla.",
            },
            {
              title: "Cueva de Pak Ou",
              text: "El templo cueva y sus innumerables imágenes de Buda.",
            },
            {
              title: "Luang Prabang",
              text: "Desde el embarcadero, un tuk-tuk o un minibús te lleva a tu alojamiento en la ciudad.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Lleva dólares estadounidenses y una foto de carné para el visado de Laos a la llegada.",
        "Hay plazas solo crucero en todas las salidas.",
        "Reserva por correo o WhatsApp; te confirmamos en menos de 24 horas.",
      ],
      packages: {
        standard: {
          name: "Crucero + hotel estándar",
          summary: "Todo el viaje, con una habitación sencilla con aire acondicionado en Pak Beng.",
          highlight: "Todo incluido",
          points: [
            "Habitación con aire acondicionado y desayuno en Pak Beng",
            "Recogida, ayuda en la frontera, las dos comidas, paradas y traslados",
            "Guía de habla inglesa y seguro de viaje",
          ],
        },
        deluxe: {
          name: "Crucero + lodge de lujo",
          summary: "El mismo viaje, con tu noche en un lodge con piscina en Pak Beng.",
          highlight: "",
          points: [
            "Le Grande Pak Beng: unas 50 villas, la mayoría con vistas al río y balcón",
            "Sanctuary Pak Beng Lodge: 48 habitaciones",
            "Piscina y desayuno en ambos",
          ],
        },
        "cruise-only": {
          name: "Solo crucero",
          summary: "¿Ya tienes cama en Pak Beng? Coge solo el barco.",
          highlight: "",
          points: [
            "El mismo barco, guía, comidas, paradas y traslados",
            "Tú te encargas de tu noche en Pak Beng",
          ],
        },
      },
      extras: [
        "Una noche en Houay Xai antes del crucero",
        "Noches en Luang Prabang después del crucero",
      ],
      seo: {
        title: "Slow boat de Houay Xai a Luang Prabang, crucero de 2 días",
        description:
          "Crucero de dos días por el Mekong de Houay Xai (Huay Xai), frente a Chiang Khong, a Luang Prabang pasando por Pak Beng. Recogida, comida y ayuda en la frontera incluidas. Desde {from}.",
      },
    },

    upstream: {
      name: "Crucero río arriba: de Luang Prabang a Houay Xai",
      shortName: "Río arriba · Luang Prabang → Houay Xai",
      bookTitle: "Reservar el crucero río arriba",
      summary:
        "El mismo viaje por el río en sentido contrario, de Luang Prabang a la frontera tailandesa en Houay Xai, con llegada a tiempo para cruzar a Chiang Khong.",
      duration: "2 días · 1 noche",
      departuresLabel: "Salida desde Luang Prabang",
      departuresNote: "Se necesita un mínimo de pasajeros.",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "Crucero con hotel en Pak Beng",
          detail: "Mekong Riverside Lodge, BKC Villa o similar, con desayuno.",
          badge: "",
        },
      },
      included: [
        "Recogida temprana en tu hotel de Luang Prabang y traslado al embarcadero",
        "Desayuno sencillo, café y té a bordo el primer día",
        "Comida recién hecha a bordo cada día",
        "Paradas en la cueva de Pak Ou y en aldeas a orillas del río",
        "Una noche en Pak Beng con desayuno",
        "Traslado a la frontera entre Laos y Tailandia y billete de autobús hasta Chiang Khong",
      ],
      notIncluded: [
        "Hoteles superiores en Pak Beng (Sanctuary Pak Beng Lodge o Le Grande Pak Beng): con suplemento, consúltanos",
      ],
      itinerary: [
        {
          label: "Día 1",
          title: "De Luang Prabang a Pak Beng",
          meals: "Desayuno y comida a bordo",
          note: "En Pak Beng puede hacer mucho frío de noviembre a enero. Lleva ropa de abrigo o una chaqueta.",
          stops: [
            {
              title: "Recogida temprana",
              text: "De tu hotel al embarcadero, y después desayuno sencillo, café y té a bordo.",
            },
            { title: "Cueva de Pak Ou", text: "" },
            { title: "Aldea lao", text: "" },
            { title: "Comida cocinada a bordo", text: "" },
            {
              title: "Pak Beng",
              text: "Llegada por la tarde. Descubre el pueblo por la noche; tu guía te recomendará dónde cenar.",
            },
          ],
        },
        {
          label: "Día 2",
          title: "De Pak Beng a Houay Xai",
          meals: "Desayuno en el hotel, comida a bordo",
          note: "",
          stops: [
            {
              title: "Salida del hotel y embarque",
              text: "Desayuno en el hotel y, después, el último tramo.",
            },
            { title: "Parada en una aldea", text: "Una parada en una aldea a orillas del río." },
            { title: "Comida a bordo", text: "" },
            {
              title: "Houay Xai, hacia las 16:30",
              text: "A tiempo para cruzar a Tailandia: traslado a la frontera y billete de autobús a Chiang Khong para seguir tu viaje.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Combínalo con dos o tres días por tierra en el norte de Tailandia, de Chiang Khong a Chiang Mai pasando por Chiang Rai. Pídenos un plan.",
        "Hay hoteles superiores en Pak Beng por un pequeño suplemento.",
      ],
      packages: {},
      extras: [
        "Un hotel superior en Pak Beng (Sanctuary Pak Beng Lodge o Le Grande Pak Beng)",
        "Un plan para seguir por tierra hasta Chiang Rai y Chiang Mai",
      ],
      seo: {
        title: "Slow boat de Luang Prabang a Houay Xai, crucero de 2 días",
        description:
          "Dos días remontando el Mekong de Luang Prabang a Houay Xai (Huay Xai) pasando por Pak Beng, con llegada a tiempo para cruzar a Chiang Khong. Lunes y jueves. {from}.",
      },
    },

    "chiang-mai-land-and-cruise": {
      name: "Chiang Mai, el Triángulo de Oro y el Mekong",
      shortName: "Tierra y crucero · Chiang Mai → Luang Prabang",
      bookTitle: "Reservar el viaje de tierra y crucero",
      summary:
        "Cinco días de Chiang Mai a Luang Prabang: dos noches en Chiang Mai, una carretera preciosa hasta el Mekong pasando por el Templo Blanco y el Triángulo de Oro, y después los dos días de crucero río abajo.",
      duration: "5 días · 4 noches",
      departuresLabel: "Llegada a Chiang Mai",
      departuresNote:
        "Llega el martes para el barco del viernes, el jueves para el del domingo o el domingo para el del miércoles.",
      minimum: "Mínimo 2 personas. Familias de 3 o más: escríbenos para darte el precio adecuado.",
      priceOnRequest: "",
      options: {
        package: {
          label: "Programa completo",
          detail: "En habitación doble o twin compartida, con todo lo que se indica abajo.",
          badge: "",
        },
      },
      included: [
        "Traslados en coche privado o minibús con aire acondicionado y guía de habla inglesa",
        "Dos noches en el Dusit Princess Chiang Mai (4★) o similar, con desayuno",
        "Trayecto de Chiang Mai a Chiang Khong con visitas, comida, entradas y acompañante de habla inglesa",
        "Una noche en un hotel 4★ de Chiang Khong con desayuno",
        "Crucero de dos días con comida diaria, alojamiento en Pak Beng y paradas para visitar",
        "Seguro",
      ],
      notIncluded: ["Gastos personales", "Bebidas alcohólicas", "Tasas de visado"],
      itinerary: [
        {
          label: "Días 1–2",
          title: "Chiang Mai",
          meals: "Desayuno",
          note: "",
          stops: [
            {
              title: "Recibimiento en el aeropuerto de Chiang Mai",
              text: "Traslado al Dusit Princess, un hotel 4★ en el centro, a dos minutos a pie del mercado nocturno.",
            },
            {
              title: "Tiempo libre",
              text: "Excursiones y visitas opcionales, o un programa a medida.",
            },
          ],
        },
        {
          label: "Día 3",
          title: "De Chiang Mai a Chiang Khong",
          meals: "Desayuno, comida",
          note: "",
          stops: [
            { title: "Ruta panorámica de unos 300 km", text: "" },
            { title: "Aguas termales y el Templo Blanco", text: "" },
            { title: "Triángulo de Oro", text: "Con la Hall of Opium." },
            { title: "Comida en un restaurante local", text: "" },
            {
              title: "Chiang Khong",
              text: "Noche en el Chiang Khong Teak Garden o el Fortune Riverview.",
            },
          ],
        },
        {
          label: "Días 4–5",
          title: "Río abajo por el Mekong hasta Luang Prabang",
          meals: "Comida a bordo cada día",
          note: "",
          stops: [
            {
              title: "Crucero de dos días río abajo",
              text: "Con una noche en Pak Beng, comidas recién hechas y paradas para visitar, como en el crucero río abajo.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Elige tu día de llegada según una salida del barco: martes, jueves o domingo.",
        "Podemos añadir excursiones en Chiang Mai o preparar un programa a medida.",
      ],
      packages: {},
      extras: ["Excursiones y visitas en Chiang Mai", "Un programa a medida"],
      seo: {
        title: "De Chiang Mai a Luang Prabang en slow boat: circuito de 5 días",
        description:
          "De Chiang Mai a Luang Prabang en cinco días: el Templo Blanco, el Triángulo de Oro, una noche en Chiang Khong y los dos días de crucero por el Mekong pasando por Pak Beng. {from}.",
      },
    },

    "nan-to-luang-prabang": {
      name: "De Nan a Luang Prabang por tierra y por río",
      shortName: "Tierra y crucero · Nan → Luang Prabang",
      bookTitle: "Reservar el viaje de tierra y crucero",
      summary:
        "Cuatro días desde Nan, en el norte de Tailandia, cruzando la frontera por Huai Kon hasta Pak Beng, y después un día por el Mekong hasta Luang Prabang.",
      duration: "4 días · 3 noches",
      departuresLabel: "Llegada a Nan",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "Precio a consultar: escríbenos y te enviaremos un presupuesto.",
      options: {},
      included: [
        "Vuelo de ida en clase turista Bangkok → Nan (15 kg facturados, 7 kg en cabina)",
        "Traslados y visitas según el programa con guía de habla inglesa (solo conductor desde la frontera de Laos hasta Pak Beng)",
        "Comidas indicadas en el programa",
        "Entradas",
        "Hoteles 3★ en Nan y Pak Beng",
        "Crucero de un día Pak Beng → Luang Prabang con comida, refrescos y paradas en una aldea y en la cueva de Pak Ou",
        "Traslado del embarcadero de Luang Prabang al centro",
      ],
      notIncluded: [],
      itinerary: [
        {
          label: "Día 1",
          title: "Llegada a Nan",
          meals: "",
          note: "",
          stops: [
            {
              title: "Recibimiento en el aeropuerto de Nan",
              text: "Traslado a un hotel en el centro.",
            },
            { title: "Por la tarde, visita a los templos más destacados de Nan", text: "" },
            {
              title: "Mercado nocturno",
              text: "Cientos de puestos de comida, recuerdos y artesanía local.",
            },
          ],
        },
        {
          label: "Día 2",
          title: "Mercados, aldeas y comida en una granja",
          meals: "Desayuno, comida",
          note: "",
          stops: [
            {
              title: "Mercados locales y aldeas",
              text: "Incluida la sauna y el masaje en un gallinero.",
            },
            { title: "Comida del norte de Tailandia en una granja", text: "" },
            { title: "Tarde libre", text: "" },
          ],
        },
        {
          label: "Día 3",
          title: "Cruzar la frontera hasta Pak Beng",
          meals: "Desayuno, comida",
          note: "Debes tramitar tu visado de Laos antes del viaje, en una embajada de Laos en tu país o en Bangkok, indicando que entrarás a Laos por Muang Ngeun, provincia de Xayaboury.",
          stops: [
            {
              title: "Entre campos y arrozales",
              text: "Con paradas en el distrito de Pua y comida en un restaurante local; un día de turismo comunitario tailandés.",
            },
            {
              title: "Frontera de Huai Kon",
              text: "Trámites de salida de Tailandia; después, un conductor lao te acompaña por la inmigración de Laos.",
            },
            {
              title: "Pak Beng",
              text: "Unos 55 km, alrededor de una hora, hasta el hotel que elijas en este pequeño pueblo a orillas del río.",
            },
          ],
        },
        {
          label: "Día 4",
          title: "De Pak Beng a Luang Prabang en barco",
          meals: "Desayuno, comida a bordo",
          note: "",
          stops: [
            { title: "Embarque en el Nagi of Mekong", text: "Un día de viaje río abajo." },
            { title: "Aldeas a orillas del río y cueva de Pak Ou", text: "" },
            {
              title: "Luang Prabang",
              text: "Llegada por la tarde y traslado a un hotel en el centro.",
            },
          ],
        },
      ],
      goodToKnow: [
        "Para esta ruta es obligatorio un visado de Laos tramitado con antelación.",
        "Días de llegada a Nan: lunes, miércoles o viernes.",
      ],
      packages: {},
      extras: [],
      seo: {
        title: "De Nan a Luang Prabang por Pak Beng: viaje de 4 días",
        description:
          "Cuatro días desde Nan, en el norte de Tailandia, hasta Luang Prabang por la frontera de Huai Kon, Pak Beng y un día por el Mekong.",
      },
    },
  },
};

export default es;
