import { Coffee, Presentation, Users } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonAnchor } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Private Mekong boat charter for groups and events",
  description:
    "Charter the Nagi of Mekong for meetings, training, incentives or a special event for up to 40 people, with coffee breaks and lunch on board.",
  path: "/private-charters/",
});

const points = [
  { icon: Users, title: "Up to 40 people", text: "Aboard one of our large boats." },
  {
    icon: Presentation,
    title: "Classroom or theatre",
    text: "Set up the way your session needs, with standard equipment.",
  },
  { icon: Coffee, title: "Coffee breaks & lunch", text: "Served on board during your event." },
];

export default function ChartersPage() {
  const subject = encodeURIComponent("Private charter / event on the Mekong");
  return (
    <>
      <PageHeader
        eyebrow="Pleasure & meetings afloat"
        title="Meetings, training and special events on the river"
        intro="We arrange small-group meetings, training, incentives and special events on board the Nagi of Mekong."
        crumbs={[{ href: "/private-charters/", label: "Private charters" }]}
        photo={photos.charter}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonAnchor href={`mailto:${site.contact.email}?subject=${subject}`} size="lg">
            Email us your event
          </ButtonAnchor>
          <ButtonAnchor href={site.contact.whatsappHref} size="lg" variant="secondary">
            WhatsApp
          </ButtonAnchor>
        </div>
      </PageHeader>
      <section aria-label="What we offer" className="py-16 sm:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-card border border-silt bg-paper p-7 shadow-card">
                <Icon aria-hidden="true" className="size-7 text-lantern" />
                <h2 className="mt-4 text-h3">{title}</h2>
                <p className="mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-lead text-muted">
            Tell us the date, the size of your group and what you have in mind.
          </p>
        </Container>
      </section>
      <CtaBand
        title="Plan an event afloat"
        text={`Write to us with your date and group size. ${site.contact.replyPromise}`}
        showReview={false}
      />
    </>
  );
}
