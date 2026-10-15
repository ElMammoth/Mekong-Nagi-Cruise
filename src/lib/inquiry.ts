import { site } from "@/content/site";

export interface InquiryInput {
  name: string;
  email?: string;
  phone?: string;
  trip: string;
  date?: string;
  dateLabel?: string;
  travellers: number;
  option?: string;
  estimate?: string;
  /** "Also ask us about…" items ticked in the form. */
  extras?: string[];
  diet?: string;
  message?: string;
  /** The visitor's language, so the reply can match it (e.g. "Français"). */
  language?: string;
}

export type InquiryErrors = Partial<Record<"name" | "trip" | "travellers" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Error messages in the visitor's language (`booking.errors` in the translation files). */
export type InquiryErrorMessages = Record<keyof InquiryErrors, string>;

const ENGLISH_ERRORS: InquiryErrorMessages = {
  name: "Please tell us your name.",
  trip: "Choose a cruise or journey.",
  travellers: "Travellers must be between 1 and 40.",
  email: "This email address doesn’t look right.",
};

export function validateInquiry(
  input: InquiryInput,
  messages: InquiryErrorMessages = ENGLISH_ERRORS,
): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!input.name.trim()) errors.name = messages.name;
  if (!input.trip.trim()) errors.trip = messages.trip;
  if (!Number.isInteger(input.travellers) || input.travellers < 1 || input.travellers > 40) {
    errors.travellers = messages.travellers;
  }
  if (input.email && !EMAIL.test(input.email.trim())) {
    errors.email = messages.email;
  }
  return errors;
}

/**
 * Plain-text message sent through WhatsApp or email. Order mirrors what the operator needs.
 * Always in English with US dollar amounts (the operator's working language and the
 * currency bookings are charged in), plus the visitor's language so the reply can match it.
 */
export function buildInquiryMessage(input: InquiryInput): string {
  const lines = [
    `Hello ${site.name}, I would like to book:`,
    "",
    `Trip: ${input.trip}`,
    `Departure: ${input.dateLabel ?? input.date ?? "Flexible — please suggest"}`,
    `Travellers: ${input.travellers}`,
    input.option ? `Option: ${input.option}` : undefined,
    input.estimate ? `Estimate shown on website: ${input.estimate}` : undefined,
    input.extras?.length ? `Please also tell me about: ${input.extras.join("; ")}` : undefined,
    input.diet ? `Dietary needs: ${input.diet}` : undefined,
    input.language ? `Preferred language: ${input.language}` : undefined,
    "",
    `Name: ${input.name.trim()}`,
    input.email ? `Email: ${input.email.trim()}` : undefined,
    input.phone ? `Phone / WhatsApp: ${input.phone.trim()}` : undefined,
    input.message?.trim() ? ["", input.message.trim()].join("\n") : undefined,
  ];
  return lines.filter((l): l is string => l !== undefined).join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
