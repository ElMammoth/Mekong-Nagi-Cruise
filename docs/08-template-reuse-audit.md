# 08 · Template reuse audit (Sparkdesign / React Bits Pro)

Audited October 2026. Two sources were checked:

1. **The live template**, <https://rbp-sparkdesign-template.vercel.app/> ("Sparkdesign"). It was
   fetched, then opened in the built-in browser as a normal visitor to read its markup and
   behaviour. Nothing was blocked and nothing was bypassed.
2. **The local folder** `saas template - to remove from mekong of nagi site after use/`. Its
   `package.json` is named `template-baseline`, and it is a different, older React Bits Pro SaaS
   template ("Circular": hero, bento, testimonials, how-it-works, pricing, FAQ, footer). It does
   **not** contain the Sparkdesign "workspace" or "why" sections. Those were studied on the live
   site instead.

## Licence

The folder ships `LICENSE`: **React Bits Pro – Commercial License**. You may use and modify it
in unlimited commercial projects for yourself or clients. You may **not** redistribute, resell or
sublicense it, share it with people who haven't bought a licence, or remove copyright notices.

What that means for this repo:

- **No template source was copied.** The two patterns below were rebuilt from scratch on our
  own stack: Radix, our tokens and our copy. This keeps us clear of the redistribution clause,
  even if this repository is ever shared or made public.
- **Delete the template folder before committing or sharing the repo.** It is untracked today.
  Committing it would redistribute the licensed source.
- The free React Bits components already in use (Text Loop, and now Curved Input) are under
  **MIT + Commons Clause**. That licence is in `src/components/effects/REACT-BITS-LICENSE.md`
  and allows use inside a website.

## What the template is built on, and why most of it doesn't fit

| Template dependency                                       | Our stack                                                      | Verdict                                                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `motion` (Framer Motion)                                  | CSS + tokens, GSAP lazy (hero only)                            | Skip. About 35–60 kB gzipped for effects we can get with CSS and IntersectionObserver.                 |
| `lenis` smooth scroll                                     | Native scroll, `scroll-behavior`                               | Skip. It hijacks scrolling, fights our scroll-to-top route logic, and adds no value for content pages. |
| `next-themes`, dark mode                                  | Light only (flag palette)                                      | Skip.                                                                                                  |
| Inter-style fonts, lime accent, arbitrary Tailwind values | Poppins Bold + Source Sans 3, Laos tokens, `test:tokens` guard | Skip. Every visual value would fail our token guard.                                                   |
| Unsplash avatars and photos                               | Real photos only, `photos/` slots                              | Skip. These are stock images with fictional people.                                                    |

## Component-by-component

| #   | Component / pattern                                       | What it does                                                                               | Deps                 | Effort to adapt | Verdict                                                                                                                                                                                      |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Workspace FAQ** (live, `#workspace` left column)        | Questions as `h3 > button[aria-expanded]` with `role=region` answers, `inert` when closed. | motion (height anim) | M               | **Keep the pattern, rebuilt**: desktop list + side panel (Radix Tabs, roving focus), mobile accordion (Radix Accordion), hash deep links. Built.                                             |
| 2   | **"Why" section** (live, `#why`)                          | Split heading (h2 left, intro right) and three icon cards, each an h3 plus one sentence.   | motion (fade-in)     | S               | **Keep the pattern, rebuilt** as "Why Nagi of Mekong": three claims from the offer brief, each with a proof line. Built.                                                                     |
| 3   | Scroll fade-in (`whileInView`, both)                      | Fade + translate on scroll, once.                                                          | motion               | S               | **Keep the effect, not the code.** Covered by our CSS + IntersectionObserver reveal (`src/components/effects/reveal.tsx`).                                                                   |
| 4   | Footer email capture (local `footer.tsx`)                 | Email field + submit in a pill.                                                            | none                 | S               | Skip. It has a placeholder-only label, no consent and no validation. Replaced by the React Bits Curved Input with a full form.                                                               |
| 5   | Process tabs (live, `#workflow`: Collect/Discuss/Present) | Three numbered steps as tabs, each with a panel.                                           | motion               | M               | **Suggestion, not built.** It could present "You send → we confirm in 24 h → we pick you up" on the booking page. Our static `NextSteps` strip already does this with less interaction cost. |
| 6   | Individuals / teams tabs (live, `#features`)              | Two audience tabs swapping four feature cards.                                             | motion               | M               | **Suggestion, not built.** It could become "Travelling as a couple / As a group (charter)", linking to private charters. Only worth it with real photos per tab.                             |
| 7   | Library filters (live, `#library`)                        | Filter chips with a live "4 projects shown" status.                                        | none                 | S               | **Suggestion, not built.** It could filter `where-to-stay` by place (Pak Beng / Luang Prabang / Houay Xai). The list is short today, so anchors are enough.                                  |
| 8   | How-it-works scroll progress line (local)                 | Sticky heading, a timeline line that fills as you scroll.                                  | motion `useScroll`   | M               | **Suggestion, not built.** Could be layered on our `.timeline` itinerary with a CSS scroll-driven animation (`animation-timeline: view()`), with no JS.                                      |
| 9   | Audience marquee (live, `#who`)                           | Two rows of image + label tags scrolling.                                                  | motion               | S               | Skip. Decorative motion with no information. We already have one ribbon (Text Loop).                                                                                                         |
| 10  | Bento cards, phone mockups (local)                        | Product UI mockups.                                                                        | motion, next/image   | —               | Skip. These are SaaS-only.                                                                                                                                                                   |
| 11  | Testimonials carousel, autoplay (local)                   | Auto-rotating quotes with avatars and logos.                                               | motion               | —               | Skip. It autoplays and uses fictional people. Our reviews are real, static and linked to the source.                                                                                         |
| 12  | Pricing tiers (local / live `#plans`)                     | Two or three plan cards with a "popular" badge.                                            | motion               | —               | Skip. `Packages` already does this, honestly (no "popular" badge without data).                                                                                                              |
| 13  | Skip link, reduced-motion hook (local)                    | Skip-to-content link, `useReducedMotion` store.                                            | none                 | —               | Skip. We already have both.                                                                                                                                                                  |
| 14  | Theme switch, smooth scroll (local)                       | Dark mode toggle, Lenis.                                                                   | next-themes, lenis   | —               | Skip.                                                                                                                                                                                        |

## What was built (the clear wins)

- **FAQ, workspace pattern**: `src/components/sections/faq-section.tsx`.
  - Desktop (≥ `lg`): the questions are a vertical Radix **Tabs** list with roving focus (↑/↓,
    Home/End, one Tab stop). The selected answer shows in a side panel.
  - Mobile: a Radix **Accordion**.
  - Each question has a stable, language-independent id (`src/content/faq.ts`).
    `/faq/#faq-lao-visa` opens and scrolls to it, and choosing a question updates the hash
    without jumping.
  - Every answer is in the static HTML. The FAQPage JSON-LD is rendered by the same component
    from the same `faqs` array, so the markup and the visible answers can't drift apart.
- **Why Nagi of Mekong**: `src/components/sections/why-nagi.tsx`, on the home page after the
  facts strip. It makes three claims from `docs/04-offer-brief.md` (door to door; a host and
  insurance both days; published prices, nothing charged online). Each has a proof line built
  from site facts, with no superlatives and no claims about other boats.

## Clean-up

When you're done comparing, delete `saas template - to remove from mekong of nagi site after use/`
(see the licence notes above). Nothing in `src/` imports from it.
