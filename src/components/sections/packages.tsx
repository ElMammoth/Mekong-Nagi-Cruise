import Link from "next/link";
import { Check } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import type { PriceOption, Trip } from "@/content/types";
import { cn } from "@/lib/cn";
import { availableOptions } from "@/lib/departures";
import { formatAmount, formatMoney } from "@/lib/money";

/**
 * Side-by-side package cards (docs/04-offer-brief.md §7): the prescribed default first and
 * highlighted, the upgrade next to it, the downsell last. Prices come from `trip.options`.
 */
export function Packages({
  trip,
  headingLevel: H = "h3",
}: {
  trip: Trip;
  headingLevel?: "h2" | "h3";
}) {
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
      <ul className="grid gap-6 @3xl:grid-cols-3">
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
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-3xl text-heading">
                        {primaryPrice(option)}
                      </span>
                      {secondaryPrice(option) ? (
                        <span className="text-sm text-muted">{secondaryPrice(option)}</span>
                      ) : null}
                    </p>
                    <p className="text-sm text-muted">
                      per person{option.twinShare ? ", twin or double sharing" : ""}
                      {option.singleSupplement
                        ? ` · single supplement ${formatMoney(option.singleSupplement)}`
                        : ""}
                    </p>
                    {option.validTo ? (
                      <p className="mt-1 text-sm text-primary">
                        Offer ends {formatDate(option.validTo)}
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
                href={`/cruises/${trip.slug}/?option=${first.id}#book`}
                className={cn(
                  buttonClasses({ variant: featured ? "cta" : "secondary" }),
                  "mt-7 w-full",
                )}
              >
                Check availability<span className="sr-only">: {pkg.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** USD leads, as in every "From" price; the other published currencies follow, smaller. */
function primaryPrice(option: PriceOption) {
  const usd = option.perPerson.USD;
  return usd !== undefined ? formatAmount(usd, "USD") : formatMoney(option.perPerson);
}

function secondaryPrice(option: PriceOption) {
  if (option.perPerson.USD === undefined) return "";
  const rest = { ...option.perPerson };
  delete rest.USD;
  return formatMoney(rest);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
