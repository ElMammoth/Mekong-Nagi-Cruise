# 03 · Design system — Nagi of Mekong

**One token layer.** Every design value lives in `src/app/globals.css` (`@theme`). Tailwind
turns those tokens into utilities (`bg-surface-tint`, `text-heading`, `rounded-md`,
`shadow-sm`, `duration-base`, `grid-cols-sidebar`…). Components use only those utilities.
Two guards run in `npm run check`:

- `npm run test:tokens` fails on any hard-coded value in a component: arbitrary Tailwind
  values, hex or rgb colours, off-scale radii, extra font weights, italics or raw durations.
- `npm run test:contrast` checks every colour pairing the UI uses against WCAG AA.

The few places that can't use CSS read the same file through `src/lib/tokens.ts`: the
theme colour, the favicon and the social card.

## Colour: from the flag of Laos only

Source colours: **blue `#002868`**, **white `#FFFFFF`**, **red `#CE1126`**. Tints are those
colours mixed with white; hover states mix the flag colours with each other.

| Token                      | Hex                   | Derivation         | Role                                          |
| -------------------------- | --------------------- | ------------------ | --------------------------------------------- |
| `canvas`, `surface`        | `#FFFFFF`             | white              | Page background (dominant), cards, menus      |
| `surface-subtle`           | `#F7F9FA`             | blue 3%            | Alternate section bands                       |
| `surface-tint`             | `#EBEEF3`             | blue 8%            | Secondary surfaces, chips, placeholders       |
| `line`                     | `#E0E5ED`             | blue 12%           | Dividers, card borders                        |
| `line-strong`              | `#C2CBDB`             | blue 24%           | Decorative emphasis, empty stars              |
| `control`                  | `#8094B4`             | blue 50%           | Form control borders (3.1:1)                  |
| `heading`, `primary`       | `#002868`             | flag blue          | Headings, links, primary actions, blue bands  |
| `ink`, `primary-hover`     | `#193D77`             | blue 90%           | Body text, hover on blue                      |
| `muted`                    | `#4D6995`             | blue 70%           | Secondary text                                |
| `on-primary-muted`         | `#CCD4E1`             | white 80% + blue   | Secondary text on blue                        |
| `accent`                   | `#CE1126`             | flag red           | **Main CTA**, current nav item, stars, errors |
| `accent-hover`             | `#A51633`             | red 80% + blue 20% | Main CTA hover                                |
| `accent-soft`              | `#FBECEE`             | red 8%             | Seasonal badge background                     |
| `brand-tripadvisor/viator` | `#002B11` / `#008768` | official logos     | Only inside the review source logos           |
| `success`, `on-success`    | `#157347` / `#FFFFFF` | semantic exception | "Included" check marks only                   |

**Rules:**

- White dominates.
- Blue carries headings, key surfaces (the on-board band, the CTA band, the footer) and
  primary actions.
- Red is used sparingly: the main "Check availability" button (one per view), the current
  page in the nav, rating stars, badges and errors.
- No other hues, with one exception: `success` green, used only for the "included" check
  marks in the comparison table. It's a status colour, never decoration, and it always
  appears with a check shape and a text label.

**Contrast (all AA, from `npm run test:contrast`):**

| Pairing                                     | Ratio              |
| ------------------------------------------- | ------------------ |
| ink on white / subtle / tint                | 10.6 / 10.1 / 9.1  |
| heading or primary on white / subtle / tint | 14.0 / 13.2 / 12.0 |
| muted on white / subtle / tint              | 5.6 / 5.3 / 4.8    |
| white on primary / primary-hover            | 14.0 / 10.6        |
| on-primary-muted on primary                 | 9.4                |
| white on accent / accent-hover              | 5.6 / 7.6          |
| accent on white / subtle / accent-soft      | 5.6 / 5.3 / 4.9    |
| control border on white (UI, ≥ 3)           | 3.1                |
| focus ring (blue on white, white on blue)   | 14.0               |
| success on white / white on success         | 5.9                |

## Typography: two fonts, one weight each

- **Headings and UI labels: Poppins Bold (700).** This covers h1–h6, buttons, nav items,
  eyebrows, prices and names.
- **Body: Source Sans 3 Regular (400).**
- Both are self-hosted through `next/font/local` from `@fontsource`, with
  `display: swap`, preloaded, and with size-adjusted fallbacks (so no layout shift).
- `font-synthesis: none` means no faux bold or italic. `strong`, `em` and `address` are
  styled by colour, not weight or slant.
