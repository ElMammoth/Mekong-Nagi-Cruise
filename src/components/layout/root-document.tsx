import type { ReactNode } from "react";
import { JsonLd } from "@/components/layout/json-ld";
import { LanguageBanner } from "@/components/layout/language-banner";
import { PlatformLogoSymbols } from "@/components/reviews/platform-logo";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { I18nProvider, type ClientMessages } from "@/i18n/client";
import { defaultLocale, localeInfo, locales, type Locale } from "@/i18n/config";
import { getMessages, type Messages } from "@/i18n/index";
import { setRequestLocale } from "@/i18n/server";
import { navigation } from "@/lib/navigation";
import { organizationJsonLd } from "@/lib/structured-data";
import { poppins, sourceSans } from "@/app/fonts";
import "@/app/globals.css";

/** The copy every client component may need (kept small: it ships to the browser). */
function clientMessages(m: Messages): ClientMessages {
  return {
    common: m.common,
    nav: m.nav,
    switcher: m.switcher,
    currency: m.currency,
    nextSailings: m.nextSailings,
    banner: m.banner,
  };
}

/**
 * The whole document for one language: `<html lang>`, fonts, header, footer, the
 * organisation's structured data and the language offer. Used by both root layouts
 * (English at `/`, other languages under their prefix).
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  setRequestLocale(locale);
  const m = getMessages(locale);
  const nav = navigation(locale);
  const banners = Object.fromEntries(locales.map((l) => [l, getMessages(l).banner])) as Record<
    Locale,
    typeof m.banner
  >;

  return (
    <html
      lang={localeInfo[locale].tag}
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${sourceSans.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <PlatformLogoSymbols />
        <I18nProvider locale={locale} messages={clientMessages(m)}>
          <a
            href="#main"
            className="sr-only z-50 rounded-sm bg-primary px-5 py-3 font-display text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {m.common.skipToContent}
          </a>
          <SiteHeader nav={nav} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter nav={nav} />
          {locale === defaultLocale ? <LanguageBanner copy={banners} /> : null}
        </I18nProvider>
        <JsonLd data={organizationJsonLd(locale)} />
      </body>
    </html>
  );
}
