import Link from "next/link";
import { Check } from "lucide-react";
import { DualPrice, Price } from "@/components/currency/price";
import { buttonClasses } from "@/components/ui/button";
import type { PriceOption, Trip } from "@/content/types";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { href, tripKey } from "@/i18n/routes";
import { interpolate } from "@/i18n/rich";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { availableOptions, formatIsoDate } from "@/lib/departures";

/**
 * Side-by-side package cards (docs/04-offer-brief.md §7): the prescribed default first and
 * highlighted, the upgrade next to it, the downsell last. Prices come from `trip.options`,
 * in US dollars with the baht equivalent (or the visitor's currency once chosen).
 */
export function Packages({
  trip,
  headingLevel: H = "h3",
}: {
  trip: Trip;
  headingLevel?: "h2" | "h3";
}) {
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  const options = availableOptions(trip.options);
  const packages = (trip.packages ?? [])
    .map((pkg) => ({
      ...pkg,
      options: pkg.optionIds
        .map((id) => options.find((o) => o.id === id))
        .filter((o): o is PriceOption => Boolean(o)),
    }))
    .filter((pkg) => pkg.options.length > 0);

  return (
    <div className="@container">
      <ul data-reveal="group" className="grid gap-6 @3xl:grid-cols-3">
        {packages.map((pkg) => {
          const featured = Boolean(pkg.highlight);
          const first = pkg.options[0]!;
          return (
            <li
              key={pkg.id}
              className={cn(
                "relative flex flex-col rounded-md border bg-surface p-6 shadow-sm sm:p-7",
                featured ? "border-primary shadow-ring" : "border-line",
              )}
            >
              {pkg.highlight ? (
                <p className="absolute -top-3 left-6 rounded-xs bg-accent px-2 py-1 font-display text-micro tracking-label text-on-accent uppercase">
                  {pkg.highlight}
                </p>
              ) : null}
              <H className="text-h3">{pkg.name}</H>
              <p className="mt-2 text-muted">{pkg.summary}</p>

              <ul className="mt-5 space-y-3 border-y border-line py-5">
                {pkg.options.map((option) => (
                  <li key={option.id}>
                    {pkg.options.length > 1 ? (
                      <p className="flex flex-wrap items-center gap-2 text-ink">
                        {option.label}
                        {option.badge ? (
                          <span className="rounded-xs bg-accent-soft px-2 py-0.5 font-display text-micro tracking-label text-accent uppercase">
                            {option.badge}
                          </span>
                        ) : null}
                      </p>
                    ) : null}
                    <p>
                      <DualPrice
                        usd={option.usd}
                        className="flex flex-wrap items-baseline gap-x-2"
                        mainClassName="font-display text-3xl text-heading"
                        secondaryClassName="text-sm text-muted"
                      />
                    </p>
                    <p className="text-sm text-muted">
                      {m.common.perPerson}
                      {option.twinShare ? m.trip.twinShare : ""}
                      {option.singleSupplementUsd ? (
                        <>
                          {" · "}
                          {interpolate(m.trip.singleSupplementInline, {
                            price: <Price usd={option.singleSupplementUsd} />,
                          })}
                        </>
                      ) : null}
                    </p>
                    {option.validTo ? (
                      <p className="mt-1 text-sm text-primary">
                        {fmt(m.trip.offerEnds, { date: formatIsoDate(option.validTo, intl) })}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href={href(locale, tripKey(trip.slug), {
                  query: { option: first.id },
                  hash: "book",
                })}
                className={cn(
                  buttonClasses({ variant: featured ? "cta" : "secondary" }),
                  "mt-7 w-full",
                )}
              >
                {m.nav.bookingLabel}
                <span className="sr-only">: {pkg.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