- **Chinese and Thai:** the two fonts have no CJK or Thai glyphs. On `/zh/` and `/th/`
  pages the stacks become Poppins / Source Sans 3 (for Latin text) followed by the system's
  Chinese or Thai fonts (PingFang SC, Microsoft YaHei, Noto Sans SC… / Noto Sans Thai,
  Leelawadee UI, Thonburi…), and letter-spacing is reset to 0. No extra font is downloaded.
- The latin subsets have no "→". Route labels draw it as an icon (`RouteLabel`) and read
  it as "to".

| Token                                | Size (mobile → desktop)   | Use                        |
| ------------------------------------ | ------------------------- | -------------------------- |
| `text-display`                       | 34 → 60 px                | Home h1                    |
| `text-h1`                            | 30 → 48 px                | Page titles, key figures   |
| `text-h2`                            | 24 → 36 px                | Section titles             |
| `text-h3`                            | 19 → 22 px                | Cards, itinerary days      |
| `text-lead`                          | 18 → 20 px                | Intros                     |
| `text-base`                          | 17 px / 1.65              | Body                       |
| `text-sm` / `text-xs` / `text-micro` | 15 / 13 / 11 px           | Meta, captions, badges     |
| `text-eyebrow`                       | 13 px, +0.08em, uppercase | Section eyebrows (Poppins) |

## Space, layout, shape, depth

- **Spacing:** base `--spacing: 0.25rem`, plus `gutter` (16 px), `section` (64 → 104 px,
  fluid) and `header` (72 px, also used for anchor offsets).
- **Layout tokens:**
  - `grid-cols-hero`, `intro`, `sidebar`, `toc`, `media`, `cta`, `compare`, `icon`,
    `label`, `price`, `summary`.
  - `w-menu`, `max-w-note`, `max-w-fact`, `w-mark`.
- **Radius (small only):** `rounded-xs` 2 px (chips, badges, checkboxes), `rounded-sm` 4 px
  (buttons, inputs), `rounded-md` 6 px (cards, images). No pills, no circles in the UI.
- **Shadows (soft, blue-tinted):** `shadow-sm` (cards), `shadow-md` (menus, sticky bars),
  `shadow-lg` (dialog), `shadow-ring` (selected option).

## Motion

| Token                        | Value        | Use                            |
| ---------------------------- | ------------ | ------------------------------ |
| `duration-fast`              | 120 ms       | Hover and colour changes       |
| `duration-base`              | 200 ms       | Menus, accordion, size changes |
| `duration-page`              | 220 ms       | Route cross-fade               |
| `duration-slow`              | 2.4 s        | The river drawing itself once  |
| `duration-reveal`            | 560 ms       | Scroll reveal (fade + rise)    |
| `reveal-shift`               | 0.75 rem     | How far revealed content rises |
| `reveal-stagger`             | 70 ms        | Delay between grouped items    |
| `ease-standard` / `ease-out` | cubic-bezier | All of the above               |

- **Page transitions** (`src/app/template.tsx`): React `<ViewTransition>` cross-fades the
  page content.
  - The header has its own view-transition name and stays still.
  - Every new route lands at the top instantly. Anchor links land on their anchor;
    back/forward keeps the browser's position.
  - In-page anchors scroll smoothly (`scroll-behavior: smooth`, with Next's
    `data-scroll-behavior` override during navigation).
- **Hero Text Loop** (React Bits, adapted): a short phrase flows along a wave-shaped blue
  ribbon. The h1 stays static.
  - The full phrase is exposed to screen readers as hidden text.
  - It has a pause button (WCAG 2.2.2) and pauses on hover or focus.
  - GSAP loads lazily, only when the animation runs.
- **Scroll reveal** (`src/components/effects/reveal.tsx`), after React Bits' Animated
  Content, rebuilt in CSS + IntersectionObserver (React Bits uses GSAP ScrollTrigger and
  starts content hidden):
  - `data-reveal` on a block, `data-reveal="group"` on a list (children stagger, capped at
    six steps). Used on section headings, cards, review items, itinerary stops, the FAQ, the
    "Why" claims and the TikTok row. Never on the hero, the h1 or the LCP image.
  - Only elements that start below the fold are hidden, and only by a data attribute the
    script adds. With JavaScript off, blocked or failing, everything is visible.
  - Opacity and transform only, played once, so there's no layout shift. Printing and
    leaving the page show everything at once.
  - Re-armed on every route by `<PageTransition>`, after the scroll-to-top. Language
    switches are full page loads; currency switches re-render prices without touching the
    reveal state.
- `prefers-reduced-motion: reduce` turns off the text loop, the page cross-fade, smooth
  scrolling, the scroll reveal and all animations.

## Brand

