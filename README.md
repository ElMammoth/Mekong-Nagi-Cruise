# Nagi of Mekong — website

The new website for **Nagi of Mekong**: two-day slow-boat cruises on the Mekong between
Houay Xai and Luang Prabang, plus land + cruise journeys from Chiang Mai and Nan.

All content comes from the current site, nagiofmekong.com (audited October 2026). See
[`docs/01-content-audit.md`](docs/01-content-audit.md) for what was found, what was
migrated and the issues to confirm with the owner.

| Doc                                                              | What's inside                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| [`docs/01-content-audit.md`](docs/01-content-audit.md)           | Every fact used, source page, open questions           |
| [`docs/02-mobbin-research.md`](docs/02-mobbin-research.md)       | UI references and the decisions they led to            |
| [`docs/03-design-system.md`](docs/03-design-system.md)           | Colour, type, components, motion, voice, accessibility |
| [`docs/04-offer-brief.md`](docs/04-offer-brief.md)               | Offer, pricing, proof and CTA decisions (and why)      |
| [`docs/05-seo-keywords.md`](docs/05-seo-keywords.md)             | Search intent, page map, technical SEO checklist       |
| [`docs/06-shot-list.md`](docs/06-shot-list.md)                   | Every photo slot: file name, ratio, brief              |
| [`docs/07-translation-review.md`](docs/07-translation-review.md) | What a native speaker should check in each language    |

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Radix UI primitives · lucide icons · self-hosted Poppins Bold + Source Sans 3 Regular ·
GSAP (hero text loop only, lazy-loaded) · Vitest · axe-core.

All design values (colour, type, spacing, radius, shadow, motion) are tokens in
`src/app/globals.css`; see [`docs/03-design-system.md`](docs/03-design-system.md). The palette
comes only from the flag of Laos.

