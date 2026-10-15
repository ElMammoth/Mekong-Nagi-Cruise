"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/en";
import { useConsent, useReducedMotion } from "@/lib/consent";

export interface TikTokCardData {
  id: string;
  handle: string;
  url: string;
  caption?: string;
  captionLang: string;
}

type Copy = Messages["tiktok"];

/** The player mounts this far ahead of the viewport, so it's ready when it scrolls in. */
const MOUNT_MARGIN = "600px";
/** Share of the player that must be on screen for it to play. */
const PLAY_THRESHOLD = 0.6;
/** An autoplaying player that hasn't reported "ready" by then is treated as blocked. */
const READY_TIMEOUT_MS = 25000;
const PLAYER = "https://www.tiktok.com/player/v1/";

/**
 * TikTok's official embed player (developers.tiktok.com/doc/embed-player). Supported query
 * parameters only: loop, autoplay, controls, volume_control… Starting muted is TikTok's own
 * autoplay behaviour (the player reports onMute: true); `muted=1` is NOT used because it
 * also locks the volume, and visitors must be able to turn sound on.
 */
function playerUrl(id: string, autoplay: boolean) {
  const params = new URLSearchParams({
    loop: "1",
    autoplay: autoplay ? "1" : "0",
    controls: "1",
    volume_control: "1",
    play_button: "1",
    progress_bar: "1",
    fullscreen_button: "1",
    timestamp: "0",
    closed_caption: "1",
    music_info: "0",
    description: "0",
    rel: "0",
  });
  return `${PLAYER}${id}?${params}`;
}

/** Visibility steps reported by each player, so the most visible one can be found. */
const RATIOS = [0, 0.25, 0.5, PLAY_THRESHOLD, 0.75, 0.9, 1];
/** A "playing" event this long after our own command (or after load) is ours, not the visitor's. */
const OWN_COMMAND_MS = 1500;

interface PlayerControls {
  play(): void;
  pause(): void;
}

/**
 * Only one video plays at a time: the most visible one (at least PLAY_THRESHOLD on screen,
 * ties go to the first in the list). When another becomes the most visible, the previous one
 * pauses. If the visitor starts a video themselves, it becomes the active one and the others
 * pause. With reduced motion nothing starts on scroll; the one-at-a-time rule still applies
 * to videos the visitor starts.
 */
function createAutoplay(order: readonly string[]) {
  const ratios = new Map<string, number>();
  const players = new Map<string, PlayerControls>();
  let active: string | null = null;
  let scrollDriven = true;

  const switchTo = (next: string | null) => {
    if (next === active) return;
    const previous = active;
    active = next;
    if (previous) players.get(previous)?.pause();
    if (next) players.get(next)?.play();
  };
  const mostVisible = () => {
    let best: string | null = null;
    let bestRatio = PLAY_THRESHOLD;
    for (const id of order) {
      const ratio = ratios.get(id) ?? 0;
      if (ratio > bestRatio || (best === null && ratio >= bestRatio)) {
        best = id;
        bestRatio = ratio;
      }
    }
    return best;
  };

  return {
    setScrollDriven(value: boolean) {
      scrollDriven = value;
    },
    register(id: string, controls: PlayerControls) {
      players.set(id, controls);
      return () => {
        players.delete(id);
        ratios.delete(id);
        if (active === id) active = null;
      };
    },
    report(id: string, ratio: number) {
      ratios.set(id, ratio);
      if (scrollDriven) switchTo(mostVisible());
    },
    /** The visitor pressed play on this one. */
    claim(id: string) {
      switchTo(id);
    },
    isActive(id: string) {
      return active === id;
    },
  };
}

type Autoplay = ReturnType<typeof createAutoplay>;

/** Messages to the player (its postMessage API). */
function command(frame: HTMLIFrameElement | null, type: "play" | "pause") {
  frame?.contentWindow?.postMessage({ type, "x-tiktok-player": true }, "https://www.tiktok.com");
}

/**
 * One video. The iframe mounts only when the card comes near the viewport. It plays only
 * while it is the most visible video (see createAutoplay), muted until the visitor turns
 * the sound on, and pauses otherwise. With reduced motion it never autoplays.
 * TikTok errors (deleted/private video, embedding off) or a blocked player fall back to the
 * link card.
 */
