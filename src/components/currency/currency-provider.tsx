"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  BASE_CURRENCY,
  CURRENCY_STORAGE_KEY,
  availableCurrencies,
  isCurrency,
  type CurrencyCode,
} from "@/lib/currency";

/*
 * The visitor's currency, kept in localStorage so it survives page changes, reloads and
 * language switches (every language lives on the same origin). The server snapshot is
 * always US dollars: the static HTML, and what search engines read, shows US dollar prices.
 */
const EVENT = "nagi:currency";
/** Fallback when storage is blocked: the choice lasts until the next full page load. */
let memory: CurrencyCode | null = null;

function read(): CurrencyCode {
  let value: string | null = memory;
  try {
    value = window.localStorage.getItem(CURRENCY_STORAGE_KEY) ?? memory;
  } catch {
    // Storage blocked: use the in-memory choice.
  }
  return isCurrency(value) && availableCurrencies().includes(value) ? value : BASE_CURRENCY;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CURRENCY_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onChange);
  };
}

export function useCurrency(): [CurrencyCode, (code: CurrencyCode) => void] {
  const currency = useSyncExternalStore(subscribe, read, () => BASE_CURRENCY);
  const setCurrency = useCallback((code: CurrencyCode) => {
    memory = code;
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch {
      // Storage blocked (private mode): `memory` keeps the choice for this page load.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [currency, setCurrency];
}
