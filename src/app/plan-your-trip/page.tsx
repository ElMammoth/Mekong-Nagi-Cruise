import Link from "next/link";
import { CloudSun, FileCheck2, Luggage, Utensils } from "lucide-react";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/layout/json-ld";
import { faqs } from "@/content/faq";
import { downstreamBookingHref } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Mekong cruise FAQ: Lao visa, border, food and weather",
  description:
    "Answers before you sail: hotel pick-up and the Thai–Lao border, the Lao visa on arrival, lunch on board, cruise-only seats and the cold season in Pak Beng.",
  path: "/plan-your-trip/",
});

const essentials = [
  {
    icon: Luggage,
    title: "Pick-up & border",
    text: "We collect you from your hotel in Chiang Khong or Houay Xai, handle your luggage and help you through the Thai and Lao border formalities.",
  },
  {
    icon: FileCheck2,
    title: "Lao visa",
    text: "For the downstream cruise, bring the visa-on-arrival fee in US dollars and one passport photo. The Nan route requires a visa obtained in advance from a Lao embassy.",
  },
  {
    icon: Utensils,
    title: "Food on board",
    text: "A freshly cooked lunch every day plus tea, coffee and refreshments. Vegan, vegetarian and halal options: just let us know.",
  },
  {
    icon: CloudSun,
    title: "Weather",
    text: "Pak Beng can be very cold from November to January. Pack warm clothes or a jacket.",
  },
];

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan your trip"
        title="Mekong cruise questions, answered"
        intro="From the border crossing to what’s for lunch: the practical side of two days on the Mekong."
        crumbs={[{ href: "/plan-your-trip/", label: "FAQ" }]}
      />

      <section aria-labelledby="essentials-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeading id="essentials-title" eyebrow="Essentials" title="The practical side" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {essentials.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-card border border-silt bg-paper p-6">
                <Icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-lantern" />
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted">
            Step-by-step route, border and packing advice:{" "}
            <Link
              href="/guides/houay-xai-to-luang-prabang/"
              className="font-semibold text-lantern underline-offset-4 hover:underline"
            >
              the Houay Xai to Luang Prabang route guide
            </Link>
            . Coming from further away? Start in{" "}
            <Link
              href="/cruises/chiang-mai-land-and-cruise/"
              className="font-semibold text-lantern underline-offset-4 hover:underline"
            >
              Chiang Mai
            </Link>{" "}
            or{" "}
            <Link
              href="/cruises/nan-to-luang-prabang/"
              className="font-semibold text-lantern underline-offset-4 hover:underline"
            >
              Nan
            </Link>{" "}
            and we take care of the road to the river.
          </p>
        </Container>
      </section>

      <section aria-labelledby="boat-title" className="bg-river py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="boat-title"
            tone="dark"
            eyebrow="The boat"
            title="Comfort and safety on board"
          />
          <BoatFeatures />
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
          <FaqList faqs={faqs} />
        </Container>
        <JsonLd data={faqJsonLd(faqs)} />
      </section>

      <CtaBand href={downstreamBookingHref} />
    </>
  );
}
