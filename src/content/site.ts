/**
 * Organisation-wide details that don't change with the language. Source: nagiofmekong.com
 * (audited October 2026). Every visitor-facing sentence is in `src/i18n/messages/*`.
 */
export const site = {
  name: "Nagi of Mekong",
  url: "https://nagiofmekong.com",

  contact: {
    phoneDisplay: "+66 95 507 3264",
    phoneHref: "tel:+66955073264",
    whatsappNumber: "66955073264",
    whatsappHref: "https://wa.me/66955073264",
    email: "adisak.star@gmail.com",
    hours: "09:00–20:00",
    location: {
      locality: "Chiang Khong",
      region: "Chiang Rai",
      postalCode: "57140",
      countryCode: "TH",
    },
  },
} as const;

export type Site = typeof site;
