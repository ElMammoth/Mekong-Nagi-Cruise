import Link from "next/link";
import type { ReactNode } from "react";
import { CloudSun, FileCheck2, Luggage, Utensils } from "lucide-react";
import { JsonLd } from "@/components/layout/json-ld";
import { BoatFeatures } from "@/components/sections/boat-features";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFaqs } from "@/content/localized";
import { rich } from "@/i18n/rich";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";
import { faqPrices, plainFaqs } from "@/lib/faq";
import { navigation } from "@/lib/navigation";
import { faqJsonLd } from "@/lib/structured-data";

const icons = [Luggage, FileCheck2, Utensils, CloudSun];
const linkClass = "text-primary underline underline-offset-4 hover:decoration-2";

export function FaqView() {
  const { locale, m } = getI18n();
  const copy = m.faqPage;
  const faqs = getFaqs(locale);
  const link = (href: string) =>
    function FaqLink(text: ReactNode) {
      return (
        <Link href={href} className={linkClass}>
          {text}
        </Link>
      );
    };

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.heading}
        intro={copy.intro}
        crumbs={[{ href: pathFor(locale, "faq"), label: m.nav.faq }]}
      />

      <section aria-labelledby="essentials-title" className="py-section">
        <Container>
          <SectionHeading
            id="essentials-title"
            eyebrow={copy.essentialsEyebrow}
            title={copy.essentialsTitle}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {copy.essentials.map(({ title, text }, i) => {
              const Icon = icons[i % icons.length]!;
              return (
                <li key={title} className="flex gap-4 rounded-md border border-line bg-surface p-6">
                  <Icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-h3">{title}</h3>
                    <p className="mt-2 text-muted">{text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-muted">
            {rich(copy.links, {
              guide: link(pathFor(locale, "guide")),
              chiangMai: link(pathFor(locale, "trip:chiang-mai-land-and-cruise")),
              nan: link(pathFor(locale, "trip:nan-to-luang-prabang")),
            })}
          </p>
        </Container>
      </section>

      <section aria-labelledby="boat-title" className="bg-primary py-section inverse">
        <Container className="grid gap-12 lg:grid-cols-intro">
          <SectionHeading
            id="boat-title"
            tone="dark"
            eyebrow={copy.boatEyebrow}
            title={copy.boatTitle}
          />
          <BoatFeatures />
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="py-section">
        <Container className="grid gap-10 lg:grid-cols-intro">
          <SectionHeading id="faq-title" eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
          <FaqList faqs={faqs} prices={faqPrices()} />
        </Container>
        <JsonLd data={faqJsonLd(locale, plainFaqs(locale, faqs))} />
      </section>

      <CtaBand href={navigation(locale).downstreamBookingHref} />
    </>
  );
}
