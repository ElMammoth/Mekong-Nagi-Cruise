# 07 · Translations: what needs a native speaker's review

The site is in English (source, at `/`) and five translations: French (`/fr/`), German
(`/de/`), Spanish (`/es/`), Simplified Chinese (`/zh/`) and Thai (`/th/`). Every
translation was written for this site from the offer brief
([04-offer-brief.md](04-offer-brief.md)): short, concrete, second person, door-to-door
outcome first. None was machine-translated at runtime.

**Status: every translation needs a native review before launch.** The files are
`src/i18n/messages/<code>.ts`. Reviewers can edit the text between quotes only: keep
`{placeholders}`, `<tags>…</tags>` and `{price:cruise-only}` exactly as they are
(`npm test` fails if one goes missing). Place and hotel names stay as they are.

## What to check first (all languages)

1. **Legal and visa wording**: `faq` (Lao visa answer), `faqPage.essentials`,
   `guide.border`, `trips.nan-to-luang-prabang.itinerary[2].note`. These must be exact.
2. **Calls to action**: `nav.bookingLabel`, `common.askOnWhatsApp`, `cta.title`,
   `booking.sendWhatsApp` / `sendEmail`. Short and natural matter more than literal.
3. **Prices and currency notes**: `currency.*`, `switcher.currencyHint`. They must say that
   only US dollars are charged and other amounts are approximate.
4. **The "With us" table** (`handled.rows`) and the **text loop** (`home.loopPhrase`).
5. **Meta titles and descriptions** (`meta.*`, `*.title`, `*.description`, `trips.*.seo`):
   aim for ≤ 60 and ≤ 155 characters, with the search phrase people use in that language.

## Per language

| Language | File    | Choices to confirm                                                                                                                                                                                                                                                                                               |
| -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| French   | `fr.ts` | "vous" throughout. CTA "Vérifier les dates". French spacing (no-break space before : ; ? !) is applied. Slugs: `/fr/croisieres/…`, `/fr/hebergement/`, `/fr/croisiere-privee/`, `/fr/guide/…`, `/fr/preparer-son-voyage/`, `/fr/confidentialite/`.                                                               |
| German   | `de.ts` | Formal "Sie". Many young backpackers expect "du": say if you prefer it. CTA "Verfügbarkeit prüfen". Slugs: `/de/kreuzfahrten/…`, `/de/unterkuenfte/`, `/de/privatcharter/`, `/de/reisefuehrer/…`, `/de/reise-planen/`, `/de/kontakt/`, `/de/datenschutz/`.                                                       |
| Spanish  | `es.ts` | Spain Spanish with "tú" ("vosotros" in "¿Dónde nos recogéis?" and "cuántos viajáis"). For a Latin American audience, change those to "ustedes". CTA "Ver disponibilidad". Slugs: `/es/cruceros/…`, `/es/alojamiento/`, `/es/barco-privado/`, `/es/guia/…`, `/es/planifica-tu-viaje/`, `/es/contacto/`.           |
| Chinese  | `zh.ts` | Simplified Chinese for mainland readers. Place names in Chinese: 会晒 (Houay Xai), 北本 (Pak Beng), 琅勃拉邦, 清孔, 帕乌洞 (Pak Ou cave), 会孔口岸 (Huai Kon), 孟恩 (Muang Ngeun); please confirm the ones your guests use. The small route line under trip titles keeps the Latin names. Slugs stay in English. |
| Thai     | `th.ts` | Neutral polite register, no ค่ะ/ครับ. Place names in Thai (ห้วยทราย, ปากแบ่ง, หลวงพระบาง, ถ้ำติ่ง, ด่านห้วยโก๋น, เมืองเงิน). Dates use the Thai default Buddhist era (e.g. 14 ตุลาคม 2569): say if you prefer the Gregorian year. Slugs stay in English.                                                         |

## Not translated, on purpose

- **Reviews** (Tripadvisor, Viator) and **TikTok captions**: shown verbatim in their
  original language on every version of the site, with a language label on each review.
- The **message sent to the operator** by the booking form stays in English with US dollar
  amounts, plus a "Preferred language" line so the reply can match the visitor.
- **Photo briefs** (`shot` in `src/content/photos.ts`, docs/06-shot-list.md) are for the
  photographer, not visitors. Photo alt text and captions are translated.
- The **404 page** is in English with links to every language's home page (a static file
  can't know the visitor's language).
- The **social card image** (`/opengraph-image`) is in English: the brand fonts have no
  Chinese or Thai glyphs. Its alt text is translated.
