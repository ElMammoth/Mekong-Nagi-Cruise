# 04 · Offer brief: conversion, social proof, SEO

Internal brief. It turns the principles of Alex Hormozi's _$100M Offers_, _$100M Leads_ and
_$100M Money Models_ into decisions for Nagi of Mekong. The books shaped the decisions
below, but none of their text appears on the site. Every fact used still comes from
nagiofmekong.com ([01-content-audit](01-content-audit.md)). Where a principle would need
a fact or policy the operator hasn't published (a guarantee, a referral reward, seat
counts), it is listed under **Owner decisions** and left out of the site.

## 1. Who we sell to, and the problem we solve

**Who.** Independent travellers going between northern Thailand and Luang Prabang. They
have already decided to travel by river and are now choosing _how_. They are short on
local knowledge, not on money: a two-day trip costs US$140–195 per person.

**The problem as they see it.** The trip itself is easy to want. What's hard is the
logistics: getting from a Chiang Khong hotel across the border, paying for a Lao visa on
arrival, finding the right pier, finding lunch and a bed in Pak Beng, and getting from
the Luang Prabang pier into town. Each of these is a small worry. Together they make the
journey feel risky.

**Our angle.** Don't sell "a boat seat". Sell **"Houay Xai to Luang Prabang, handled from
your hotel door to your hotel door"**. Every logistics step above is already included in
the published package. The site's job is to make that visible, step by step.

## 2. The value equation, applied

Value goes up with the result a buyer wants and their belief they'll get it. It goes down
with the time it takes and the effort or sacrifice it costs. We push all four levers using
published facts only.

| Lever                      | What the traveller wants                               | What the site now shows (source fact)                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dream outcome** ↑        | Arrive in Luang Prabang relaxed, having seen the river | Headline promise: two days on the Mekong, from your hotel to your hotel in Luang Prabang. Itinerary highlights: village stops, Pak Ou cave, elephants may be seen (as published).                                 |
| **Perceived likelihood** ↑ | "Will it actually go smoothly?"                        | Reviews with name, source and link (§6); English-speaking host for both days; travel insurance included; life vests for every passenger; 40-seat boat that usually sails with empty seats.                        |
| **Time delay** ↓           | Know quickly that it's sorted                          | "We reply within 24 hours." Next real departure dates shown on the page. A "what happens after you send" strip with three steps.                                                                                  |
| **Effort & sacrifice** ↓   | Not organise anything                                  | A "handled for you" checklist: pick-up, luggage, border and visa help, lunch, Pak Beng hotel, pier-to-hotel transfer. Booking is one pre-filled WhatsApp or email message, with no account and no payment online. |

**Decision:** the hero, the offer section and the booking page each restate _all four_
levers in short form. Section order follows the buyer's questions: what is it → can I
trust it → what's included → what does it cost → how do I book.

## 3. Building the offer from the buyer's problems

We listed every obstacle a traveller faces, then matched each to a published inclusion.
This list becomes the "Handled for you" section. Nothing is added that the operator doesn't
already provide.

| Obstacle                                      | Included solution (published)                                    |
| --------------------------------------------- | ---------------------------------------------------------------- |
| Getting from the hotel to the pier            | Hotel pick-up in Chiang Khong or Houay Xai, transfer to the pier |
| Bags at the border and on the boat            | Luggage handling                                                 |
| Thai–Lao border and visa on arrival           | Help with the border crossing and visa on arrival                |
| "What if something goes wrong?"               | Travel insurance; life vests; English-speaking host both days    |
| Food on a long river day                      | Freshly cooked lunch daily; vegan, vegetarian, halal options     |
| Finding a bed in Pak Beng                     | One night at the hotel you choose, with breakfast                |
| Not missing the highlights                    | Village stops and Pak Ou cave included                           |
| Getting from the Luang Prabang pier into town | Transfer to your hotel                                           |

**Decision:** this is the core of the offer, shown as a two-column "you'd normally sort this
out yourself / we handle it" list on the home page and downstream page. The left column
names the task, not a competitor, so we make no claims about other boats.

