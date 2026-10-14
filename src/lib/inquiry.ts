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
  diet?: string;
  message?: string;
}

export type InquiryErrors = Partial<Record<"name" | "trip" | "travellers" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!input.name.trim()) errors.name = "Please tell us your name.";
  if (!input.trip.trim()) errors.trip = "Choose a cruise or journey.";
  if (!Number.isInteger(input.travellers) || input.travellers < 1 || input.travellers > 40) {
    errors.travellers = "Travellers must be between 1 and 40.";
  }
  if (input.email && !EMAIL.test(input.email.trim())) {
    errors.email = "This email address doesn’t look right.";
  }
  return errors;
}

/** Plain-text message sent through WhatsApp or email. Order mirrors what the operator needs. */
export function buildInquiryMessage(input: InquiryInput): string {
  const lines = [
    `Hello ${site.name}, I would like to book:`,
    "",
    `Trip: ${input.trip}`,
    `Departure: ${input.dateLabel ?? input.date ?? "Flexible — please suggest"}`,
    `Travellers: ${input.travellers}`,
    input.option ? `Option: ${input.option}` : undefined,
    input.estimate ? `Estimate shown on website: ${input.estimate}` : undefined,
    input.diet ? `Dietary needs: ${input.diet}` : undefined,
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
