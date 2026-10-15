import { useSyncExternalStore } from "react";

/*
 * Cookie consent. The site itself only uses essential storage (language cookie, currency in
 * localStorage). The one optional category is TikTok: its player sets cookies, so nothing
 * from TikTok loads until the visitor allows it in the consent banner.
 *
 * The choice is kept in localStorage (not a cookie), versioned so a future change of
 * categories asks again, and shared live by every component and tab.
 */

const KEY = "nagi_consent";
const VERSION = 1;
const EVENT = "nagi:consent";
const OPEN_EVENT = "nagi:consent-open";

export interface ConsentChoice {
  v: number;
  tiktok: boolean;
  /** ISO date-time of the choice. */
  at: string;
}

export interface ConsentState {
  /** False on the server and during hydration: nothing is known yet. */
  known: boolean;
  /** The visitor has made a choice (banner hidden). */
  decided: boolean;
  /** TikTok videos may load. */
  tiktok: boolean;
}

let memory: string | null = null; // when localStorage is blocked

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? memory ?? "";
  } catch {
    return memory ?? "";
  }
}

function parse(raw: string): ConsentChoice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as ConsentChoice;
    return value.v === VERSION && typeof value.tiktok === "boolean" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function saveConsent(choice: { tiktok: boolean }) {
  const raw = JSON.stringify({ v: VERSION, tiktok: choice.tiktok, at: new Date().toISOString() });
  memory = raw;
  try {
    window.localStorage.setItem(KEY, raw);
    window.localStorage.removeItem("nagi_consent_embeds"); // the earlier, TikTok-only key
  } catch {
    /* storage blocked: the in-memory choice still applies to this page */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Re-opens the banner on its detailed view ("Cookie settings" in the footer). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsRequest(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

const SERVER = "\u0000server";

export function useConsent(): ConsentState {
  const raw = useSyncExternalStore(subscribe, readRaw, () => SERVER);
  if (raw === SERVER) return { known: false, decided: false, tiktok: false };
  const choice = parse(raw);
  return { known: true, decided: choice !== null, tiktok: choice?.tiktok ?? false };
}

/** `prefers-reduced-motion: reduce`, live. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
