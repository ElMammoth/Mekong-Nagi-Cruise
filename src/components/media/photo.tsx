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
      className={cn("relative overflow-hidden rounded-md bg-surface-tint", className)}
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
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-control p-4 text-center text-primary"
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full text-line"
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
      <p className="relative font-display text-eyebrow uppercase">
        Photo · {photo.ratio.replace("/", ":")}
      </p>
      <p className="relative max-w-note text-sm leading-snug">{photo.alt}</p>
      <p className="relative text-micro break-all">photos/{photo.file}.jpg</p>
    </div>
  );
}
