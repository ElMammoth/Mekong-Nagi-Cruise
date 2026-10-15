"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CurvedInput } from "@/components/effects/curved-input";
import { site } from "@/content/site";
import { useI18n } from "@/i18n/client";
import type { Messages } from "@/i18n/messages/en";
import { interpolate, rich } from "@/i18n/rich";
import { isValidEmail, newsletterAdapter } from "@/lib/newsletter";

type State = "idle" | "sending" | "done" | "invalid" | "failed";

const ID = "newsletter-email";

/**
 * Travel-updates sign-up in the footer. A visible label, the React Bits Curved Input (bend
 * -20, token colours), a consent line linking to the privacy policy, a honeypot, and results
 * announced in an aria-live region. Submission goes through the newsletter adapter
 * (src/lib/newsletter): a stub until a provider is chosen.
 */
export function NewsletterForm({
  copy,
  privacyHref,
}: {
  copy: Messages["newsletter"];
  privacyHref: string;
}) {
  const { locale } = useI18n();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    // Bots fill every field; people never see this one.
    if (String(data.get("website") ?? "").trim()) {
      setState("done");
      return;
    }
    if (!isValidEmail(email)) {
      setState("invalid");
      document.getElementById(ID)?.focus();
      return;
    }
    setState("sending");
    try {
      const result = await newsletterAdapter().subscribe({
        email: email.trim(),
        locale,
        source: window.location.pathname,
      });
      if (result.ok) {
        setState("done");
        setEmail("");
      } else {
        setState(result.reason === "invalid" ? "invalid" : "failed");
      }
    } catch {
      setState("failed");
    }
  }

  const invalid = state === "invalid";
  const message =
    state === "done"
      ? copy.success
      : state === "invalid"
        ? copy.errorInvalid
        : state === "failed"
          ? interpolate(copy.errorFailed, {
              email: (
                <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">
                  {site.contact.email}
                </a>
              ),
            })
          : state === "sending"
            ? copy.sending
            : "";

  return (
    // method="post": without JavaScript the address is never put in a URL.
    <form
      method="post"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="newsletter-title"
      className="relative"
    >
      <label htmlFor={ID} className="mb-1 block font-display text-sm text-on-primary">
        {copy.label}
      </label>
      <CurvedInput
        id={ID}
        name="email"
        value={email}
        onChange={(value) => {
          setEmail(value);
          if (state === "invalid" || state === "done" || state === "failed") setState("idle");
        }}
        buttonText={copy.submit}
        placeholder={copy.placeholder}
        invalid={invalid}
        describedBy={`${ID}-consent ${ID}-status`}
        disabled={state === "sending"}
        bend={-20}
      />
      {/* Honeypot: hidden from people and assistive tech, left empty by humans. */}
      <div aria-hidden="true" className="absolute -left-full size-px overflow-hidden">
        <label htmlFor={`${ID}-website`}>{copy.honeypot}</label>
        <input id={`${ID}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={`${ID}-consent`} className="mt-2 text-sm text-on-primary-muted">
        {rich(copy.consent, {
          privacy: (text) => (
            <Link href={privacyHref} className="text-on-primary underline underline-offset-4">
              {text}
            </Link>
          ),
        })}
      </p>
      {/* Reserved line, so a message never moves the footer. */}
      <p
        id={`${ID}-status`}
        role="status"
        aria-live="polite"
        className="mt-2 min-h-line text-sm text-on-primary"
      >
        {message}
      </p>
    </form>
  );
}
