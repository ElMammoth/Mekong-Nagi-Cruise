"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import { NavigationMenu } from "radix-ui";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useCurrency } from "@/components/currency/currency-provider";
import { useI18n } from "@/i18n/client";
import { LOCALE_COOKIE, localeInfo, locales, type Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { alternatesFor, locate, pathFor } from "@/i18n/routes";
import { cn } from "@/lib/cn";
import {
  availableCurrencies,
  currencyName,
  currencySymbol,
  type CurrencyCode,
} from "@/lib/currency";

/** Remembers a language choice for a year (switcher or banner). Never used to redirect. */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/** The current page in every language (falls back to each home page). */
export function useAlternates(): Record<Locale, string> {
  const pathname = usePathname();
  const found = locate(pathname);
  if (found) return alternatesFor(found.key);
  return Object.fromEntries(locales.map((l) => [l, pathFor(l, "home")])) as Record<Locale, string>;
}

const itemClass =
  "group inline-flex min-h-11 items-center gap-1.5 rounded-sm px-2 font-display text-sm text-heading transition-colors duration-fast hover:bg-surface-tint data-[state=open]:bg-surface-tint";
const panelClass =
  "absolute top-full right-0 z-50 mt-2 w-max min-w-full rounded-md border border-line bg-surface p-2 shadow-md data-[state=open]:animate-rise";
const optionClass =
  "flex min-h-11 w-full items-center justify-between gap-6 rounded-sm px-3 text-left text-ink transition-colors duration-fast hover:bg-surface-tint aria-[current=page]:text-accent aria-pressed:text-accent";

/**
 * Desktop language and currency menus: a Radix NavigationMenu (arrow keys between the two
 * triggers, Enter/Space/↓ to open, Esc to close, Tab through the options).
 */
export function DesktopSwitchers() {
  const { m } = useI18n();
  return (
    <NavigationMenu.Root aria-label={m.switcher.region} className="relative hidden lg:block">
      <NavigationMenu.List className="flex items-center">
        <NavigationMenu.Item className="relative">
          <LanguageTrigger />
          <NavigationMenu.Content className={panelClass}>
            <LanguageOptions />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="relative">
          <CurrencyTrigger />
          <NavigationMenu.Content className={panelClass}>
            <CurrencyOptions />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function LanguageTrigger() {
  const { locale, m } = useI18n();
  const name = localeInfo[locale].nativeName;
  return (
    <NavigationMenu.Trigger className={itemClass}>
      <Globe aria-hidden="true" className="size-4" />
      <span>{locale.toUpperCase()}</span>
      <span className="sr-only">, {fmt(m.switcher.languageButton, { name })}</span>
      <ChevronDown
        aria-hidden="true"
        className="size-4 transition-transform duration-base group-data-[state=open]:rotate-180"
      />
    </NavigationMenu.Trigger>
  );
}

function CurrencyTrigger() {
  const { intl, m } = useI18n();
  const [currency] = useCurrency();
  return (
    <NavigationMenu.Trigger className={itemClass}>
      <span>{currency}</span>
      <span className="sr-only">
        , {fmt(m.switcher.currencyButton, { name: currencyName(currency, intl) })}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="size-4 transition-transform duration-base group-data-[state=open]:rotate-180"
      />
    </NavigationMenu.Trigger>
  );
}

/** Links to the same page in each language, each name written in its own language. */
export function LanguageOptions({ onPick }: { onPick?: () => void }) {
  const { locale: current, m } = useI18n();
  const alternates = useAlternates();
  return (
    <ul aria-label={m.switcher.language} className="space-y-0.5">
      {locales.map((l) => (
        <li key={l}>
          <a
            href={alternates[l]}
            hrefLang={localeInfo[l].tag}
            lang={localeInfo[l].tag}
            aria-current={l === current ? "page" : undefined}
            onClick={() => {
              rememberLocale(l);
              onPick?.();
            }}
            className={optionClass}
          >
            <span>{localeInfo[l].nativeName}</span>
            {l === current ? <Check aria-hidden="true" className="size-4" /> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Currency buttons: code, symbol and name; the chosen one is pressed. */
export function CurrencyOptions() {
  const { intl, m } = useI18n();
  const [currency, setCurrency] = useCurrency();
  return (
    <div className="w-72">
      <ul aria-label={m.switcher.currency} className="space-y-0.5">
        {availableCurrencies().map((code) => (
          <li key={code}>
            <NavigationMenu.Link asChild>
              <button
                type="button"
                aria-pressed={code === currency}
                onClick={() => setCurrency(code)}
                className={optionClass}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-sm">{code}</span>
                  <span className="text-muted">{currencySymbol(code, intl)}</span>
                  <span className="text-sm text-muted">{currencyName(code, intl)}</span>
                </span>
                {code === currency ? <Check aria-hidden="true" className="size-4" /> : null}
              </button>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-line px-3 pt-2 text-sm text-muted">
        {m.switcher.currencyHint}
      </p>
    </div>
  );
}

/** Mobile menu: the language links and a native currency select (fully keyboard-accessible). */
export function MobileSwitchers({ onNavigate }: { onNavigate?: () => void }) {
  const { intl, m } = useI18n();
  const [currency, setCurrency] = useCurrency();
  const id = useId();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p id={`${id}-lang`} className="font-display text-eyebrow text-muted uppercase">
          {m.switcher.language}
        </p>
        <div className="mt-2 rounded-md border border-line p-1">
          <LanguageOptions onPick={onNavigate} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-cur`} className="font-display text-eyebrow text-muted uppercase">
          {m.switcher.currency}
        </label>
        <select
          id={`${id}-cur`}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          aria-describedby={`${id}-cur-hint`}
          className="mt-2 block min-h-12 w-full rounded-sm border border-control bg-surface px-3 text-base text-ink hover:border-primary"
        >
          {availableCurrencies().map((code) => (
            <option key={code} value={code}>
              {code} · {currencySymbol(code, intl)} · {currencyName(code, intl)}
            </option>
          ))}
        </select>
        <p id={`${id}-cur-hint`} className={cn("mt-2 text-sm text-muted")}>
          {m.switcher.currencyHint}
        </p>
      </div>
    </div>
  );
}
