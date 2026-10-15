"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { LOCALE_COOKIE, isLocale, localeInfo, matchLocale, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages/en";
import { useConsent } from "@/lib/consent";
import { buttonClasses } from "@/components/ui/button";
import { rememberLocale, useAlternates } from "./locale-switchers";

type BannerCopy = Messages["banner"];

const noopSubscribe = () => () => {};

/**
 * The language a first-time visitor's browser asks for, when we have it and it isn't the
 * page's. Reads `navigator.languages` — the list the browser sends as Accept-Language — in
 * the browser, because the site is static (no server to read the header). Never uses IP
 * location. Null on the server and once the visitor has chosen (cookie), so crawlers and
 * returning visitors never see it.
 */
function useSuggestedLocale(current: Locale): Locale | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const chosen = document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${LOCALE_COOKIE}=`))
        ?.split("=")[1];
      if (isLocale(chosen)) return null;
      const detected = matchLocale(navigator.languages ?? [navigator.language]);
      return detected && detected !== current ? detected : null;
    },
    () => null,
  );
}

/**
 * Small, dismissible offer to read the page in the browser's language. Shown on the
 * default-language (unprefixed) pages only, fixed to the bottom of the viewport so it never
 * moves the page. No automatic redirect, ever.
 */
export function LanguageBanner({ copy }: { copy: Record<Locale, BannerCopy> }) {
  const { locale, m } = useI18n();
  const suggested = useSuggestedLocale(locale);
  const alternates = useAlternates();
  const [closed, setClosed] = useState(false);
  const consent = useConsent();
  // Never stacked on the cookie banner: the language offer waits for the consent choice.
  if (!suggested || closed || !consent.decided) return null;

  const text = copy[suggested];
  const tag = localeInfo[suggested].tag;
  const dismiss = () => {
    rememberLocale(locale);
    setClosed(true);
  };

  return (
    <section
      aria-label={text.label}
      lang={tag}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 print:hidden"
    >
      <div className="mx-auto flex max-w-2xl animate-rise flex-wrap items-center gap-x-4 gap-y-3 rounded-md border border-line bg-surface p-4 shadow-lg">
        <p className="min-w-0 flex-1 text-ink">{text.text}</p>
        <div className="flex items-center gap-2">
          <a
            href={alternates[suggested]}
            hrefLang={tag}
            onClick={() => rememberLocale(suggested)}
            className={buttonClasses({ variant: "primary" })}
          >
            {text.accept}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className={buttonClasses({ variant: "secondary" })}
          >
            {text.dismiss}
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="grid size-11 place-items-center rounded-sm text-muted hover:bg-surface-tint"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only" lang={localeInfo[locale].tag}>
              {m.banner.dismissLabel}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
