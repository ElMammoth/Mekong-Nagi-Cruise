import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { resolvePage, segmentsFor } from "@/i18n/routes";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageView } from "@/views/page-view";

/**
 * Every page of a prefixed language, at its localized path (e.g. /fr/croisieres/…).
 * The paths come from src/i18n/routes.ts; unknown paths are not generated (404).
 */
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return segmentsFor(params.locale).map((path) => ({ path }));
}

async function resolve(params: PageProps<"/[locale]/[[...path]]">["params"]) {
  const { locale, path } = await params;
  if (!isLocale(locale) || locale === "en") return null;
  const key = resolvePage(locale, path ?? []);
  return key ? { locale: locale as Locale, key } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[[...path]]">): Promise<Metadata> {
  const found = await resolve(params);
  return found ? pageMetadata(found.locale, found.key) : {};
}

export default async function LocalizedPage({ params }: PageProps<"/[locale]/[[...path]]">) {
  const found = await resolve(params);
  if (!found) notFound();
  setRequestLocale(found.locale);
  return <PageView page={found.key} />;
}
