"use client";

import { useEffect } from "react";

/*
 * Scroll reveal, after React Bits' Animated Content (reactbits.dev/animations/animated-content):
 * a subtle fade plus a small rise, played once per element, with a short stagger inside
 * groups. React Bits builds it on GSAP ScrollTrigger (about 40 kB more on every page) and
 * starts content hidden; this is the same effect in CSS transitions + IntersectionObserver.
 *
 * Markup (server HTML, never hidden by default):
 *   <section data-reveal>…</section>          the block reveals as one
 *   <ul data-reveal="group"><li>…</li></ul>   each child reveals in turn
 *
 * Rules that keep it safe:
 *  - Only elements that start below the viewport are hidden, so nothing visible on load
 *    flickers, and the hero / h1 / LCP (top of the page) are never touched.
 *  - The hidden state is a data attribute this script adds and React never renders, so
 *    re-renders (currency switch, form state) can't reset or strand it.
 *  - No observer support, reduced motion, or a failure → nothing is hidden.
 * It runs on every route: <PageTransition> (the template) re-mounts it after scroll-to-top.
 */

const STATE = "data-reveal-state";
/** Grouped items after this many share the last delay, so long lists don't lag. */
const MAX_STAGGER = 6;

function targets(root: ParentNode): HTMLElement[] {
  const list: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.dataset.reveal === "group") {
      Array.from(el.children).forEach((child, i) => {
        if (!(child instanceof HTMLElement)) return;
        child.style.setProperty("--reveal-i", String(Math.min(i, MAX_STAGGER)));
        list.push(child);
      });
    } else {
      list.push(el);
    }
  });
  return list;
}

export function Reveal() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Once shown, the attribute is removed so the element's own transitions (hover etc.)
    // apply again without the reveal timing.
    const settle = (el: HTMLElement) => {
      el.removeAttribute(STATE);
      el.style.removeProperty("--reveal-i");
    };
    const show = (el: Element) => {
      if (!(el instanceof HTMLElement) || el.getAttribute(STATE) !== "pending") return;
      el.setAttribute(STATE, "shown");
      el.addEventListener("transitionend", () => settle(el), { once: true });
      window.setTimeout(() => settle(el), 2000); // in case no transition runs
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element is fully in view.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const fold = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of targets(document)) {
      if (el.hasAttribute(STATE)) continue;
      // Already on screen (or above it): leave it exactly as rendered.
      if (el.getBoundingClientRect().top < fold) continue;
      el.setAttribute(STATE, "pending");
      pending.push(el);
      observer.observe(el);
    }

    // Anything still hidden is restored at once (no animation) for printing, when the page
    // is left (bfcache), and on unmount, so it can be armed again cleanly.
    const showAll = () => pending.forEach(settle);
    window.addEventListener("beforeprint", showAll);
    window.addEventListener("pagehide", showAll);

    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", showAll);
      window.removeEventListener("pagehide", showAll);
      showAll();
    };
  }, []);

  return null;
}
