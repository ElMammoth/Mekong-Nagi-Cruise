import { ExternalLink, Mail } from "lucide-react";
import { DualPrice } from "@/components/currency/price";
import type { Stay } from "@/content/types";
import { getI18n } from "@/i18n/server";

/** A hotel or stay; `priceUsd` is the downstream package price that includes it. */
export function StayCard({ stay, priceUsd }: { stay: Stay; priceUsd?: number }) {
  const { m } = getI18n();
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-surface p-6 shadow-sm">
      <p className="font-display text-eyebrow text-primary uppercase">
        {stay.place} · {stay.tier}
      </p>
      <h3 className="mt-2 text-h3">{stay.name}</h3>
      <p className="mt-3 text-muted">{stay.description}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {stay.facts.map((fact) => (
          <li key={fact} className="flex gap-2">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-xs bg-accent" />
            {fact}
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-2 pt-5">
        {priceUsd ? (
          <p className="border-t border-line pt-4 text-sm">
            <span className="text-muted">{m.whereToStay.cruisePackage} </span>
            <DualPrice
              usd={priceUsd}
              mainClassName="text-heading"
              secondaryClassName="text-muted"
            />
            <span className="text-muted"> {m.common.perPerson}</span>
          </p>
        ) : null}
        {stay.url ? (
          <a
            href={stay.url}
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {m.whereToStay.hotelWebsite}
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">{m.common.opensNewTab}</span>
          </a>
        ) : null}
        {stay.contact ? (
          <a
            href={`mailto:${stay.contact}`}
            className="inline-flex items-center gap-1.5 break-all text-primary hover:underline"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {stay.contact}
          </a>
        ) : null}
      </div>
    </article>
  );
}