function Player({
  video,
  copy,
  reduceMotion,
  autoplay,
  onFail,
}: {
  video: TikTokCardData;
  copy: Copy;
  reduceMotion: boolean;
  autoplay: Autoplay;
  onFail: (id: string) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const ready = useRef(false);
  /** Time of our last play/pause command (or of load), to tell the visitor's clicks apart. */
  const lastCommand = useRef(0);

  useEffect(() => {
    const send = (type: "play" | "pause") => {
      if (!ready.current) return; // on ready, the player asks whether it is active
      lastCommand.current = Date.now();
      command(frameRef.current, type);
    };
    return autoplay.register(video.id, { play: () => send("play"), pause: () => send("pause") });
  }, [autoplay, video.id]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          near.disconnect();
        }
      },
      { rootMargin: MOUNT_MARGIN },
    );
    const visible = new IntersectionObserver(
      ([entry]) => autoplay.report(video.id, entry?.isIntersecting ? entry.intersectionRatio : 0),
      { threshold: RATIOS },
    );
    near.observe(box);
    visible.observe(box);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [autoplay, video.id]);

  useEffect(() => {
    if (!mounted) return;
    lastCommand.current = Date.now();
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      type PlayerMessage = {
        type?: string;
        value?: number | { errorCode?: number };
        "x-tiktok-player"?: boolean;
      };
      let data = event.data as PlayerMessage | string;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data) as PlayerMessage;
        } catch {
          return;
        }
      }
      if (typeof data !== "object" || !data?.["x-tiktok-player"]) return;
      if (data.type === "onPlayerReady") {
        ready.current = true;
        lastCommand.current = Date.now();
        // Autoplay starts every player; keep only the active one going.
        if (!reduceMotion && autoplay.isActive(video.id)) command(frameRef.current, "play");
        else if (!reduceMotion) command(frameRef.current, "pause");
      } else if (
        data.type === "onStateChange" &&
        data.value === 1 &&
        Date.now() - lastCommand.current > OWN_COMMAND_MS &&
        !autoplay.isActive(video.id)
      ) {
        // The visitor started this one: it becomes the only one playing.
        autoplay.claim(video.id);
      } else if (data.type === "onPlayerError") {
        // 1001: no such video (deleted, private, embedding off); 2001: TikTok server error.
        // Playback (3001) and autoplay (3002) errors keep the player: TikTok shows its own
        // retry and the visitor can press play.
        const code = typeof data.value === "object" ? data.value?.errorCode : undefined;
        if (code === 1001 || code === 2001) onFail(video.id);
      }
    };
    window.addEventListener("message", onMessage);
    // Autoplaying players announce themselves; silence means TikTok is blocked.
    const timer = reduceMotion
      ? undefined
      : window.setTimeout(() => {
          if (!ready.current) onFail(video.id);
        }, READY_TIMEOUT_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      if (timer) window.clearTimeout(timer);
    };
  }, [mounted, reduceMotion, autoplay, onFail, video.id]);

  return (
    <figure>
      {/* Reserved 9:16 frame: the player fills it, nothing moves when it loads. */}
      <div
        ref={boxRef}
        className="relative aspect-9/16 w-full overflow-hidden rounded-md bg-primary shadow-md"
      >
        {mounted ? (
          <iframe
            ref={frameRef}
            src={playerUrl(video.id, !reduceMotion)}
            title={fmt(copy.videoTitle, { handle: video.handle })}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0"
          />
        ) : null}
      </div>
      <figcaption className="mt-3 text-sm">
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-6 items-center gap-1.5 rounded-sm font-display text-heading underline-offset-4 hover:underline"
        >
          @{video.handle}
          <ExternalLink aria-hidden="true" className="size-3.5 text-muted" />
          <span className="sr-only">{copy.watchOn}</span>
        </a>
        {video.caption ? (
          <span lang={video.captionLang} className="mt-1 line-clamp-2 break-words text-muted">
            {video.caption}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** Without TikTok (rejected, not chosen yet, or unavailable): the handle and a link. */
function LinkCard({ video, copy }: { video: TikTokCardData; copy: Copy }) {
  const { m } = useI18n();
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-11 items-center gap-3 rounded-md border border-line bg-surface p-4 text-sm transition-colors duration-fast hover:border-primary"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-sm bg-surface-tint text-primary"
      >
        <Play className="size-4" fill="currentColor" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-heading">@{video.handle}</span>
        <span className="flex items-center gap-1 text-primary">
          {copy.watchOn}
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </span>
      </span>
      <span className="sr-only">{m.common.opensNewTab}</span>
    </a>
  );
}

/**
 * The TikTok videos: a snap-scroll row on small screens, a four-column grid from `lg`, on
 * the section's own background. Nothing from TikTok is requested until the visitor has
 * accepted TikTok videos in the consent banner; until then (and if they refuse) each video is
 * a small link card.
 */
export function TikTokVideos({ videos, copy }: { videos: TikTokCardData[]; copy: Copy }) {
  const consent = useConsent();
  const reduceMotion = useReducedMotion();
  const [autoplay] = useState(() => createAutoplay(videos.map((v) => v.id)));
  useEffect(() => autoplay.setScrollDriven(!reduceMotion), [autoplay, reduceMotion]);
  const [failed, setFailed] = useState<Record<string, true>>({});
  const onFail = useCallback(
    (id: string) => setFailed((f) => (f[id] ? f : { ...f, [id]: true })),
    [],
  );
  const players = consent.tiktok;

  return (
    <div data-reveal className="mt-10">
      {/* Focusable so the row can be scrolled with the keyboard on small screens. */}
      <div
        role="region"
        aria-label={copy.rowLabel}
        tabIndex={0}
        className="relative -mx-gutter overflow-x-auto px-gutter pt-1 pb-4 focus-visible:outline-offset-4 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <ul className="flex snap-x snap-mandatory scroll-px-gutter gap-4 lg:grid lg:grid-cols-4 lg:gap-6">
          {videos.map((video) => (
            <li key={video.id} className="w-tiktok shrink-0 snap-start lg:w-auto">
              {players && !failed[video.id] ? (
                <Player
                  video={video}
                  copy={copy}
                  reduceMotion={reduceMotion}
                  autoplay={autoplay}
                  onFail={onFail}
                />
              ) : (
                <LinkCard video={video} copy={copy} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
