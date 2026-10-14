import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { StayCard } from "@/components/sections/stay-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { downstreamBookingHref } from "@/content/navigation";
import { stays } from "@/content/stays";
import { getTrip } from "@/content/trips";
import type { Stay } from "@/content/types";
import { availableOptions } from "@/lib/departures";
import { pageMetadata } from "@/lib/metadata";
import { formatMoney } from "@/lib/money";

export const metadata = pageMetadata({
  title: "Pak Beng hotels for your Mekong cruise",
  description:
    "Standard and deluxe Pak Beng (Pakbeng) hotels with cruise package prices, plus Villa Mira in Luang Prabang and a dorm by the Houay Xai pier.",
  path: "/where-to-stay/",
});

const groups: { place: Stay["place"]; title: string; intro: string }[] = [
  {
    place: "Pak Beng",
    title: "Pak Beng, the night on the river",
    intro:
      "Your downstream package includes one night here. The price depends on the hotel you choose.",
  },
  {
    place: "Luang Prabang",
    title: "Luang Prabang, before or after",
    intro: "A guest house in the old town for the nights around your cruise.",
  },
  {
    place: "Houay Xai",
    title: "Houay Xai, by the pier",
    intro:
      "A budget stay five minutes from the slow-boat pier. Contact the owner directly for rates.",
  },
];

export default function WhereToStayPage() {
  const options = availableOptions(getTrip("downstream")?.options ?? []);
  const priceFor = (id?: string) => {
    const o = options.find((option) => option.id === id);
    return o ? formatMoney(o.perPerson) : undefined;
  };

  return (
    <>
      <PageHeader
        eyebrow="Where to stay"
        title="Pak Beng hotels and stays along the route"
        intro="Choose your comfort level for the night in Pak Beng, and find places for the nights before and after your cruise in Luang Prabang and Houay Xai."
        crumbs={[{ href: "/where-to-stay/", label: "Where to stay" }]}
      />
      {groups.map((group) => (
        <section
          key={group.place}
          aria-labelledby={`stay-${group.place}`}
          className="py-14 sm:py-20 [&+section]:border-t [&+section]:border-line"
        >
          <Container>
            <SectionHeading id={`stay-${group.place}`} title={group.title} intro={group.intro} />
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stays
                .filter((s) => s.place === group.place)
                .map((stay) => (
                  <li key={stay.name}>
                    <StayCard stay={stay} price={priceFor(stay.packageOptionId)} />
                  </li>
                ))}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand href={downstreamBookingHref} />
    </>
  );
}
