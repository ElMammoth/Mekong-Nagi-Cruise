import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { RootDocument } from "@/components/layout/root-document";
import { isLocale, prefixedLocales } from "@/i18n/config";
import { rootMetadata, rootViewport } from "@/lib/metadata";

/** Root layout for every other language, under its prefix (/fr/, /de/…). */
export const dynamicParams = false;
export const viewport = rootViewport;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  return isLocale(locale) ? rootMetadata(locale) : {};
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <RootDocument locale={locale}>{children as ReactNode}</RootDocument>;
}
