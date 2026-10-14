# 06 · Shot list

Every photo slot on the site, with its file name and frame. The source of truth is
`src/content/photos.ts`: change a slot there and this list should follow.

**How to deliver**

- Save each photo as `photos/<file name>.jpg` (or PNG/WebP/AVIF/TIFF). The site resizes it,
  converts it to WebP and shows it on the next `npm run build`.
- Shoot or crop to the ratio shown. The frame is fixed, so the photo is centre-cropped to
  fit. Keep the subject in the middle two thirds.
- Use at least 1920 px on the long side, sRGB, with no text or watermarks on the image.
- Check the alt text in `src/content/photos.ts` against your photo. If the photo shows
  something else, update `alt`.
- Get permission from anyone recognisable, especially in villages, and never photograph
  children without a parent's consent. Only use photos you own or have licensed.

| #   | Slot        | File name                                          | Ratio | Where it appears                    | Brief                                                                                    |
| --- | ----------- | -------------------------------------------------- | ----- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Hero        | `nagi-of-mekong-boat-cruising-the-mekong`          | 4:3   | Home hero (first thing people see)  | The boat in full, side-on, on the river with hills behind. Morning light.                |
| 2   | Journey     | `mekong-riverbanks-between-houay-xai-and-pak-beng` | 3:2   | Home "Two days on the river", guide | Landscape from on board: river, sandbanks, hills. No people needed.                      |
| 3   | Journey     | `pak-ou-cave-buddha-images`                        | 3:2   | Home journey, guide                 | Inside Pak Ou cave: the many Buddha images, natural light from the entrance.             |
| 4   | Journey     | `arriving-in-pak-beng-afternoon`                   | 3:2   | Reserved (Pak Beng)                 | Arrival at Pak Beng pier, late-afternoon light, guests stepping off.                     |
| 5   | Villages    | `riverside-village-stop-on-the-mekong`             | 3:2   | Home journey                        | Guests on the village path with the host. Ask permission before photographing residents. |
| 6   | Boat        | `nagi-of-mekong-boat-at-the-pier`                  | 3:2   | Downstream cruise header            | The whole boat at the pier, bow three-quarter view, clean deck.                          |
| 7   | Boat        | `nagi-of-mekong-boat-seats-and-tables`             | 4:3   | Home "On board"                     | Interior from the bow looking aft: seats, tables, open windows, a few relaxed guests.    |
| 8   | Food        | `freshly-cooked-lunch-on-board`                    | 4:3   | Home "On board"                     | The lunch buffet laid out on board, top-down or at 45°, river in the background.         |
| 9   | Team        | `english-speaking-host-with-guests`                | 4:3   | Home "On board"                     | The host with guests, natural and smiling, on deck.                                      |
| 10  | Team        | `nagi-of-mekong-crew-at-the-pier`                  | 4:3   | Home "On board"                     | Group photo of the crew and host in front of the boat.                                   |
| 11  | Trip header | `luang-prabang-pier-early-morning`                 | 3:2   | Upstream cruise header              | The boat at the Luang Prabang pier at dawn, guests boarding.                             |
| 12  | Trip header | `white-temple-chiang-rai`                          | 3:2   | Chiang Mai land & cruise header     | The White Temple, a stop on day 3 of the program (licensed stock is fine).               |
| 13  | Trip header | `nan-temple-and-old-town`                          | 3:2   | Nan → Luang Prabang header          | One of Nan's temples visited on day 1 (licensed stock is fine).                          |
| 14  | Charters    | `private-group-on-board`                           | 3:2   | Private charters header             | The boat set up for a group (theatre or classroom style), people engaged.                |

**Priorities:** 1, 6, 7, 8 and 9 first. They show the boat, the comfort, the food and the
people that the offer promises. The old site's gallery was behind a sign-in, so these
photos will be the first public proof of them.
