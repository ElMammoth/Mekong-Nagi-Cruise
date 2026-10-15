"use client";

import { createContext, useContext, type ReactNode } from "react";
import { localeInfo, type Locale } from "./config";
import type { Messages } from "./messages/en";

/** The slice of copy client components need on every page (kept small: it ships to the browser). */
export type ClientMessages = Pick<
  Messages,
  "common" | "nav" | "switcher" | "currency" | "nextSailings" | "banner"
>;

interface I18nValue {
  locale: Locale;
  /** Locale for the Intl APIs, e.g. "fr-FR". */
  intl: string;
  m: ClientMessages;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: ClientMessages;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, intl: localeInfo[locale].intl, m: messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n() needs <I18nProvider>.");
  return value;
}
