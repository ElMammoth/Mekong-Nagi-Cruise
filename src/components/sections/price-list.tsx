import type { PriceOption } from "@/content/types";
import { formatMoney } from "@/lib/money";

export function PriceList({ options }: { options: readonly PriceOption[] }) {
  return (
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
              <p className="mt-1 text-sm text-muted">Valid until {formatDate(option.validTo)}</p>
            ) : option.validFrom ? (
              <p className="mt-1 text-sm text-muted">From {formatDate(option.validFrom)}</p>
            ) : null}
          </div>
          <div className="sm:text-right">
            <p className="font-display text-2xl whitespace-nowrap text-heading">
              {formatMoney(option.perPerson)}
            </p>
            <p className="text-sm text-muted">
              per person{option.twinShare ? ", twin or double sharing" : ""}
            </p>
            {option.singleSupplement ? (
              <p className="mt-1 text-sm text-muted">
                Single supplement {formatMoney(option.singleSupplement)}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
