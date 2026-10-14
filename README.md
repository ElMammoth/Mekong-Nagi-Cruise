# Nagi of Mekong — website

The new website for **Nagi of Mekong**: two-day slow-boat cruises on the Mekong between
Houay Xai and Luang Prabang, plus land + cruise journeys from Chiang Mai and Nan.

All content comes from the current site, nagiofmekong.com (audited October 2026). See
[`docs/01-content-audit.md`](docs/01-content-audit.md) for what was found, what was
migrated and the issues to confirm with the owner.

| Doc                                                        | What's inside                                          |
| ---------------------------------------------------------- | ------------------------------------------------------ |
| [`docs/01-content-audit.md`](docs/01-content-audit.md)     | Every fact used, source page, open questions           |
| [`docs/02-mobbin-research.md`](docs/02-mobbin-research.md) | UI references and the decisions they led to            |
| [`docs/03-design-system.md`](docs/03-design-system.md)     | Colour, type, components, motion, voice, accessibility |
| [`docs/04-offer-brief.md`](docs/04-offer-brief.md)         | Offer, pricing, proof and CTA decisions (and why)      |
| [`docs/05-seo-keywords.md`](docs/05-seo-keywords.md)       | Search intent, page map, technical SEO checklist       |
| [`docs/06-shot-list.md`](docs/06-shot-list.md)             | Every photo slot: file name, ratio, brief              |

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Radix UI primitives · lucide icons · self-hosted Poppins Bold + Source Sans 3 Regular ·
GSAP (hero text loop only, lazy-loaded) · Vitest · axe-core.

All design values (colour, type, spacing, radius, shadow, motion) are tokens in
`src/app/globals.css`; see [`docs/03-design-system.md`](docs/03-design-system.md). The palette
comes only from the flag of Laos.

No server, database or third-party scripts. `npm run build` produces plain HTML/CSS/JS in
`out/` that can be hosted anywhere.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + format + token guard + contrast + unit tests + build
npm run test:tokens  # fails on hard-coded design values in components
npm run test:contrast # WCAG AA check of every colour pairing in the token layer
npm run test:a11y    # after a build: axe-core on every page, mobile + desktop
SCREENSHOTS=1 npm run test:a11y   # also writes ./screenshots/*.png
```

`test:a11y` uses `playwright-core`. If Chromium isn't found, set `CHROMIUM_PATH` to a
Chrome or Chromium binary.

## Editing content (no design knowledge needed)

Everything lives in `src/content/`. TypeScript checks it, so a mistake fails the build
instead of going live.

| To change…                                                                | Edit                      |
| ------------------------------------------------------------------------- | ------------------------- |
| Phone, email, WhatsApp, hours, address, headline facts, "on board" points | `src/content/site.ts`     |
| Cruises: prices, departure days, itinerary, inclusions                    | `src/content/trips.ts`    |
| Hotels                                                                    | `src/content/stays.ts`    |
| FAQ                                                                       | `src/content/faq.ts`      |
| Customer reviews and ratings                                              | `src/content/reviews.ts`  |
| Photo slots (file names, alt text)                                        | `src/content/photos.ts`   |
| Show or hide placeholders                                                 | `src/content/settings.ts` |

**Seasonal offers.** Give a price option `validFrom` / `validTo` dates (`"2027-04-20"`).
The booking form hides it outside those dates automatically. Static pages (price lists,
"From" prices) are refreshed on the next build, so rebuild after an offer starts or ends.

**Departure days** use numbers: `0` Sunday, `1` Monday … `6` Saturday.

## Reviews

Only genuine reviews, copied exactly, with the reviewer's name, the date and a link back.
Tripadvisor and Viator block automated access, so they are pasted by hand:

1. Open the [Tripadvisor](https://www.tripadvisor.fr/Attraction_Review-g737155-d15773080-Reviews-Nagi_of_Mekong_Cruise-Huay_Xai_Bokeo_Province.html)
   and [Viator](https://www.viator.com/tours/Northern-Thailand/Nagi-of-Mekong-cruise/d22518-223302P2) pages.
2. In `src/content/reviews.ts`, set `reviewsRetrievedAt` to today's date and add one entry
   to `ratings` per platform: the average rating, the number of reviews and the date
   (`asOf`). Optionally add `distribution` (number of 5★, 4★… reviews) to show the
   Tripadvisor-style breakdown bars.
3. Add 4 reviews to `reviews`: 3 with `placement: "offer"` (cards next to the prices) and
   1 short one with `placement: "booking"` (next to the booking form). Copy the text,
   reviewer name, date and star rating exactly, and the link to the review (or the listing).
   Set `lang: "fr"` for French reviews.
4. `npm test` checks every entry (valid link on the right site, date, rating). Update the
   rating figures and `asOf` whenever you add reviews.

The reviews are deliberately **not** marked up as structured data: Google doesn't allow
review stars for reviews collected on other sites.

Source badges use the official Tripadvisor and Viator logos
(`src/components/reviews/platform-logo.tsx`).

## Hero text loop

The moving ribbon in the hero is React Bits' Text Loop (`src/components/effects/text-loop.tsx`,
licence in `REACT-BITS-LICENSE.md` next to it). Change its phrase in `src/content/site.ts`
(`loopPhrase`). It pauses on hover/focus, has a pause button, and doesn't move for visitors
who prefer reduced motion.

## Photos

Photo slots are in place across the site (hero, journey, boat, food, villages, team) with
fixed ratios, so adding photos never moves the layout. To add one, save it in `photos/`
with the slot's file name, e.g. `photos/nagi-of-mekong-boat-at-the-pier.jpg`, and build.
`npm run photos` (run automatically by `dev` and `build`) makes responsive WebP files and
a blur preview. See [`docs/06-shot-list.md`](docs/06-shot-list.md) for every slot.

## Placeholders

While `showPlaceholders` is `true` in `src/content/settings.ts`, empty review and photo
slots show a dashed "Placeholder" box saying what goes there. Set it to `false` before
launch: empty slots then disappear (the home hero falls back to the river illustration).

## How booking works

The form doesn't need a backend. It builds a clear message (trip, date, travellers,
option, estimate, extras to ask about, contact details) and opens it in **WhatsApp** (`wa.me/66955073264`) or
the visitor's **email app** (`adisak.star@gmail.com`). Departure dates are generated in the
visitor's browser from the real weekdays, so they're never stale.

## Deploying

Any static host works: upload `out/`. Netlify and Cloudflare Pages also read
`public/_headers` (so the social card `/opengraph-image` is served as a PNG); on other hosts,
serve that file with `Content-Type: image/png`.

- **Netlify / Cloudflare Pages**: build `npm run build`, publish `out`. Old GoDaddy URLs are
  redirected by `public/_redirects`.
- **Vercel**: import the repo; it detects Next.js.
- **Other hosts**: copy the rules in `public/_redirects` into the host's redirect settings
  so links to the old pages (e.g. `/upstream-cruises`) keep working.

Set the real domain in `src/content/site.ts` (`url`): it's used for canonical URLs, the
sitemap and social cards.
