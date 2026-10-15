import { Coffee, Presentation, Users } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonAnchor } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getPhotos } from "@/content/localized";
import { site } from "@/content/site";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";

const icons = [Users, Presentation, Coffee];

export function ChartersView() {
  const { locale, m } = getI18n();
  const copy = m.charters;
  const subject = encodeURIComponent(copy.emailSubject);
  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.heading}
        intro={copy.intro}
        crumbs={[{ href: pathFor(locale, "charters"), label: m.nav.charters }]}
        photo={getPhotos(locale).charter}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonAnchor href={`mailto:${site.contact.email}?subject=${subject}`} size="lg">
            {copy.emailButton}
          </ButtonAnchor>
          <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
            {m.common.whatsapp}
          </ButtonAnchor>
        </div>
      </PageHeader>
      <section aria-label={copy.offerLabel} className="py-section">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {copy.points.map(({ title, text }, i) => {
              const Icon = icons[i % icons.length]!;
              return (
                <li key={title} className="rounded-md border border-line bg-surface p-7 shadow-sm">
                  <Icon aria-hidden="true" className="size-7 text-primary" />
                  <h2 className="mt-4 text-h3">{title}</h2>
                  <p className="mt-2 text-muted">{text}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 max-w-2xl text-lead text-muted">{copy.tellUs}</p>
        </Container>
      </section>
      <CtaBand title={copy.ctaTitle} text={copy.ctaText} showReview={false} />
    </>
  );
}
