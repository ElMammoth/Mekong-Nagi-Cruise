import type { Locale } from "./config";
import de from "./messages/de";
import en, { type Messages } from "./messages/en";
import es from "./messages/es";
import fr from "./messages/fr";
import th from "./messages/th";
import zh from "./messages/zh";

export type { Messages };

const all: Record<Locale, Messages> = { en, fr, de, es, zh, th };

/** All copy for a language. Server side: client components receive only what they need. */
export function getMessages(locale: Locale): Messages {
  return all[locale];
}

export { fmt, plural, type PluralForms, type Vars } from "./format";