- **Logo:** the slow boat from the original logo, redrawn as clean SVG line art
  (`BoatMark`) in flag blue, with no box. Where it stands alone it has
  `role="img"` and the title "Nagi of Mekong", and the header link is named
  "Nagi of Mekong, home".
- **Route map:** the river in blue on a blue-tint bank, red stop rings, and a white disc
  for the sun (a nod to the flag's disc).

## Components (all in `src/components`)

| Component                                                                                 | Built on                                                  | Notes                                                                                                          |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `SiteHeader`                                                                              | Radix `NavigationMenu` (List, Trigger, Content, Viewport) | Arrow keys, Esc, hover or click; current page in red; visible focus ring                                       |
| `MobileNav`                                                                               | Radix `Dialog`                                            | Focus trap, Esc, focus returns to trigger, CTA pinned                                                          |
| `Button`, `ButtonLink`, `ButtonAnchor`                                                    | —                                                         | `cta` (red), `primary` (blue), `secondary`, `ghost`, `onDark`                                                  |
| `RatingSummary`, `ReviewsSection`, `ReviewCard`, `BookingReview`, `PlatformLogo`, `Stars` | —                                                         | Tripadvisor-pattern proof with official source logos                                                           |
| `TextLoop`                                                                                | React Bits + GSAP                                         | See Motion                                                                                                     |
| `Packages`, `HandledForYou`, `NextSteps`, `NextSailings`                                  | —                                                         | Offer, steps and real dates                                                                                    |
| `Photo`                                                                                   | `next/image` + custom loader                              | Fixed ratio, responsive WebP, blur, placeholder                                                                |
| `FaqSection`, `FaqWorkspace`                                                              | Radix `Tabs` (≥ lg), `Accordion` (mobile, static HTML)    | List + answer panel, roving focus, `#faq-<id>` deep links, one data source for answers and FAQPage JSON-LD     |
| `WhyNagi`                                                                                 | —                                                         | Three claims from the offer brief, each with a proof line                                                      |
| `TikTokVideos`                                                                            | TikTok official player (`player/v1`)                      | After consent only; mounts near the viewport, one video plays at a time (the most visible, muted), 9:16 frames |
| `ConsentBanner`                                                                           | Radix `Switch`                                            | Accept / Reject (equal weight) / Customize; non-modal, first in tab order                                      |
| `CurvedInput`, `NewsletterForm`                                                           | React Bits Curved Input (adapted)                         | Footer sign-up: real input and submit button under the arc, token colours                                      |
| `BookingForm`                                                                             | Radix `RadioGroup`, `Checkbox`                            | Error summary, estimate, extras; details on a subgrid (see Forms)                                              |
| `RouteLabel`                                                                              | —                                                         | "→" as an icon, read as "to"                                                                                   |

## Accessibility checklist (verified)

- axe-core WCAG 2.2 A/AA: 0 violations on 11 pages at 390 px and 1440 px. No horizontal
  scroll.
- Skip link, landmarks, one `h1` per page, breadcrumb with `aria-current`, visible
  2 px focus ring everywhere (white on blue surfaces).
- Inline links in body text are underlined (not colour alone).
- Moving content can be paused; motion respects `prefers-reduced-motion`.

## Timelines (itinerary and route strip)

Stop markers sit exactly on their line, at every size, in every language and with any
number of text lines. Four tokens drive both (`globals.css`): `--timeline-marker` (square
marker size), `--timeline-line` (line width), `--timeline-indent` and `--timeline-gap`.
The line and each marker share one coordinate and are centred on it with
`translate(-50%, -50%)`; vertically, a marker sits at `0.5lh` of its title (the middle of
the first line). Classes: `.timeline` (vertical, day by day) and `.route-line`
(horizontal, the stops on one line with the names underneath). No pixel offsets.

## Forms

One field model for every form (`Field` in `booking-form.tsx`):

- Every single-line control (text, email, tel, select, the traveller stepper) is
  `h-field` (3 rem) with `rounded-sm`, `px-4` and a `border-control` border. Selects use
  `appearance-none` and their own chevron, so they match inputs exactly. The textarea shares
  the padding, border and radius.
- Each field is three rows: label, control, message. In the two-column "Your details" grid,
  each field is a CSS **subgrid** spanning those three rows. Labels, controls and messages
  therefore line up across a row even when a label wraps in a longer language. Labels are
  bottom-aligned, so a short label sits on its control.
- The message row always reserves one line (`min-h-line`). It shows the error when there is
  one, otherwise the hint, so validation never moves the fields below.
- The steps column is capped at `max-w-form` and centred in its column, so all steps share
  one left edge. Below `sm` everything is one column.
- `npm run test:form` checks all of this in English, Spanish and German at 390 px and
  1440 px, before and after a failed submit, and saves screenshots.
