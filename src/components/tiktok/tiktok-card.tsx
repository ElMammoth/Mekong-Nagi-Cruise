"use client";

import { useEffect, useId, useState } from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import { ExternalLink, Play, X } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/en";
import { cn } from "@/lib/cn";

export interface TikTokCardData {
  id: string;
  handle: string;
  url: string;
  authorName?: string;
  caption?: string;
  captionLang: string;
}

const EMBED_SCRIPT = "https://www.tiktok.com/embed.js";
const SCRIPT_ID = "tiktok-embed-js";

/**
 * Loads TikTok's official embed script. Only ever called after a click (never on page load);
 * re-inserted for each video because the script converts the embeds present when it runs.
 */
function loadEmbedScript() {
  document.getElementById(SCRIPT_ID)?.remove();
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = EMBED_SCRIPT;
  script.async = true;
  document.body.appendChild(script);
}

/** Long captions are clamped to a few lines (still complete in the HTML) with a toggle. */
const LONG_CAPTION = 140;

/**
 * One video: a lightweight 9:16 facade (handle, play button, privacy note) that opens a
 * dialog holding TikTok's official embed markup. Nothing from TikTok loads until the click.
 */
export function TikTokCard({ video, copy }: { video: TikTokCardData; copy: Messages["tiktok"] }) {
  const { m } = useI18n();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handle = `@${video.handle}`;

  useEffect(() => {
    if (open) loadEmbedScript();
  }, [open]);

  return (
    <article className="relative flex h-full flex-col rounded-md border border-line bg-surface p-3 shadow-sm">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          aria-label={fmt(copy.play, { handle: video.handle })}
          aria-describedby={`${id}-privacy`}
          className="group relative flex aspect-9/16 w-full flex-col items-center justify-center overflow-hidden rounded-sm border border-line bg-surface-tint text-heading"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 90 160"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full text-line"
            fill="none"
          >
            <path
              d="M-10 120 C 20 100, 40 140, 60 115 S 90 90, 100 100"
              stroke="currentColor"
              strokeWidth="18"
              strokeLinecap="round"
            />
          </svg>
          <span className="relative grid size-14 place-items-center rounded-md bg-accent text-on-accent shadow-md transition-colors duration-fast group-hover:bg-accent-hover">
            <Play aria-hidden="true" className="size-6" fill="currentColor" />
          </span>
          <span className="relative mt-4 max-w-full truncate px-3 font-display text-sm">
            {handle}
          </span>
          <span
            id={`${id}-privacy`}
            className="absolute inset-x-0 bottom-0 border-t border-line bg-surface px-3 py-2 text-left text-xs text-muted"
          >
            {copy.privacy}
          </span>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-primary/60 data-[state=open]:animate-rise" />
          <Dialog.Content className="fixed inset-2 z-50 m-auto h-fit max-h-full max-w-embed overflow-y-auto rounded-md bg-surface p-3 shadow-lg focus:outline-none data-[state=open]:animate-rise sm:inset-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="font-display text-base text-heading">
                {fmt(copy.dialogTitle, { handle: video.handle })}
              </Dialog.Title>
              <Dialog.Close className="-m-2 grid size-11 shrink-0 place-items-center rounded-sm text-primary hover:bg-surface-tint">
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">{copy.close}</span>
              </Dialog.Close>
            </div>
            <VisuallyHidden.Root>
              <Dialog.Description>{copy.dialogDescription}</Dialog.Description>
            </VisuallyHidden.Root>
            {/* TikTok's official embed markup (as returned by oEmbed), filled in by embed.js. */}
            <div className="mt-3 min-h-embed">
              <blockquote
                className="tiktok-embed"
                cite={video.url}
                data-video-id={video.id}
                data-embed-from="oembed"
              >
                <section>
                  <p className="py-10 text-center text-muted">{copy.loading}</p>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="sr-only">
                    {handle}
                  </a>
                </section>
              </blockquote>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex flex-1 flex-col pt-3">
        <p className="font-display text-sm text-heading">
          {video.authorName && video.authorName !== video.handle ? (
            <>
              {video.authorName} <span className="font-sans text-muted">{handle}</span>
            </>
          ) : (
            handle
          )}
        </p>
        {video.caption ? (
          <>
            <p
              id={`${id}-caption`}
              lang={video.captionLang}
              className={cn(
                "mt-1 text-sm break-words text-ink",
                !expanded && video.caption.length > LONG_CAPTION && "line-clamp-4",
              )}
            >
              <span className="sr-only">{fmt(copy.captionLabel, { handle: video.handle })} </span>
              {video.caption}
            </p>
            {video.caption.length > LONG_CAPTION ? (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${id}-caption`}
                onClick={() => setExpanded((e) => !e)}
                className="mt-1 inline-flex min-h-6 items-center self-start rounded-sm text-sm text-primary underline-offset-4 hover:underline"
              >
                {expanded ? copy.showLess : copy.showMore}
              </button>
            ) : null}
          </>
        ) : (
          <p className="mt-1 text-sm text-muted">{copy.placeholder}</p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm pt-3 text-sm text-primary underline-offset-4 hover:underline"
        >
          {copy.watchOn}
          <span className="inline-flex items-center gap-1 text-muted">
            · {copy.opensTikTok}
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </span>
          <span className="sr-only">{m.common.opensNewTab}</span>
        </a>
      </div>
    </article>
  );
}
