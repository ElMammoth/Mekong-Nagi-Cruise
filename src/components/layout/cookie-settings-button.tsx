"use client";

import { useI18n } from "@/i18n/client";
import { openConsentSettings } from "@/lib/consent";

/** Footer link-style button that re-opens the consent banner on its detailed view. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { m } = useI18n();
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {m.consent.settings}
    </button>
  );
}
