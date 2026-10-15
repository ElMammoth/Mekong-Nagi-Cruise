"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Switch } from "radix-ui";
import { buttonClasses } from "@/components/ui/button";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { onConsentSettingsRequest, saveConsent, useConsent } from "@/lib/consent";

/**
 * Cookie and TikTok consent, shown on a visitor's first arrival and from "Cookie settings" in
 * the footer. A compact, non-modal card fixed to the bottom: it covers nothing important,
 * never locks scrolling and, being fixed and inserted after hydration, never shifts the page
 * (no CLS) and is never the LCP element (it isn't in the static HTML).
 *
 * "Accept all" and "Reject all" have the same style and size. "Customize" shows two switches:
 * essential (always on) and TikTok videos. Keyboard: the banner is first in the tab order
 * (rendered before the header); opened from the footer, it takes focus and gives it back to
 * the button when closed.
 */
export function ConsentBanner({ privacyHref }: { privacyHref: string }) {
  const { m } = useI18n();
  const copy = m.consent;
  const id = useId();
  const consent = useConsent();
  const [requested, setRequested] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [tiktok, setTiktok] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      onConsentSettingsRequest(() => {
        returnTo.current = document.activeElement as HTMLElement | null;
        setRequested(true);
        setCustomize(true);
        setTiktok(consent.tiktok);
      }),
    [consent.tiktok],
  );

  // Opened on request: move focus into the banner.
  useEffect(() => {
    if (requested) panelRef.current?.focus();
  }, [requested]);

  const open = consent.known && (!consent.decided || requested);
  if (!open) return null;

  const choose = (value: boolean) => {
    saveConsent({ tiktok: value });
    setRequested(false);
    setCustomize(false);
    returnTo.current?.focus();
    returnTo.current = null;
  };

  const action = cn(buttonClasses({ variant: "primary" }), "flex-1 basis-0 px-3 whitespace-nowrap");

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 max-h-banner overflow-y-auto rounded-md border border-line bg-surface p-4 shadow-lg focus:outline-none sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md sm:p-5 print:hidden"
    >
      <h2 id={`${id}-title`} className="font-display text-base text-heading">
        {copy.title}
      </h2>
      <p id={`${id}-text`} className="mt-1.5 text-sm text-ink">
        {copy.text}{" "}
        <Link href={privacyHref} className="text-primary underline underline-offset-4">
          {copy.privacy}
        </Link>
      </p>

      {customize ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          <li className="flex items-center justify-between gap-4 py-3">
            <span>
              <span id={`${id}-essential`} className="block font-display text-sm text-heading">
                {copy.essential}
              </span>
              <span className="block text-sm text-muted">{copy.essentialHint}</span>
            </span>
            <SwitchControl checked disabled labelledBy={`${id}-essential`} />
          </li>
          <li className="flex items-center justify-between gap-4 py-3">
            <span>
              <span id={`${id}-tiktok`} className="block font-display text-sm text-heading">
                {copy.tiktok}
              </span>
              <span className="block text-sm text-muted">{copy.tiktokHint}</span>
            </span>
            <SwitchControl checked={tiktok} onChange={setTiktok} labelledBy={`${id}-tiktok`} />
          </li>
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={action} onClick={() => choose(false)}>
          {copy.rejectAll}
        </button>
        <button type="button" className={action} onClick={() => choose(true)}>
          {copy.acceptAll}
        </button>
        {customize ? (
          <button
            type="button"
            className={cn(buttonClasses({ variant: "secondary" }), "w-full")}
            onClick={() => choose(tiktok)}
          >
            {copy.save}
          </button>
        ) : (
          <button
            type="button"
            className={cn(buttonClasses({ variant: "ghost" }), "min-h-11 px-2")}
            onClick={() => {
              setTiktok(consent.tiktok);
              setCustomize(true);
            }}
          >
            {copy.customize}
          </button>
        )}
      </div>
    </div>
  );
}

function SwitchControl({
  checked,
  disabled,
  onChange,
  labelledBy,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  labelledBy: string;
}) {
  return (
    <Switch.Root
      checked={checked}
      disabled={disabled}
      onCheckedChange={onChange}
      aria-labelledby={labelledBy}
      className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-sm border border-control bg-surface-tint transition-colors duration-fast data-[disabled]:opacity-60 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
    >
      <Switch.Thumb className="block size-5 translate-x-0.5 rounded-xs bg-control shadow-sm transition-transform duration-fast data-[state=checked]:translate-x-6 data-[state=checked]:bg-surface" />
    </Switch.Root>
  );
}
