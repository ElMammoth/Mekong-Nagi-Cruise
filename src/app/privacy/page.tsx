import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Nagi of Mekong website handles your information: no cookies, no tracking.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy"
        intro="This website is designed to collect as little as possible."
        crumbs={[{ href: "/privacy/", label: "Privacy" }]}
      />
      <Container className="py-14 sm:py-20">
        <div className="prose-river">
          <h2>What this website stores</h2>
          <p>
            Nothing. The site has no user accounts, no analytics, no advertising trackers and sets
            no cookies. Fonts are served from this website, not from a third party. Like any
            website, the server that hosts it may keep standard technical logs (such as IP addresses
            and the pages requested) for security and reliability.
          </p>
          <h2>The booking form</h2>
          <p>
            The booking form does not send your details to a server. When you press “Send on
            WhatsApp” or “Send by email”, your message is prepared in your browser and opened in
            WhatsApp or your own email app. Nothing is sent until you press send there.
          </p>
          <h2>When you contact us</h2>
          <p>
            Messages you send reach {site.name} through WhatsApp or email and are used to answer
            your request and arrange your trip. Those services have their own privacy policies.
          </p>
          <h2>Questions</h2>
          <p>
            Write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