## 4. Naming

A good offer name says who it's for, the result, the timeframe and the format. The
operator's own tagline already covers the result ("in comfort and safety"). We add the
time and the format.

- **Core offer:** _"The two-day Mekong cruise, door to door"_. It goes in the hero
  eyebrow, the `<title>` and the OG card. It contains the format (cruise), the timeframe
  (two days), the place (Mekong) and the main differentiator (door to door).
- **Packages** (same boat, different night in Pak Beng). These are plain-English tier
  names built from the source site's own "standard / deluxe" wording:
  - **Cruise only**: the boat, both lunches, stops and transfers; you book Pak Beng.
  - **Cruise + Standard hotel**: everything handled.
  - **Cruise + Deluxe lodge**: Le Grande Pak Beng or Sanctuary Pak Beng Lodge, with a
    pool.
- No "most popular" badge: we have no data to back it. The Standard package is marked
  **"Everything included"**, which is a fact, and becomes the recommended default (see §7).

## 5. Honest scarcity and urgency

Urgency only works if it's true. Fake countdowns or "2 seats left" would break the trust
we're building with real reviews.

| Lever                                               | Use?   | How (fact)                                                                                                  |
| --------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| Limited capacity                                    | Yes    | "40 seats per sailing" near the booking CTA. No live seat counts.                                           |
| Fixed departure days                                | Yes    | Sun · Wed · Fri chips plus the next 3 real dates, e.g. "Next sailings: Fri 16 Oct, Sun 18 Oct, Wed 21 Oct". |
| Seasonal offers                                     | Yes    | Only when an option has `validTo`: "Offer ends 30 September 2026", hidden automatically after that.         |
| Upstream minimum                                    | Yes    | "Needs a minimum number of passengers: ask early". This is a true reason to book ahead.                     |
| Weather window                                      | Info   | "Pak Beng is cold November–January: pack a jacket". This is helpful, not pressure.                          |
| Countdown timers, "X people viewing", "only N left" | **No** | No data behind them.                                                                                        |

## 6. Social proof (reviews)

Proof works best when it sits next to the claim it backs up. The plan:

- **Near the hero:** a rating line per platform (Tripadvisor, Viator). Each shows the
  score, the review count, an "as of" date and a link to the source.
- **Near the offer:** three review cards. Each has the quote exactly as written, the
  reviewer's name as shown on the platform, the date, the source and a "Read on
  Tripadvisor/Viator" link.
- **Near the booking CTA:** a single short review beside the form or the CTA band.
- **Data:** everything lives in `src/content/reviews.ts`. A review or rating counts as
  _verified_ only when `status: "verified"` is set, which needs the source URL, the date
  and the exact text.
  - Placeholders render as a clearly marked dashed box ("Paste a genuine review here")
    and never as fake text.
  - One switch, `showPlaceholders`, controls them. It is on for now so the slots are
    visible. Turn it off before launch and any slot still empty disappears.
- **Structured data:** no `AggregateRating` or `Review` markup. Google's guidelines don't
  allow self-serving review markup for reviews collected on third-party sites. Reviews
  are shown to people, with links back, and not marked up.

The Viator and Tripadvisor pages return a bot challenge (HTTP 403) to automated requests,
so we did not copy any reviews. The owner pastes them in: see the README "Reviews"
section.

## 7. Pricing and upsell structure

