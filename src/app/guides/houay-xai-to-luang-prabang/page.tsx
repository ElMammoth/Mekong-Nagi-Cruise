import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { RouteMap } from "@/components/brand/route-map";
import { Photo } from "@/components/media/photo";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { bookingLabel, downstreamBookingHref } from "@/content/navigation";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { stays } from "@/content/stays";
import { getTrip } from "@/content/trips";
import { availableOptions, formatWeekdays } from "@/lib/departures";
import { pageMetadata } from "@/lib/metadata";
import { formatMoney } from "@/lib/money";

const path = "/guides/houay-xai-to-luang-prabang/";

export const metadata = pageMetadata({
  title: "Huay Xai to Luang Prabang by slow boat: route guide",
  description:
    "How the two-day slow boat from Chiang Khong and Houay Xai (Huay Xai) to Luang Prabang works: departure days, border and Lao visa, the Pak Beng night, upstream.",
  path,
});

const toc = [
  { id: "route", label: "The route at a glance" },
  { id: "border", label: "Chiang Khong, Houay Xai and the border" },
  { id: "day-one", label: "Day one: Houay Xai to Pak Beng" },
  { id: "pak-beng", label: "The night in Pak Beng" },
  { id: "day-two", label: "Day two: Pak Beng to Luang Prabang" },
  { id: "upstream", label: "Going upstream" },
  { id: "from-chiang-mai", label: "Starting in Chiang Mai" },
  { id: "from-nan", label: "Starting in Nan" },
  { id: "packing", label: "What to bring" },
];

/**
 * Lead magnet and main informational page (docs/04-offer-brief.md §9, docs/05-seo-keywords.md).
 * Every fact comes from the trip and stay data, so prices and days stay in sync.
 */
