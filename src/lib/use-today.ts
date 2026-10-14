"use client";

import { useSyncExternalStore } from "react";
import { toIsoDate } from "./departures";

const noopSubscribe = () => () => {};

/** Today's date on the client only (null during static rendering), so pages never show stale dates. */
export function useToday(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => toIsoDate(new Date()),
    () => null,
  );
}
