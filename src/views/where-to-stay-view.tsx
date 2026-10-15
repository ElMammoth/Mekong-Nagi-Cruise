import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { StayCard } from "@/components/sections/stay-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getStays } from "@/content/localized";
import { getTripData } from "@/content/trips";
import type { StayPlace } from "@/content/types";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { availableOptions } from "@/lib/departures";
import { navigation } from "@/lib/navigation";

const groups: { place: StayPlace; key: "pakBeng" | "luangPrabang" | "houayXai"; id: string }[] = [
  { place: "Pak Beng", key: "pakBeng", id: "stay-pak-beng" },
  { place: "Luang Prabang", key: "luangPrabang", id: "stay-luang-prabang" },
  { place: "Houay Xai", key: "houayXai", id: "stay-houay-xai" },
];

export function WhereToStayView() {
  const { locale, m } = getI18n();
  const copy = m.whereToStay;
  const stays = getStays(locale);
  const options = availableOptions(getTripData("downstream")?.options ?? []);
  const priceFor = (id?: string) => options.find((option) => option.id === id)?.usd;

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.heading}
        intro={copy.intro}
        crumbs={[{ href: pathFor(locale, "whereToStay"), label: copy.eyebrow }]}
      />
      {groups.map((group) => (
        <section
          key={group.place}
          aria-labelledby={group.id}
          className="py-14 sm:py-20 [&+section]:border-t [&+section]:border-line"
        >
          <Container>
            <SectionHeading
              id={group.id}
              title={copy.groups[group.key].title}
              intro={copy.groups[group.key].intro}
            />
            <ul data-reveal="group" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stays
                .filter((s) => s.place === group.place)
                .map((stay) => (
                  <li key={stay.id}>
                    <StayCard stay={stay} priceUsd={priceFor(stay.packageOptionId)} />
                  </li>
                ))}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand href={navigation(locale).downstreamBookingHref} />
    </>
  );
}
