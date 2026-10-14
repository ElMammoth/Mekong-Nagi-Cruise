import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { cruiseLinks, primaryLinks } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="bg-river text-river-mist">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark tone="dark" />
          <p className="mt-5 max-w-xs">{site.tagline}.</p>
        </div>

        <nav aria-label="Cruises" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-gold uppercase">
            Cruises
          </h2>
          <ul className="mt-4 space-y-2">
            {cruiseLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-gold uppercase">
            Visit
          </h2>
          <ul className="mt-4 space-y-2">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-gold uppercase">
            Talk to us
          </h2>
          <address className="mt-4 space-y-2 not-italic">
            <p>
              <a href={contact.whatsappHref} className="hover:text-white hover:underline">
                WhatsApp {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="break-all hover:text-white hover:underline"
              >
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
      <div className="border-t border-river-mist/15">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <Link href="/privacy/" className="hover:text-white hover:underline">
            Privacy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
