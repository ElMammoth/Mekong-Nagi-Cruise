import Image from "next/image";
import type { ReactNode } from "react";
import { Camera } from "lucide-react";
import manifest from "@/content/photos.generated.json";
import { showPlaceholders } from "@/content/settings";
import type { PhotoSlot } from "@/content/types";
import { cn } from "@/lib/cn";

type Manifest = Record<string, { width: number; height: number; blurDataURL: string }>;

export function hasPhoto(photo: PhotoSlot) {
  return photo.file in (manifest as Manifest);
}

/** True when the slot will render something (a photo or a visible placeholder). */
export function isPhotoShown(photo: PhotoSlot) {
  return hasPhoto(photo) || showPlaceholders;
}

/**
 * A photo in a fixed-ratio frame, so adding the real photo never shifts the layout.
 * Without a photo it shows a labelled placeholder (while `showPlaceholders` is on),
 * then `fallback`, then nothing.
 */
export function Photo({
  photo,
  sizes,
  eager = false,
  fallback,
  className,
}: {
  photo: PhotoSlot;
  /** e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes: string;
  /** Above-the-fold image (hero): load immediately with high priority. */
  eager?: boolean;
  fallback?: ReactNode;
  className?: string;
}) {
  const entry = (manifest as Manifest)[photo.file];

  if (!entry && !showPlaceholders) return fallback ?? null;

  return (
    <div
      className={cn("relative overflow-hidden rounded-card bg-river-mist", className)}
      style={{ aspectRatio: photo.ratio }}
    >
      {entry ? (
        <Image
          src={`/images/${photo.file}`}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          placeholder="blur"
          blurDataURL={entry.blurDataURL}
          className="object-cover"
        />
      ) : (
        <PhotoPlaceholder photo={photo} />
      )}
    </div>
  );
}

function PhotoPlaceholder({ photo }: { photo: PhotoSlot }) {
  return (
    <div
      aria-hidden="true"
      data-placeholder=""
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-river/25 p-4 text-center text-river"
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full text-river/10"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-10 210 C 80 170, 140 250, 220 200 S 360 140, 410 170"
          stroke="currentColor"
          strokeWidth="28"
          strokeLinecap="round"
        />
      </svg>
      <Camera className="relative size-6" />
      <p className="relative text-xs font-semibold tracking-[0.12em] uppercase">
        Photo · {photo.ratio.replace("/", ":")}
      </p>
      <p className="relative max-w-[18rem] text-sm leading-snug">{photo.alt}</p>
      <p className="relative font-mono text-[0.6875rem] break-all">photos/{photo.file}.jpg</p>
    </div>
  );
}
