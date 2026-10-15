import { describe, expect, it } from "vitest";
import { trips } from "@/content/trips";
import {
  availableOptions,
  formatWeekdays,
  parseIsoDate,
  upcomingDepartures,
} from "@/lib/departures";
import { estimateTotalUsd, fromPriceUsd } from "@/lib/currency";
import { getTrips } from "@/content/localized";
import { buildInquiryMessage, validateInquiry, whatsappUrl } from "@/lib/inquiry";

const downstream = trips.find((t) => t.slug === "downstream")!;

describe("departures", () => {
  it("lists only real departure weekdays, after the lead time", () => {
    // Wednesday 14 October 2026
    const dates = upcomingDepartures([0, 3, 5], new Date(2026, 9, 14), 4);
    expect(dates).toEqual(["2026-10-16", "2026-10-18", "2026-10-21", "2026-10-23"]);
    for (const d of dates) expect([0, 3, 5]).toContain(parseIsoDate(d).getDay());
  });

  it("formats weekdays Monday-first, in each language", () => {
    expect(formatWeekdays([0, 3, 5])).toBe("Wednesday, Friday and Sunday");
    expect(formatWeekdays([1, 4], "en-GB", "short")).toBe("Mon and Thu");
    expect(formatWeekdays([0, 3, 5], "fr-FR")).toBe("mercredi, vendredi et dimanche");
    expect(formatWeekdays([1, 4], "de-DE")).toBe("Montag und Donnerstag");
  });

  it("hides seasonal offers outside their window", () => {
    const ids = (on: string) => availableOptions(downstream.options, on).map((o) => o.id);
    expect(ids("2026-06-01")).toContain("sanctuary-summer-2026");
    expect(ids("2026-10-14")).not.toContain("sanctuary-summer-2026");
    expect(ids("2025-09-01")).not.toContain("sanctuary");
  });
});

describe("prices", () => {
  it("finds the lowest price", () => {
    expect(fromPriceUsd(downstream.options)).toBe(140);
  });

  it("adds the single supplement for one traveller only", () => {
    const standard = downstream.options.find((o) => o.id === "standard")!;
    expect(estimateTotalUsd(standard, 1)).toBe(180);
    expect(estimateTotalUsd(standard, 2)).toBe(320);
    expect(estimateTotalUsd(standard, 0)).toBeUndefined();
  });
});

describe("content integrity", () => {
  it("every trip has a route, departures and an itinerary", () => {
    for (const trip of getTrips("en")) {
      expect(trip.route.length).toBeGreaterThan(1);
      expect(trip.departures.weekdays.length).toBeGreaterThan(0);
      expect(trip.itinerary.length).toBeGreaterThan(0);
      expect(trip.options.length > 0 || Boolean(trip.priceOnRequest)).toBe(true);
    }
  });

  it("slugs are unique", () => {
    expect(new Set(trips.map((t) => t.slug)).size).toBe(trips.length);
  });
});

describe("inquiry", () => {
  const base = { name: "Ana", trip: "Downstream", travellers: 2 };

  it("validates required fields", () => {
    expect(validateInquiry(base)).toEqual({});
    expect(validateInquiry({ ...base, name: " " }).name).toBeDefined();
    expect(validateInquiry({ ...base, travellers: 0 }).travellers).toBeDefined();
    expect(validateInquiry({ ...base, email: "nope" }).email).toBeDefined();
  });

  it("builds a readable message and encodes it for WhatsApp", () => {
    const text = buildInquiryMessage({ ...base, dateLabel: "Friday 16 October 2026" });
    expect(text).toContain("Trip: Downstream");
    expect(text).toContain("Departure: Friday 16 October 2026");
    expect(text).not.toContain("undefined");
    expect(whatsappUrl(text)).toMatch(/^https:\/\/wa\.me\/66955073264\?text=Hello%20/);
  });
});