No server, database or third-party scripts (TikTok's embed loads only after a visitor clicks
a video). `npm run build` produces plain HTML/CSS/JS in `out/` that can be hosted anywhere.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + format + token guard + contrast + unit tests + build
npm run test:tokens  # fails on hard-coded design values in components
npm run test:contrast # WCAG AA check of every colour pairing in the token layer
npm run test:a11y    # after a build: axe-core on every page in every language, mobile + desktop
SCREENSHOTS=1 npm run test:a11y   # also writes ./screenshots/*.png
npm run test:i18n    # after a build: hreflang reciprocity, canonicals and sitemap alternates
npm run test:rates   # after a build: cached rates = ECB source, every "(about ฿…)" correct
```

`test:a11y` uses `playwright-core`. If Chromium isn't found, set `CHROMIUM_PATH` to a
Chrome or Chromium binary.

## Editing content (no design knowledge needed)

Everything lives in `src/content/`. TypeScript checks it, so a mistake fails the build
instead of going live.

| To change…                                                      | Edit                              |
| --------------------------------------------------------------- | --------------------------------- |
| Any visible text (pages, FAQ, itineraries, hotels, alt text…)   | `src/i18n/messages/<language>.ts` |
| Phone, email, WhatsApp, hours, address                          | `src/content/site.ts`             |
| Cruises: prices (US dollars), departure days, options, packages | `src/content/trips.ts`            |
| Hotels (names, links, which package includes them)              | `src/content/stays.ts`            |
| Customer reviews and ratings                                    | `src/content/reviews.ts`          |
| TikTok videos                                                   | `src/content/tiktok.ts`           |
| Photo slots (file names, ratios)                                | `src/content/photos.ts`           |
| Page addresses in each language                                 | `src/i18n/routes.ts`              |
| Show or hide placeholders                                       | `src/content/settings.ts`         |

Text lives in one file per language. `en.ts` is the source of truth for the keys: every other
language must have exactly the same keys (TypeScript fails the build otherwise), the same
list lengths and the same `{placeholders}` and `<tags>` (`npm test` fails otherwise). When
you change English copy, change it in every language file.

**Seasonal offers.** Give a price option `validFrom` / `validTo` dates (`"2027-04-20"`).
The booking form hides it outside those dates automatically. Static pages (price lists,
"From" prices) are refreshed on the next build, so rebuild after an offer starts or ends.

**Departure days** use numbers: `0` Sunday, `1` Monday … `6` Saturday.

## Languages

English is the default, at `/`. French, German, Spanish, Simplified Chinese and Thai live
under `/fr/`, `/de/`, `/es/`, `/zh/` and `/th/`, with translated page addresses in French,
German and Spanish (`/fr/croisieres/houay-xai-luang-prabang/`…). Each page links to all its
language versions (hreflang + x-default), and the sitemap lists them all.

- **Switching language** (globe menu in the header, or the mobile menu) keeps the visitor on
  the same page and remembers the choice in a cookie (`nagi_locale`).
- **First visit:** on an English page, if the browser's preferred languages (the list it
  sends as Accept-Language) include one of ours, a small banner at the bottom offers it.
  It never redirects, never uses location, and isn't in the HTML search engines read.
- **Fonts:** Poppins and Source Sans 3 have no Chinese or Thai characters, so those pages
  use the visitor's system fonts for them (`globals.css`, `:lang()` rules).
- **Adding a language:** add it to `src/i18n/config.ts`, copy `en.ts` to
  `src/i18n/messages/<code>.ts` and translate, then give it paths in `src/i18n/routes.ts`.

## Currency

Prices are written once, in US dollars, in `src/content/trips.ts`; bookings are charged in
US dollars. The pages show "US$160 (about ฿5,370)". Visitors can pick another currency
(USD, EUR, GBP, AUD, NZD, CAD, CHF, THB, CNY) in the header: amounts are then labelled
"about…", the US dollar price stays next to them, and a note gives the rates date. The
choice is kept in the browser (localStorage) across pages and languages.

Rates are the European Central Bank's daily reference rates, fetched from
[Frankfurter](https://frankfurter.dev) **at build time** (`npm run rates`, part of
`npm run build`) into `src/data/rates.json`. That committed file is the fallback: if the
source is down, the last rates are used with their date; with no rates at all, the site
shows US dollars only. To refresh rates daily, the workflow
`.github/workflows/daily-rebuild.yml` calls your host's deploy hook every night: create a
build hook on your host and save its URL as the repository secret `DEPLOY_HOOK_URL`.

## TikTok videos

`src/content/tiktok.ts` lists the videos (clean URL, id, handle, date). Before each build,
`npm run tiktok` asks TikTok's official oEmbed endpoint for each creator's name and caption
and saves them in `src/content/tiktok.generated.json` (kept if TikTok is unreachable).
Captions are shown verbatim. Each video is a light placeholder card; TikTok's official
embed and script load only after a visitor clicks it. Videos and thumbnails are never
downloaded. They are not reviews: they don't count in the ratings and aren't marked up as
reviews. To show a "View more on TikTok" link, set `tiktokMoreUrl` to a real hashtag or
profile URL.

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
   Set `lang: "fr"` for French reviews (each review is shown in its own language on every
   version of the site, with a language label; reviews are never translated).
4. `npm test` checks every entry (valid link on the right site, date, rating). Update the
   rating figures and `asOf` whenever you add reviews.

The reviews are deliberately **not** marked up as structured data: Google doesn't allow
review stars for reviews collected on other sites.

Source badges use the official Tripadvisor and Viator logos
(`src/components/reviews/platform-logo.tsx`).

## Hero text loop

The moving ribbon in the hero is React Bits' Text Loop (`src/components/effects/text-loop.tsx`,
licence in `REACT-BITS-LICENSE.md` next to it). Change its phrase in each language file
(`home.loopPhrase`). It pauses on hover/focus, has a pause button, and doesn't move for visitors
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
