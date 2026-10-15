import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tripKey, tripSlugs, type TripSlug } from "@/i18n/routes";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageView } from "@/views/page-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return tripSlugs.map((slug) => ({ slug }));
}

const isTrip = (slug: string): slug is TripSlug => (tripSlugs as readonly string[]).includes(slug);

export async function generateMetadata({
  params,
}: PageProps<"/cruises/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return isTrip(slug) ? pageMetadata("en", tripKey(slug)) : {};
}

export default async function TripPage({ params }: PageProps<"/cruises/[slug]">) {
  const { slug } = await params;
  if (!isTrip(slug)) notFound();
  setRequestLocale("en");
  return <PageView page={tripKey(slug)} />;
}
