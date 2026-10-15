import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { RouteMap } from "@/components/brand/route-map";
import { DualPrice } from "@/components/currency/price";
import { Photo } from "@/components/media/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPhotos, getStays, getTrip } from "@/content/localized";
import { site } from "@/content/site";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { interpolate, rich } from "@/i18n/rich";
import { pathFor, type PageKey } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { availableOptions, formatWeekdays } from "@/lib/departures";
import { navigation } from "@/lib/navigation";

const tocIds = [
  ["route", "route"],
  ["border", "border"],
  ["day-one", "dayOne"],
  ["pak-beng", "pakBeng"],
  ["day-two", "dayTwo"],
  ["upstream", "upstream"],
  ["from-chiang-mai", "fromChiangMai"],
  ["from-nan", "fromNan"],
  ["packing", "packing"],
] as const;

/**
 * Lead magnet and main informational page (docs/04-offer-brief.md §9, docs/05-seo-keywords.md).
 * Every fact comes from the trip and stay data, so prices and days stay in sync.
 */
export function GuideView() {
  const { locale, m } = getI18n();
  const g = m.guide;
  const intl = localeInfo[locale].intl;
  const nav = navigation(locale);
  const photos = getPhotos(locale);
  const down = getTrip(locale, "downstream")!;
  const up = getTrip(locale, "upstream")!;
  const chiangMai = getTrip(locale, "chiang-mai-land-and-cruise")!;
  const downOptions = availableOptions(down.options);
  const usd = (id: string) => downOptions.find((o) => o.id === id)?.usd;
  const pakBeng = getStays(locale).filter((s) => s.place === "Pak Beng");
  const upPrice = availableOptions(up.options)[0];
  const cmPrice = availableOptions(chiangMai.options)[0];
  const to = (key: PageKey) =>
    function GuideLink(text: ReactNode) {
      return <Link href={pathFor(locale, key)}>{text}</Link>;
    };
  const price = (amount: number) => <DualPrice usd={amount} />;
  const cruiseOnly = usd("cruise-only");

  return (
    <>
      <PageHeader
        eyebrow={g.eyebrow}
        title={g.heading}
        intro={g.intro}
        crumbs={[{ href: pathFor(locale, "guide"), label: g.crumb }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={nav.downstreamBookingHref} size="lg" variant="cta">
            {nav.bookingLabel}
          </ButtonLink>
          <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
            <MessageCircle aria-hidden="true" />
            {g.askWhatsApp}
          </ButtonAnchor>
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-toc lg:gap-16">
        <nav aria-label={g.onThisPage} className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-display text-eyebrow text-muted uppercase">{g.onThisPage}</p>
          <ol className="mt-3 space-y-2 border-l border-line pl-4 text-sm">
            {tocIds.map(([id, key]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-ink hover:text-primary hover:underline">
                  {g.toc[key]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 space-y-16">
          <GuideSection id="route" title={g.toc.route}>
            <p>
              {fmt(g.route, {
                downDays: formatWeekdays(down.departures.weekdays, intl),
                upDays: formatWeekdays(up.departures.weekdays, intl),
              })}
            </p>
            <RouteMap className="mx-auto w-full max-w-xl" />
          </GuideSection>

          <GuideSection id="border" title={g.toc.border}>
            {g.border.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </GuideSection>

          <GuideSection id="day-one" title={g.toc.dayOne}>
            <p>{g.dayOne}</p>
            <Photo
              photo={photos.riverBanks}
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="max-w-2xl"
            />
          </GuideSection>

          <GuideSection id="pak-beng" title={g.toc.pakBeng}>
            <p>{g.pakBengIntro}</p>
            <ul>
              {pakBeng.map((stay) => {
                const amount = usd(stay.packageOptionId ?? "");
                return (
                  <li key={stay.id}>
                    {rich(
                      g.pakBengStay,
                      { name: (text) => <strong>{text}</strong> },
                      {
                        name: stay.name,
                        tier: stay.tier.toLocaleLowerCase(intl),
                        facts: stay.facts.join(", ").toLocaleLowerCase(intl),
                      },
                    )}
                    {amount ? <> {interpolate(g.pakBengPrice, { price: price(amount) })}</> : null}
                  </li>
                );
              })}
            </ul>
            {cruiseOnly ? <p>{interpolate(g.cruiseOnly, { price: price(cruiseOnly) })}</p> : null}
            <p>{rich(g.pakBengCold, { link: to("whereToStay") })}</p>
          </GuideSection>

          <GuideSection id="day-two" title={g.toc.dayTwo}>
            <p>{g.dayTwo}</p>
            <Photo
              photo={photos.pakOuCave}
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="max-w-2xl"
            />
            <p>{rich(g.dayTwoLink, { link: to("trip:downstream") })}</p>
          </GuideSection>

          <GuideSection id="upstream" title={g.upstreamTitle}>
            <p>
              {fmt(g.upstream, { days: formatWeekdays(up.departures.weekdays, intl) })}
              {upPrice ? <> {interpolate(g.upstreamPrice, { price: price(upPrice.usd) })}</> : null}
            </p>
            <p>{rich(g.upstreamMore, { link: to("trip:upstream") })}</p>
          </GuideSection>

          <GuideSection id="from-chiang-mai" title={g.toc.fromChiangMai}>
            <p>
              {fmt(g.chiangMai, {
                days: formatWeekdays(chiangMai.departures.weekdays, intl, "long", "disjunction"),
              })}
              {cmPrice ? (
                <> {interpolate(g.chiangMaiPrice, { price: price(cmPrice.usd) })}</>
              ) : null}{" "}
              {rich(g.chiangMaiLink, { link: to("trip:chiang-mai-land-and-cruise") })}
            </p>
          </GuideSection>

          <GuideSection id="from-nan" title={g.toc.fromNan}>
            <p>
              {g.nan} {getTrip(locale, "nan-to-luang-prabang")?.priceOnRequest}{" "}
              {rich(g.nanLink, { link: to("trip:nan-to-luang-prabang") })}
            </p>
          </GuideSection>

          <GuideSection id="packing" title={g.toc.packing}>
            <ul>
              {g.packing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{rich(g.packingLink, { link: to("faq") })}</p>
          </GuideSection>
        </article>
      </Container>

      <CtaBand title={g.ctaTitle} href={nav.downstreamBookingHref} />
    </>
  );
}

function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      <div className="prose-river mt-5 max-w-none space-y-5 [&>p]:max-w-prose">{children}</div>
    </section>
  );
}
