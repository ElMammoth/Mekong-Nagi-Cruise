"use client";

import { ViewTransition, useLayoutEffect, type ReactNode } from "react";

/*
 * Page transitions, used as the `template.tsx` of both root layouts (English and the
 * prefixed languages). A template (unlike a layout) re-mounts on every navigation, so:
 *  - <ViewTransition> gives the outgoing and incoming page a short cross-fade
 *    (class "page", styled with the --duration-page token in globals.css). Header and
 *    footer sit outside it and stay still. Browsers without the View Transitions API, and
 *    visitors who prefer reduced motion, get an instant swap.
 *  - On each new route the window lands at the top, instantly (no smooth-scroll jump);
 *    links to an anchor (e.g. /cruises/downstream/#book) land on that anchor instead.
 *    Back/forward keeps the browser's restored position.
 * Switching language crosses root layouts, so the browser does a full page load: it lands
 * at the top (or on the anchor) natively, and the currency choice comes from localStorage.
 */

let lastNavigationWasPop = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    lastNavigationWasPop = true;
  });
}
let firstRender = true;

export function PageTransition({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (firstRender) {
      firstRender = false; // initial load: leave scroll and #hash to the browser
      return;
    }
    if (lastNavigationWasPop) {
      lastNavigationWasPop = false;
      return;
    }
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