| Role                         | Offer                                                                                                                                                                                                    | Where it appears                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Entry price / attraction** | "From US$140": Cruise only                                                                                                                                                                               | Hero, trip cards, sticky price card. A low, true entry point gets the visitor into the offer.                      |
| **Prescribed default**       | Cruise + Standard hotel, US$160                                                                                                                                                                          | Pre-selected in the form; highlighted card labelled "Everything included".                                         |
| **Anchor / upsell**          | Cruise + Deluxe lodge, US$195 (Le Grande or Sanctuary)                                                                                                                                                   | Shown beside the default. The pool and river-view villas are described in concrete terms.                          |
| **Downsell**                 | Cruise only, US$140: the same boat without the hotel                                                                                                                                                     | Kept as the last card, framed as "if you've already booked Pak Beng".                                              |
| **"Can't have X without Y"** | A night in Pak Beng is needed on every downstream trip                                                                                                                                                   | The package cards explain the night is included. Cruise only says plainly that you book your own.                  |
| **Add-ons to ask about**     | Night before in Houay Xai, nights after in Luang Prabang (stays listed on the source site); Chiang Mai tours (land & cruise); premium Pak Beng hotels (upstream); overland plan to Chiang Mai (upstream) | Optional "Also ask us about…" checkboxes in the booking form. They add a line to the message and promise no price. |
| **Bigger package**           | Chiang Mai → Luang Prabang land & cruise, US$455                                                                                                                                                         | Cross-linked from the downstream page: "Starting in Chiang Mai?"                                                   |
| **Single travellers**        | Single supplement shown up front                                                                                                                                                                         | It stays in the estimate, so there are no surprises later.                                                         |

Rules: every price is the published one, the full price is always shown, and an estimate
is always labelled "estimate, confirmed by us".

## 8. Risk reversal

The operator has **not published a guarantee or a cancellation policy**, so we don't
invent one. We use the risk reducers that are true today:

- "Sending a request is free and doesn't commit you. We confirm availability and the final
  price within 24 hours." This describes how the booking form works.
- Travel insurance is included. There are life vests for every passenger. An English-speaking
  host travels with you for both days.

→ **Owner decision A** (see the end of this brief).

## 9. Lead capture and calls to action

The audience is ready to travel but unsure. The best lead magnet _solves a narrow problem
for free_ and makes it obvious who to call next.

- **Lead magnet → a free planning guide** at `/guides/houay-xai-to-luang-prabang/`.
  - It explains how to get from Chiang Khong / Houay Xai to Luang Prabang by river,
    covering departure days, the border and visa basics, the Pak Beng night, what to pack
    and how to start from Chiang Mai or Nan, using site facts only.
  - It's ungated: a static site has no mailing system, and the guide also does the main
    SEO work.
  - Its CTA is a one-tap WhatsApp message.
- **CTA wording: an action plus a reason.**
  - Primary: **"Check availability"** with the micro-copy "Reply within 24 hours". It is
    more accurate and lower-commitment than "Book now", because booking is a request.
  - Secondary: **"Ask on WhatsApp"**.
  - The same labels are used everywhere, so the path is learnable.
- **CTA frequency:** one CTA after every major section on the home and trip pages (hero,
  offer, reviews, FAQ, closing band), plus the sticky mobile bar on trip pages.
- **Booking path:** a home CTA goes **straight to the downstream booking form**
  (`/cruises/downstream/#book`), not to a generic contact page. That saves one step and
  one decision. The contact page keeps the general form.
- **The form:**
  - The package is pre-selected (default above).
  - The next real departure is shown first.
  - A three-step "what happens next" strip sits under the submit buttons: you send → we
    confirm within 24h → we pick you up.

## 10. Copy rules that follow from the above

1. Lead with what the traveller gets, then who it's for, then when.
2. Use concrete nouns from the source (Pak Ou cave, Le Grande Pak Beng, US$160), never
   vague superlatives.
3. Say "your hotel" and "we pick you up": second person and active voice.
4. Every price or rating appears with its unit, currency or date.
5. Make no claim about other operators or the public boat.

## Owner decisions (not built until confirmed)

**A. Guarantee.** Would you honour any of these? Each would be stated on the site.

1. A full refund if an upstream departure is cancelled for lack of passengers.
2. A free date change up to N days before departure.
3. "If we don't reply within 24 hours, …".

**B. Referral.** Would you give a two-sided incentive to past guests who refer friends, for
example a discount for both? It would appear on a "thank you" message and in the email
reply template.

**C. Deposit or payment plan.** How do guests pay today? A published deposit amount
lowers perceived risk and can be shown in the estimate.

**D. Seat counts.** If you can share remaining seats per departure, the site could show
"Few seats left" truthfully. Until then, nothing is shown.
