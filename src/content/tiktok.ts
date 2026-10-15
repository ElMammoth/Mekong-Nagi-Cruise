import type { TikTokVideo } from "./types";

/**
 * TikTok videos in which travellers talk about Nagi of Mekong. Social proof, not rated
 * reviews: they never count towards the review scores and are not marked up as Review or
 * AggregateRating structured data.
 *
 * Rules:
 * 1. Clean URL only: https://www.tiktok.com/@handle/video/<id>, without tracking
 *    parameters (is_from_webapp, sender_device, web_id…).
 * 2. The creator's name and caption come from TikTok's official oEmbed endpoint
 *    (`npm run tiktok`, run before every build; result in tiktok.generated.json). They are
 *    shown verbatim and never edited, translated or shortened.
 * 3. Videos are never downloaded or re-hosted, and thumbnails are not used (TikTok's
 *    thumbnail links expire): each card is a neutral placeholder that loads TikTok's
 *    official embed only after a click.
 */
export const tiktokVideos: TikTokVideo[] = [
  {
    id: "7658257519000685856",
    handle: "hallidaywithkate",
    url: "https://www.tiktok.com/@hallidaywithkate/video/7658257519000685856",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7563258861843451158",
    handle: "bel.mcdonald",
    url: "https://www.tiktok.com/@bel.mcdonald/video/7563258861843451158",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7604572531583962390",
    handle: "maia.dsouza",
    url: "https://www.tiktok.com/@maia.dsouza/video/7604572531583962390",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7564381672314080534",
    handle: "martinavegexplorer",
    url: "https://www.tiktok.com/@martinavegexplorer/video/7564381672314080534",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7445699020590222624",
    handle: "harrietbinningtonn",
    url: "https://www.tiktok.com/@harrietbinningtonn/video/7445699020590222624",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7446389618494164257",
    handle: "josh.snaith11",
    url: "https://www.tiktok.com/@josh.snaith11/video/7446389618494164257",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7692484457000979715",
    handle: "builtby.em",
    url: "https://www.tiktok.com/@builtby.em/video/7692484457000979715",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
  {
    id: "7293825000690289952",
    handle: "tr4velwithmel",
    url: "https://www.tiktok.com/@tr4velwithmel/video/7293825000690289952",
    retrievedAt: "2026-10-15",
    captionLang: "en",
  },
];

/**
 * A "View more on TikTok" link (a hashtag or profile page). Left empty on purpose: set it
 * only to a real URL the owner provides, and the link appears under the videos.
 */
export const tiktokMoreUrl: string | null = null;
