import { CurrencyNote, DualPrice, Price } from "@/components/currency/price";
import type { PriceOption } from "@/content/types";
import { localeInfo } from "@/i18n/config";
import { fmt } from "@/i18n/index";
import { interpolate } from "@/i18n/rich";
import { getI18n } from "@/i18n/server";
import { formatIsoDate } from "@/lib/departures";

export function PriceList({ options }: { options: readonly PriceOption[] }) {
  const { locale, m } = getI18n();
  const intl = localeInfo[locale].intl;
  return (
    <div>
      <ul className="divide-y divide-line overflow-hidden rounded-md border border-line bg-surface">
        {options.map((option) => (
          <li
            key={option.id}
            className="grid gap-3 p-5 sm:grid-cols-price sm:items-start sm:gap-8 sm:p-6"
          >
            <div>
              <p className="flex flex-wrap items-center gap-2 font-display text-xl text-heading">
                {option.label}
                {option.badge ? (
                  <span className="rounded-xs bg-accent-soft px-2 py-0.5 font-display text-micro tracking-label text-accent uppercase">
                    {option.badge}
                  </span>
                ) : null}
              </p>
              {option.detail ? <p className="mt-1 text-muted">{option.detail}</p> : null}
              {option.validTo ? (
                <p className="mt-1 text-sm text-muted">
                  {fmt(m.trip.validUntil, { date: formatIsoDate(option.validTo, intl) })}
                </p>
              ) : option.validFrom ? (
                <p className="mt-1 text-sm text-muted">
                  {fmt(m.trip.validFrom, { date: formatIsoDate(option.validFrom, intl) })}
                </p>
              ) : null}
            </div>
            <div className="sm:text-right">
              <p>
                <DualPrice
                  usd={option.usd}
                  className="flex flex-wrap items-baseline gap-x-2 sm:justify-end"
                  mainClassName="font-display text-2xl text-heading"
                  secondaryClassName="text-sm text-muted"
                />
              </p>
              <p className="text-sm text-muted">
                {m.common.perPerson}
                {option.twinShare ? m.trip.twinShare : ""}
              </p>
              {option.singleSupplementUsd ? (
                <p className="mt-1 text-sm text-muted">
                  {interpolate(m.trip.singleSupplement, {
                    price: <Price usd={option.singleSupplementUsd} />,
                  })}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <CurrencyNote className="mt-4" />
    </div>
  );
}
