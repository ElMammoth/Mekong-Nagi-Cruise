import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { rich } from "@/i18n/rich";
import { pathFor } from "@/i18n/routes";
import { getI18n } from "@/i18n/server";

export function PrivacyView() {
  const { locale, m } = getI18n();
  const copy = m.privacy;
  return (
    <>
      <PageHeader
        title={copy.heading}
        intro={copy.intro}
        crumbs={[{ href: pathFor(locale, "privacy"), label: m.nav.privacy }]}
      />
      <Container className="py-14 sm:py-20">
        <div className="prose-river">
          {copy.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
          <h2>{copy.questionsTitle}</h2>
          <p>
            {rich(
              copy.questions,
              { email: (text) => <a href={`mailto:${site.contact.email}`}>{text}</a> },
              { email: site.contact.email },
            )}
          </p>
        </div>
      </Container>
    </>
  );
}
