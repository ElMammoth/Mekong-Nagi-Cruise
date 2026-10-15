import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/content/site";
import { localeInfo, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/index";
import { pathFor } from "@/i18n/routes";
import { poppins, sourceSans } from "./fonts";
import "./globals.css";

/*
 * 404 for any unknown URL (the site has two root layouts, so Next.js needs a global one).
 * A static file can't know the visitor's language: it speaks English and links to every
 * language's home page, each named in its own language.
 */
const m = getMessages("en");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: m.meta.notFoundTitle,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-start px-gutter py-24 sm:px-6 sm:py-32 lg:px-8">
          <Logo />
          <h1 className="mt-6 text-h1">{m.notFound.title}</h1>
          <p className="mt-4 max-w-xl text-lead text-muted">{m.notFound.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={buttonClasses()}>
              {m.notFound.home}
            </Link>
            <Link
              href={pathFor("en", "contact")}
              className={buttonClasses({ variant: "secondary" })}
            >
              {m.notFound.contact}
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={pathFor(l, "home")}
                  lang={localeInfo[l].tag}
                  hrefLang={localeInfo[l].tag}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {localeInfo[l].nativeName}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
