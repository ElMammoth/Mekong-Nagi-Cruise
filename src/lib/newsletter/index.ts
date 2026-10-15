/*
 * Newsletter sign-up, behind one typed adapter. The site is a static export with no server,
 * so emails are never stored in this repository or in the build: they go straight from the
 * visitor's browser to the provider chosen with an environment variable at build time.
 *
 *   NEXT_PUBLIC_NEWSLETTER_PROVIDER = "brevo" | "stub" (default)
 *   NEXT_PUBLIC_BREVO_FORM_URL      = the Brevo form's action URL (see brevo.ts)
 *
 * - "brevo": posts to a Brevo-hosted sign-up form (no API key in the browser).
 * - "stub": validates, waits briefly and reports success without sending anything (and logs
 *   a warning in the browser console). For local work and previews.
 * Secret API keys must never go in NEXT_PUBLIC_* variables.
 */

import { createBrevoAdapter } from "./brevo";

export type NewsletterProviderName = "stub" | "brevo";

export interface SignupRequest {
  email: string;
  /** Site language, so the provider can send updates in it. */
  locale: string;
  /** Page the visitor signed up from (path only, no query string). */
  source: string;
}

export type SignupResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };

export interface NewsletterAdapter {
  name: NewsletterProviderName;
  subscribe(request: SignupRequest): Promise<SignupResult>;
}

/** Pragmatic check: something@domain.tld, no spaces. The provider does the real check. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value.trim());
}

const stub: NewsletterAdapter = {
  name: "stub",
  async subscribe(request) {
    if (!isValidEmail(request.email)) return { ok: false, reason: "invalid" };
    await new Promise((resolve) => setTimeout(resolve, 400));
    console.warn(
      "[newsletter] stub provider: nothing was sent. Set NEXT_PUBLIC_NEWSLETTER_PROVIDER.",
    );
    return { ok: true };
  },
};

export function newsletterAdapter(
  name: string | undefined = process.env.NEXT_PUBLIC_NEWSLETTER_PROVIDER,
  // Read literally so Next inlines it at build time.
  brevoFormUrl: string | undefined = process.env.NEXT_PUBLIC_BREVO_FORM_URL,
): NewsletterAdapter {
  if (!name || name === "stub") return stub;
  if (name === "brevo") return createBrevoAdapter(brevoFormUrl);
  throw new Error(`Unknown NEXT_PUBLIC_NEWSLETTER_PROVIDER "${name}"`);
}
