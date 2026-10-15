import type { Weekday } from "@/content/types";

/** A known Sunday (4 January 1970 was a Sunday): weekday `n` is this date + n days. */
const SUNDAY = new Date(1970, 0, 4);

/** Sorts weekdays Monday-first, the way travellers read a week. */
export function sortWeekdays(days: readonly Weekday[]): Weekday[] {
  return [...days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
}

/** Weekday name in a locale: ("en-GB", 0) → "Sunday"; "short" → "Sun". */
export function weekdayName(day: Weekday, intlLocale = "en-GB", style: "long" | "short" = "long") {
  const date = new Date(SUNDAY.getFullYear(), SUNDAY.getMonth(), SUNDAY.getDate() + day);
  return new Intl.DateTimeFormat(intlLocale, { weekday: style }).format(date);
}

/** "Wednesday, Friday and Sunday", in the locale's own list style. */
export function formatWeekdays(
  days: readonly Weekday[],
  intlLocale = "en-GB",
  style: "long" | "short" = "long",
  type: "conjunction" | "disjunction" = "conjunction",
): string {
  const names = sortWeekdays(days).map((d) => weekdayName(d, intlLocale, style));
  return new Intl.ListFormat(intlLocale, { style: "long", type }).format(names);
}

/** "3 November 2025" style date in a locale, from an ISO "YYYY-MM-DD" date. */
export function formatIsoDate(
  iso: string,
  intlLocale: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
) {
  return new Intl.DateTimeFormat(intlLocale, options).format(parseIsoDate(iso));
}

/** Parses "YYYY-MM-DD" as a local calendar date (no timezone shift). */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Next `count` dates (as ISO strings) falling on one of `weekdays`,
 * starting `leadDays` after `from` so there is time to confirm the booking.
 */
export function upcomingDepartures(
  weekdays: readonly Weekday[],
  from: Date,
  count = 6,
  leadDays = 2,
): string[] {
  if (weekdays.length === 0 || count <= 0) return [];
  const allowed = new Set<number>(weekdays);
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate() + leadDays);
  const dates: string[] = [];
  while (dates.length < count) {
    if (allowed.has(cursor.getDay())) dates.push(toIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

/** True when `on` (ISO date) is inside the option's validity window. Missing bounds are open. */
export function isOptionAvailable(
  option: { validFrom?: string; validTo?: string },
  on: string,
): boolean {
  if (option.validFrom && on < option.validFrom) return false;
  if (option.validTo && on > option.validTo) return false;
  return true;
}

/** Options that are bookable on `on`. Defaults to today. */
export function availableOptions<T extends { validFrom?: string; validTo?: string }>(
  options: readonly T[],
  on = toIsoDate(new Date()),
): T[] {
  return options.filter((o) => isOptionAvailable(o, on));
}
