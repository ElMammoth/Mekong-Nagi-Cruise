import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/layout/json-ld";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/structured-data";
import { token } from "@/lib/tokens";
import { poppins, sourceSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: token("color-canvas"),
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${sourceSans.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-primary px-5 py-3 font-display text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
