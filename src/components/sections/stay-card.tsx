import { ExternalLink, Mail } from "lucide-react";
import type { Stay } from "@/content/types";

export function StayCard({ stay, price }: { stay: Stay; price?: string }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-silt bg-paper p-6 shadow-card">
      <p className="text-sm font-semibold tracking-[0.12em] text-lantern uppercase">
        {stay.place} · {stay.tier}
      </p>
      <h3 className="mt-2 text-h3">{stay.name}</h3>
      <p className="mt-3 text-muted">{stay.description}</p>
      <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
        {stay.facts.map((fact) => (
          <li key={fact} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-vermilion"
            />
            {fact}
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-2 pt-5">
        {price ? (
          <p className="border-t border-silt pt-4 text-[0.9375rem]">
            <span className="text-muted">Cruise package </span>
            <span className="font-semibold text-maroon">{price}</span>
            <span className="text-muted"> per person</span>
          </p>
        ) : null}
        {stay.url ? (
          <a
            href={stay.url}
            className="inline-flex items-center gap-1.5 font-semibold text-lantern hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Hotel website
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
        {stay.contact ? (
          <a
            href={`mailto:${stay.contact}`}
            className="inline-flex items-center gap-1.5 font-semibold break-all text-lantern hover:underline"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {stay.contact}
          </a>
        ) : null}
      </div>
    </article>
  );
}
