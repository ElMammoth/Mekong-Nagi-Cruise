import type { Metadata } from "next";
import Link from "next/link";
import { CloudSun, FileCheck2, Luggage, Utensils } from "lucide-react";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "Plan your Mekong cruise: visas, pick-up, food and weather",
  description:
    "Practical information for your Mekong cruise: hotel pick-up and border crossing, Lao visa, meals on board and what to pack.",
  alternates: { canonical: "/plan-your-trip/" },
};

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
        title="Everything to know before you sail"
        intro="From the border crossing to what’s for lunch: the practical side of two days on the Mekong."
        crumbs={[{ href: "/plan-your-trip/", label: "Plan your trip" }]}
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
            Coming from further away? Start in{" "}
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
      </section>

      <CtaBand />
    </>
  );
}
