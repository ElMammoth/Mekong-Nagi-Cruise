# 05 · SEO: keywords, intent and page map

Research in October 2026: web searches for the route, then a read of the pages that rank
(travel blogs, forums, OTA listings) to see what searchers ask. No paid keyword tool was
available, so **volumes are not measured**. After launch, check impressions per query in
Google Search Console and adjust titles.

## What searchers want

1. **"How do I get from northern Thailand to Luang Prabang by boat?"** This is the biggest
   cluster, and the queries are informational, with comparison intent. Searchers compare
   the public slow boat with private or "luxury" boats, and ask about the border at Chiang
   Khong / Houay Xai, the Lao visa on arrival, the Pak Beng night and what to bring.
2. **"Which cruise should I book?"** These queries are commercial. Searchers compare
   operators by price, group size, lunch, hotel and pick-up.
3. **"Where do I sleep in Pak Beng?"** This cluster is navigational or commercial, around
   hotel names (Le Grande Pakbeng, Sanctuary Pakbeng Lodge).
4. **Upstream (Luang Prabang → Houay Xai)** is a smaller cluster. People usually continue
   overland to Chiang Rai or Chiang Mai.
5. **Starting further away:** queries from Chiang Mai, Chiang Rai and Nan, sometimes
   as packaged tours.

Sources read: [Maptrotting](https://maptrotting.com), [Backpack Moments](https://backpackmoments.com),
[Discover Laos Today](https://discoverlaos.today), [Jetsetting Fools](https://jetsettingfools.com),
[Grantourismo Travels](https://grantourismotravels.com), [Becky Exploring](https://beckyexploring.com),
[A Social Nomad](https://asocialnomad.com), [Careergappers](https://careergappers.com),
[Away Go We](https://awaygowe.com), [VoyageForum](https://voyageforum.com),
[Wereldreizigers](https://wereldreizigers.nl), [Mochileando por el mundo](https://mochileandoporelmundo.com),
[Easia Travel](https://easia-travel.com), [The Ultimate Travel Company](https://theultimatetravelcompany.co.uk),
[Inquirer Global Nation](https://globalnation.inquirer.net), [Expedia](https://www.expedia.com).

## Spelling variants

The same places are spelled many ways, and searchers use all of them. The site
standardises on **Houay Xai, Pak Beng, Luang Prabang**. It mentions the main variants once,
naturally, where people look for them: on the guide, the downstream page and the
metadata. There is no keyword stuffing.

| Canonical     | Variants seen in results              |
| ------------- | ------------------------------------- |
| Houay Xai     | Huay Xai, Huay Xay, Houayxay, Huayxai |
| Pak Beng      | Pakbeng, Pak Bang                     |
| Chiang Khong  | (stable)                              |
| Luang Prabang | Luang Phabang (rare)                  |

## Page map: one main intent per URL, no cannibalisation

| URL                                             | Primary query (intent)                                                           | Secondary queries                                                                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                                             | Mekong cruise Houay Xai to Luang Prabang (commercial)                            | 2-day Mekong cruise Laos, Mekong slow boat cruise, Nagi of Mekong (brand)                                 |
| `/cruises/downstream/`                          | Huay Xai to Luang Prabang slow boat (commercial)                                 | Chiang Khong to Luang Prabang boat, Pakbeng cruise, Houayxay Luang Prabang cruise price                   |
| `/cruises/upstream/`                            | Luang Prabang to Huay Xai slow boat (commercial)                                 | Luang Prabang to Chiang Khong by boat, upstream Mekong cruise                                             |
| `/cruises/chiang-mai-land-and-cruise/`          | Chiang Mai to Luang Prabang slow boat tour (commercial)                          | Chiang Mai to Luang Prabang via Golden Triangle, White Temple + Mekong cruise                             |
| `/cruises/nan-to-luang-prabang/`                | Nan to Luang Prabang (informational/commercial)                                  | Huai Kon border to Pak Beng, Nan to Pak Beng                                                              |
| `/guides/houay-xai-to-luang-prabang/` **(new)** | How to get from Chiang Khong / Huay Xai to Luang Prabang by boat (informational) | slow boat Laos what to bring, Lao visa on arrival Houay Xai, Pak Beng overnight, slow boat departure days |
| `/where-to-stay/`                               | Pak Beng hotels (commercial)                                                     | Le Grande Pakbeng, Sanctuary Pakbeng Lodge, Villa Mira Luang Prabang, Houay Xai near the pier             |
| `/plan-your-trip/`                              | Mekong cruise FAQ (informational)                                                | Lao visa, food on board, weather in Pak Beng                                                              |
| `/private-charters/`                            | Private Mekong boat charter (commercial)                                         | meetings or events on the Mekong, group boat Laos                                                         |
| `/contact/`                                     | Nagi of Mekong contact / booking (navigational)                                  | —                                                                                                         |

**Why one guide, not four thin pages.** The route can be started from four places (Chiang
Khong, Chiang Mai, Nan, Luang Prabang upstream), and site facts cover each in a paragraph
or two. A separate page for each would be thin. One complete guide with anchored
sections (`#from-chiang-mai` and so on) answers the informational cluster and links
down to the commercial pages.

**Why not a "public boat vs cruise" page.** It would need facts about third-party boats
that the operator doesn't publish. The guide covers the decision honestly instead: it
lists what's included with Nagi and makes no claims about others.

## Technical checklist (implemented)

- A unique `<title>` and meta description per page, each with the primary query near
  the start and under about 60 and 155 characters.
- A self-referencing canonical on every page; `trailingSlash` URLs; old GoDaddy URLs
  301-redirected (`public/_redirects`).
- `sitemap.xml` covering every indexable page, with `lastModified`; `robots.txt` pointing
  to it.
- Open Graph and Twitter cards per page, including a generated OG image.
- One `h1` per page and a logical `h2`/`h3` outline. Descriptive internal links ("See the
  downstream itinerary and prices", not "click here").
- Structured data:
  - `TravelAgency` (organisation), `WebSite`.
  - `TouristTrip` with `Offer`s on each trip page.
  - `FAQPage` on pages that show the FAQ.
  - `BreadcrumbList` on every inner page.
  - **No `AggregateRating` / `Review`**: the reviews come from Tripadvisor and Viator,
    and Google doesn't allow self-serving review markup for an organisation's own site
    or for content taken from other sites.
- Core Web Vitals:
  - Static HTML, self-hosted fonts with `display: swap` and fixed fallbacks.
  - No third-party scripts.
  - Images in fixed-ratio frames (no CLS), `loading="lazy"` below the fold and
    `priority` only on the hero.
- **No hreflang**: the site is English only. Opportunity: several pages that rank for the
  route are in French, Dutch or Spanish, and one review listing is on Tripadvisor France.
  A French version would be a natural next step; add `hreflang` then.
