import { ExternalLink } from "lucide-react";
import generated from "@/content/tiktok.generated.json";
import { tiktokMoreUrl, tiktokVideos } from "@/content/tiktok";
import { SectionHeading } from "@/components/ui/section-heading";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { getI18n } from "@/i18n/server";
import { formatIsoDate } from "@/lib/departures";
import { TikTokCard, type TikTokCardData } from "./tiktok-card";

type Generated = Record<string, { authorName: string; caption: string; fetchedAt: string }>;

/**
 * "What travellers say on TikTok": real creators' videos, shown as click-to-load facades.
 * Social proof only: kept apart from the review scores and from structured data.
 * The heading, intro and captions are in the static HTML; TikTok loads nothing until a click.
 */
export function TikTokSection({ id = "tiktok-title" }: { id?: string }) {
  const { locale, m } = getI18n();
  const copy = m.tiktok;
  const data = generated as Generated;
  const videos: TikTokCardData[] = tiktokVideos.map((v) => ({
    id: v.id,
    handle: v.handle,
    url: v.url,
    captionLang: v.captionLang,
    authorName: data[v.id]?.authorName,
    caption: data[v.id]?.caption,
  }));
  const copied = Object.values(data)
    .map((d) => d.fetchedAt)
    .sort()
    .at(-1);

  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <ul className="relative -mx-gutter mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 sm:mx-0 sm:px-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 lg:gap-6">
        {videos.map((video) => (
          <li key={video.id} className="w-64 shrink-0 snap-start md:w-auto">
            <TikTokCard video={video} copy={copy} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        {copied ? (
          <p>{fmt(copy.retrieved, { date: formatIsoDate(copied, localeInfo[locale].intl) })}</p>
        ) : null}
        {tiktokMoreUrl ? (
          <a
            href={tiktokMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-primary underline-offset-4 hover:underline"
          >
            {copy.watchOn}
            <ExternalLink aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{m.common.opensNewTab}</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