export default function RouteGuidePage() {
  const down = getTrip("downstream")!;
  const up = getTrip("upstream")!;
  const chiangMai = getTrip("chiang-mai-land-and-cruise")!;
  const nan = getTrip("nan-to-luang-prabang")!;
  const downOptions = availableOptions(down.options);
  const price = (id: string) => {
    const option = downOptions.find((o) => o.id === id);
    return option ? formatMoney(option.perPerson) : undefined;
  };
  const pakBeng = stays.filter((s) => s.place === "Pak Beng");
  const upPrice = availableOptions(up.options)[0];
  const cmPrice = availableOptions(chiangMai.options)[0];

  return (
    <>
      <PageHeader
        eyebrow="Route guide"
        title="Houay Xai to Luang Prabang by slow boat"
        intro={
          <>
            How the two-day Mekong journey between the Thai–Lao border and Luang Prabang works, from
            the border crossing to the night in Pak Beng. Houay Xai is also written Huay Xai or
            Houayxay, and Pak Beng is often written Pakbeng.
          </>
        }
        crumbs={[{ href: path, label: "Route guide" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={downstreamBookingHref} size="lg">
            {bookingLabel}
          </ButtonLink>
          <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
            <MessageCircle aria-hidden="true" />
            Ask us on WhatsApp
          </ButtonAnchor>
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
            On this page
          </p>
          <ol className="mt-3 space-y-2 border-l border-silt pl-4 text-[0.9375rem]">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-ink hover:text-lantern hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 space-y-16">
          <GuideSection id="route" title="The route at a glance">
            <p>
              The river journey takes two days with one night in Pak Beng, the village halfway
              between the border and Luang Prabang. Downstream boats leave Houay Xai every{" "}
              {formatWeekdays(down.departures.weekdays)}. Upstream boats leave Luang Prabang every{" "}
              {formatWeekdays(up.departures.weekdays)}.
            </p>
            <RouteMap className="mx-auto w-full max-w-xl" />
          </GuideSection>

          <GuideSection id="border" title="Chiang Khong, Houay Xai and the border">
            <p>
              Chiang Khong, in Thailand’s Chiang Rai province, sits across the Mekong from Houay Xai
              in Laos. On our downstream cruise we pick you up after breakfast from your hotel in
              either town, look after your luggage and help you through the Thai and Lao border
              formalities and the visa on arrival.
            </p>
            <p>For the Lao visa on arrival, bring the fee in US dollars and one passport photo.</p>
          </GuideSection>

          <GuideSection id="day-one" title="Day one: Houay Xai to Pak Beng">
            <p>
              Once on board there’s tea and coffee while the riverbanks go by. The boat stops at a
              rural village, a hot lunch is cooked on board, and you reach Pak Beng in the
              afternoon. We take you to your hotel and the evening is yours.
            </p>
            <Photo
              photo={photos.riverBanks}
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="max-w-2xl"
            />
          </GuideSection>

          <GuideSection id="pak-beng" title="The night in Pak Beng">
            <p>
              Our downstream packages include the night in Pak Beng, and the price depends on the
              hotel you pick:
            </p>
            <ul>
              {pakBeng.map((stay) => {
                const p = price(stay.packageOptionId ?? "");
                return (
                  <li key={stay.name}>
                    <strong>{stay.name}</strong> ({stay.tier.toLowerCase()}):{" "}
                    {stay.facts.join(", ").toLowerCase()}
                    {p ? `. Cruise package ${p} per person.` : "."}
                  </li>
                );
              })}
            </ul>
            {price("cruise-only") ? (
              <p>
                Already have a room? A cruise-only seat costs {price("cruise-only")} per person and
                you arrange your own night.
              </p>
            ) : null}
            <p>
              Pak Beng can be very cold from November to January.{" "}
              <Link href="/where-to-stay/">Compare the Pak Beng hotels</Link>.
            </p>
          </GuideSection>

          <GuideSection id="day-two" title="Day two: Pak Beng to Luang Prabang">
            <p>
              After breakfast at your hotel you’re back on the river. The boat stops at an ethnic
              village, serves lunch on board, and elephants bathing or gold panning may be seen
              along the banks. The last stop is Pak Ou cave, with its many Buddha images. From the
              Luang Prabang pier a tuk-tuk or minivan takes you to where you’re staying in town.
            </p>
            <Photo
              photo={photos.pakOuCave}
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="max-w-2xl"
            />
            <p>
              <Link href="/cruises/downstream/">
                See the downstream cruise itinerary, prices and what’s included
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection id="upstream" title="Going upstream, from Luang Prabang to Houay Xai">
            <p>
              Upstream boats leave Luang Prabang on {formatWeekdays(up.departures.weekdays)} after
              an early hotel pick-up, with a simple breakfast on board, Pak Ou cave and an ethnic
              Lao village on day one. You arrive in Houay Xai around 16:30 on day two, in time to
              cross into Thailand: we transfer you to the border and include a bus ticket to Chiang
              Khong. Upstream sailings need a minimum number of passengers, so ask early.
              {upPrice ? ` The price is ${formatMoney(upPrice.perPerson)} per person.` : ""}
            </p>
            <p>
              You can combine it with two or three days overland from Chiang Khong to Chiang Mai via
              Chiang Rai: ask us for a plan.{" "}
              <Link href="/cruises/upstream/">See the upstream cruise</Link>.
            </p>
          </GuideSection>

          <GuideSection id="from-chiang-mai" title="Starting in Chiang Mai">
            <p>
              Our five-day program starts with two nights in Chiang Mai. On day three we drive about
              300 km to Chiang Khong, stopping at a hot spring, the White Temple and the Golden
              Triangle with its Hall of Opium, then spend the night in Chiang Khong before the
              two-day cruise. Arrive in Chiang Mai on a{" "}
              {formatWeekdays(chiangMai.departures.weekdays)} to match a boat departure.
              {cmPrice
                ? ` ${formatMoney(cmPrice.perPerson)} per person, minimum two people.`
                : ""}{" "}
              <Link href="/cruises/chiang-mai-land-and-cruise/">
                See the Chiang Mai land and cruise program
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection id="from-nan" title="Starting in Nan">
            <p>
              From Nan, in northern Thailand, the road crosses into Laos at the Huai Kon border,
              about an hour’s drive from Pak Beng, where you join the boat for a day on the river to
              Luang Prabang. This route needs a Lao visa obtained in advance from a Lao embassy,
              stating entry at Muang Ngeun. {nan.priceOnRequest}{" "}
              <Link href="/cruises/nan-to-luang-prabang/">
                See the Nan to Luang Prabang journey
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection id="packing" title="What to bring">
            <ul>
              <li>Your passport, the Lao visa fee in US dollars and one passport photo.</li>
              <li>Warm clothes or a jacket from November to January.</li>
              <li>
                No need to pack lunch: it’s cooked on board. Tell us if you need vegan, vegetarian
                or halal food.
              </li>
            </ul>
            <p>
              <Link href="/plan-your-trip/">More questions about visas, food and weather</Link>.
            </p>
          </GuideSection>
        </article>
      </Container>

      <CtaBand title="Want us to handle the whole route?" href={downstreamBookingHref} />
    </>
  );
}

function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      <div className="prose-river mt-5 max-w-none space-y-5 [&>p]:max-w-prose">{children}</div>
    </section>
  );
}
