# 03 · Design system — Nagi of Mekong

Tokens live in `src/app/globals.css` (`@theme`) and are used as Tailwind classes
(`bg-sand`, `text-maroon`, `text-h2`…). Change a token there and it changes everywhere.

## Identity in one line

**Warm, unhurried, trustworthy.** A family-run boat on a big river: the visual language
is the original logo (vermilion field, maroon script, the hand-drawn route Houay Xai →
Pak Beng → Luang Prabang) made calmer and more legible.

## Colour

| Token        | Hex       | Role                                                       | Contrast                          |
| ------------ | --------- | ---------------------------------------------------------- | --------------------------------- |
| `ink`        | `#2A1215` | Body text                                                  | 15.3:1 on sand                    |
| `maroon`     | `#5B1E22` | Headings, CTA band                                         | 11.0:1 on sand                    |
| `vermilion`  | `#E2412B` | Logo red — **decoration and large display only** (≥ 24 px) | 4.2:1 on sand                     |
| `lantern`    | `#B5301C` | Buttons, links, focus ring                                 | white on it 6.2:1 · on sand 5.4:1 |
| `sand`       | `#F6EEE3` | Page background                                            | —                                 |
| `paper`      | `#FFFBF5` | Cards, raised surfaces                                     | —                                 |
| `silt`       | `#E7D9C6` | Borders, dividers                                          | —                                 |
| `muted`      | `#6B5A55` | Secondary text                                             | 5.7:1 on sand                     |
| `river`      | `#173F3B` | Dark sections, footer                                      | sand on it 11.6:1                 |
| `river-mist` | `#DCE8E3` | Text on `river`                                            | 9.2:1                             |
| `gold`       | `#E3B05C` | Eyebrows/icons on dark only                                | 5.9:1 on river                    |

Rules: vermilion never carries small text. Every interactive element uses `lantern`.
Dark sections use `river` (the water) or `maroon` (the logo script), never pure black.

## Typography

- **Display: Fraunces** (variable, optical size): a soft, slightly old-style serif that
  echoes the hand-lettered logo without imitating the script. Italic is reserved for one
  emphasised word per headline (_comfort_) and the wordmark.
- **Text & UI: Figtree** (variable): a friendly, highly legible humanist sans.
- Both self-hosted via `next/font/local` (no Google request, no layout shift).

| Token          | Size (mobile → desktop) | Use                          |
| -------------- | ----------------------- | ---------------------------- |
| `text-display` | 40 → 76 px              | Home hero only               |
| `text-h1`      | 34 → 56 px              | Page titles                  |
| `text-h2`      | 28 → 42 px              | Section titles               |
| `text-h3`      | 20 → 26 px              | Cards, steps, itinerary days |
| `text-lead`    | 18 → 21 px              | Intros                       |
| body           | 17 px / 1.65            | Everything else              |

Eyebrows: 14 px, semibold, uppercase, `tracking-[0.14em]`, `lantern` (or `gold` on dark).

## Space, shape, depth

- 4 px base grid (Tailwind spacing). Sections `py-20 sm:py-28`; container `max-w-7xl`
  with 16 px gutters on phones.
- Radius: cards `1.25rem`, controls `0.75rem`, buttons and chips fully round.
- Two shadows only: `shadow-card` (resting) and `shadow-raised` (hover, menus, dialogs).

## Brand devices

- **Boat mark** (`BoatMark`): the long slow boat in a few strokes. Used in the wordmark,
  favicon, CTA band and 404.
- **River route** (`RouteMap`, `RouteStrip`, itinerary spine): the line from the logo.
  Stops are vermilion rings; the river is `river` on a `river-mist` bank.
- **Day chips** (`DayChips`): departure weekdays are always shown as chips, Monday-first.

## Components (all in `src/components`)

| Component                                                                             | Built on                           | Notes                                                        |
| ------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `SiteHeader`                                                                          | Radix `NavigationMenu`             | Keyboard and screen-reader friendly mega-menu for cruises    |
| `MobileNav`                                                                           | Radix `Dialog`                     | Full-height sheet, focus trapped, Esc to close, CTA pinned   |
| `FaqList`                                                                             | Radix `Accordion`                  | Multiple open, animated height (reduced-motion aware)        |
| `BookingForm`                                                                         | Radix `RadioGroup` + native inputs | Date cards, travellers stepper, live estimate, error summary |
| `Button`, `ButtonLink`, `ButtonAnchor`                                                | —                                  | `primary`, `secondary`, `ghost`, `onDark`; min height 44 px  |
| `TripCard`, `PriceList`, `Itinerary`, `Included`, `StayCard`, `CtaBand`, `PageHeader` | —                                  | Content-driven sections                                      |

## Motion

Two motions only: the river draws itself once in the hero (2.4 s), and content rises
12 px on entrance or when a menu opens. Both are disabled by `prefers-reduced-motion`.

## Voice

Plain, warm, specific. Lead with the facts travellers need (days, price, what's included),
in short sentences. Say "we". No superlatives the operator hasn't claimed.

## Accessibility checklist (verified by `npm run test:a11y`)

- axe-core WCAG 2.2 A/AA: 0 violations on all 10 pages at 390 px and 1440 px.
- No horizontal scroll at 390 px.
- Skip link, landmarks, one `h1` per page, breadcrumb with `aria-current`.
- Visible focus ring (`lantern`, 2 px offset) on every control; touch targets ≥ 44 px.
- Form: labels, `aria-describedby` hints/errors, focusable error summary, live status.
