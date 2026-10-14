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

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Radix UI primitives · lucide icons · self-hosted Fraunces + Figtree · Vitest · axe-core.

No server, database or third-party scripts. `npm run build` produces plain HTML/CSS/JS in
`out/` that can be hosted anywhere.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + format + unit tests + build
npm run test:a11y    # after a build: axe-core on every page, mobile + desktop
SCREENSHOTS=1 npm run test:a11y   # also writes ./screenshots/*.png
```

`test:a11y` uses `playwright-core`. If Chromium isn't found, set `CHROMIUM_PATH` to a
Chrome or Chromium binary.

## Editing content (no design knowledge needed)

Everything lives in `src/content/`. TypeScript checks it, so a mistake fails the build
instead of going live.

| To change…                                                                | Edit                   |
| ------------------------------------------------------------------------- | ---------------------- |
| Phone, email, WhatsApp, hours, address, headline facts, "on board" points | `src/content/site.ts`  |
| Cruises: prices, departure days, itinerary, inclusions                    | `src/content/trips.ts` |
| Hotels                                                                    | `src/content/stays.ts` |
| FAQ                                                                       | `src/content/faq.ts`   |

**Seasonal offers.** Give a price option `validFrom` / `validTo` dates (`"2027-04-20"`).
The booking form hides it outside those dates automatically. Static pages (price lists,
"From" prices) are refreshed on the next build, so rebuild after an offer starts or ends.

**Departure days** use numbers: `0` Sunday, `1` Monday … `6` Saturday.

## Photos

The current site's boat photos could not be exported: they are lazy-loaded behind GoDaddy
and the gallery is members-only. The design therefore stands on typography and the
illustrated river route. To add real photos later, put them in `public/images/` and use
`next/image` in the hero (`src/app/page.tsx`), trip header (`PageHeader`) and `StayCard`.
Captions from the old site: "Comfortable seats and ample room to move around", "Buffet
style freshly cooked lunches are served daily", "One of our boats".

## How booking works

The form doesn't need a backend. It builds a clear message (trip, date, travellers,
option, estimate, contact details) and opens it in **WhatsApp** (`wa.me/66955073264`) or
the visitor's **email app** (`adisak.star@gmail.com`). Departure dates are generated in the
visitor's browser from the real weekdays, so they're never stale.

## Deploying

Any static host works: upload `out/`.

- **Netlify / Cloudflare Pages**: build `npm run build`, publish `out`. Old GoDaddy URLs are
  redirected by `public/_redirects`.
- **Vercel**: import the repo; it detects Next.js.
- **Other hosts**: copy the rules in `public/_redirects` into the host's redirect settings
  so links to the old pages (e.g. `/upstream-cruises`) keep working.

Set the real domain in `src/content/site.ts` (`url`): it's used for canonical URLs, the
sitemap and social cards.
