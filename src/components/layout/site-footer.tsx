import Link from "next/link";
import { BoatMark } from "@/components/brand/boat-mark";
import { Container } from "@/components/ui/container";
import { RouteLabel } from "@/components/ui/route-label";
import { cruiseLinks, primaryLinks } from "@/content/navigation";
import { site } from "@/content/site";

const linkClass = "rounded-sm hover:text-on-primary hover:underline";
const headingClass = "font-display text-eyebrow text-on-primary uppercase";

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="bg-primary text-on-primary-muted inverse">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <BoatMark title={site.name} className="h-8 w-auto text-on-primary" />
          <p className="mt-5 max-w-xs">{site.tagline}.</p>
        </div>

        <nav aria-label="Cruises" className="md:col-span-3">
          <h2 className={headingClass}>Cruises</h2>
          <ul className="mt-4 space-y-2">
            {cruiseLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  <RouteLabel text={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className={headingClass}>Visit</h2>
          <ul className="mt-4 space-y-2">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className={headingClass}>Talk to us</h2>
          <address className="mt-4 space-y-2">
            <p>
              <a href={contact.whatsappHref} className={linkClass}>
                WhatsApp {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                {contact.email}
              </a>
            </p>
            <p>Open {contact.hours}</p>
            <p>
              {contact.location.locality}, {contact.location.region} {contact.location.postalCode},{" "}
              {contact.location.country}
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-primary-hover">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <Link href="/privacy/" className={linkClass}>
            Privacy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
