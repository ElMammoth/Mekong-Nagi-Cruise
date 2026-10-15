import type { NewsletterAdapter, SignupResult } from "./index";

/*
 * Brevo, through a Brevo-hosted sign-up form (Contacts → Forms in Brevo). A static site can't
 * hold an API key, so we post to the form's public action URL, the same way Brevo's own
 * embed script does: a cross-origin POST of form data to `<action>?isAjax=1`, answered with
 * JSON `{ success, message?, errors? }`. Brevo then handles the list, double opt-in and
 * unsubscribe links.
 *
 * Form set-up in Brevo: one EMAIL field; reCAPTCHA off (our form has its own honeypot);
 * double opt-in on, if you want confirmed addresses. Copy the form's action URL
 * (https://….sibforms.com/serve/…) into NEXT_PUBLIC_BREVO_FORM_URL.
 */

/** Languages Brevo's hosted forms answer in; others fall back to English. */
const BREVO_LOCALES = new Set(["en", "fr", "de", "es", "it", "pt", "nl"]);

/** The form's action URL must be a Brevo form endpoint over HTTPS. */
export function isBrevoFormUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "sibforms.com" || url.hostname.endsWith(".sibforms.com")) &&
      url.pathname.startsWith("/serve/")
    );
  } catch {
    return false;
  }
}

interface BrevoResponse {
  success?: boolean;
  errors?: Record<string, unknown>;
}

export function createBrevoAdapter(
  formUrl: string | undefined,
  fetchImpl: typeof fetch = (...args) => fetch(...args),
): NewsletterAdapter {
  if (!isBrevoFormUrl(formUrl)) {
    throw new Error(
      'NEXT_PUBLIC_NEWSLETTER_PROVIDER is "brevo" but NEXT_PUBLIC_BREVO_FORM_URL is not a ' +
        "Brevo form URL (https://….sibforms.com/serve/…).",
    );
  }
  const endpoint = new URL(formUrl);
  endpoint.searchParams.set("isAjax", "1");

  return {
    name: "brevo",
    async subscribe({ email, locale }): Promise<SignupResult> {
      const body = new FormData();
      body.set("EMAIL", email);
      body.set("email_address_check", ""); // Brevo's own honeypot: must stay empty
      body.set("locale", BREVO_LOCALES.has(locale) ? locale : "en");
      try {
        const response = await fetchImpl(endpoint, { method: "POST", body });
        const data = (await response.json()) as BrevoResponse;
        if (data.success) return { ok: true };
        return { ok: false, reason: data.errors && "EMAIL" in data.errors ? "invalid" : "failed" };
      } catch {
        return { ok: false, reason: "failed" }; // network, CORS, blocked or not JSON
      }
    },
  };
}
