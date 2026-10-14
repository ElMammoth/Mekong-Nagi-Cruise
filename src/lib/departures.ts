import type { PriceOption, Weekday } from "@/content/types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Sorts weekdays Monday-first, the way travellers read a week. */
export function sortWeekdays(days: readonly Weekday[]): Weekday[] {
  return [...days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
}

export function weekdayName(day: Weekday, style: "long" | "short" = "long"): string {
  const name = DAY_NAMES[day];
  return style === "short" ? name.slice(0, 3) : name;
}

/** "Sunday, Wednesday and Friday" */
export function formatWeekdays(days: readonly Weekday[], style: "long" | "short" = "long"): string {
  const names = sortWeekdays(days).map((d) => weekdayName(d, style));
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
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
export function isOptionAvailable(option: PriceOption, on: string): boolean {
  if (option.validFrom && on < option.validFrom) return false;
  if (option.validTo && on > option.validTo) return false;
  return true;
}

/** Options that are bookable on `on`. Defaults to today. */
export function availableOptions(options: readonly PriceOption[], on = toIsoDate(new Date())) {
  return options.filter((o) => isOptionAvailable(o, on));
}
