import Link from "next/link";
import { BoatMark } from "@/components/brand/boat-mark";
import { Container } from "@/components/ui/container";
import { RouteLabel } from "@/components/ui/route-label";
import { CookieSettingsButton } from "./cookie-settings-button";
import { NewsletterForm } from "./newsletter-form";
import { site } from "@/content/site";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import type { Navigation } from "@/lib/navigation";

const linkClass = "rounded-sm hover:text-on-primary hover:underline";
const headingClass = "font-display text-eyebrow text-on-primary uppercase";

export function SiteFooter({ nav }: { nav: Navigation }) {
  const { m } = getI18n();
  const { contact } = site;
  return (
    <footer className="bg-primary text-on-primary-muted inverse">
      {/* Travel updates sign-up */}
      <div className="border-b border-primary-hover">
        <Container className="grid gap-8 py-12 md:grid-cols-12 md:items-center">
          <div data-reveal className="md:col-span-5">
            <h2 id="newsletter-title" className="font-display text-h3 text-on-primary">
              {m.newsletter.title}
            </h2>
            <p className="mt-2 max-w-md">{m.newsletter.intro}</p>
          </div>
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <NewsletterForm copy={m.newsletter} privacyHref={nav.privacyHref} />
          </div>
        </Container>
      </div>
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <BoatMark title={site.name} className="h-8 w-auto text-on-primary" />
          <p className="mt-5 max-w-xs">{m.meta.tagline}.</p>
        </div>

        <nav aria-label={m.nav.cruises} className="md:col-span-3">
          <h2 className={headingClass}>{m.nav.cruises}</h2>
          <ul className="mt-4 space-y-2">
            {nav.cruises.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  <RouteLabel text={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={m.nav.footer} className="md:col-span-2">
          <h2 className={headingClass}>{m.nav.visit}</h2>
          <ul className="mt-4 space-y-2">
            {nav.primary.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className={headingClass}>{m.nav.talkToUs}</h2>
          <address className="mt-4 space-y-2">
            <p>
              <a href={contact.whatsappHref} className={linkClass}>
                {fmt(m.nav.whatsappNumber, { phone: contact.phoneDisplay })}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                {contact.email}
              </a>
            </p>
            <p>{fmt(m.nav.open, { hours: contact.hours })}</p>
            <p>
              {contact.location.locality}, {contact.location.region} {contact.location.postalCode},{" "}
              {m.contact.country}
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-primary-hover">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={nav.privacyHref} className={linkClass}>
              {m.nav.privacy}
            </Link>
            <CookieSettingsButton className={`${linkClass} text-left`} />
          </p>
        </Container>
      </div>
    </footer>
  );
}
