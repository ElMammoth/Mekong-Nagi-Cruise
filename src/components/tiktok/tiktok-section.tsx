import { ExternalLink } from "lucide-react";
import generated from "@/content/tiktok.generated.json";
import { tiktokMoreUrl, tiktokVideos } from "@/content/tiktok";
import { SectionHeading } from "@/components/ui/section-heading";
import { getI18n } from "@/i18n/server";
import { TikTokVideos, type TikTokCardData } from "./tiktok-videos";

type Generated = Record<string, { authorName: string; caption: string; fetchedAt: string }>;

/**
 * "What travellers say on TikTok": real creators' videos in TikTok's official player.
 * Social proof only: kept apart from the review scores and from structured data.
 * Nothing from TikTok loads before the visitor accepts TikTok videos in the consent banner;
 * the retrieval date of the captions stays in the data files (tiktok.ts, tiktok.generated.json).
 */
export function TikTokSection({ id = "tiktok-title" }: { id?: string }) {
  const { m } = getI18n();
  const copy = m.tiktok;
  const data = generated as Generated;
  const videos: TikTokCardData[] = tiktokVideos.map((v) => ({
    id: v.id,
    handle: v.handle,
    url: v.url,
    captionLang: v.captionLang,
    caption: data[v.id]?.caption,
  }));

  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={copy.eyebrow} title={copy.title} />
      <TikTokVideos videos={videos} copy={copy} />
      {tiktokMoreUrl ? (
        <a
          href={tiktokMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary underline-offset-4 hover:underline"
        >
          {copy.watchOn}
          <ExternalLink aria-hidden="true" className="size-3.5" />
          <span className="sr-only">{m.common.opensNewTab}</span>
        </a>
      ) : null}
    </section>
  );
}
