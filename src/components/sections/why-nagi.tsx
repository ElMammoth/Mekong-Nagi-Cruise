import { Hotel, LifeBuoy, ReceiptText } from "lucide-react";
import { Price } from "@/components/currency/price";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { getTripData } from "@/content/trips";
import { getI18n } from "@/i18n/server";
import { interpolate } from "@/i18n/rich";
import { fromPriceUsd } from "@/lib/currency";
import { availableOptions } from "@/lib/departures";

const icons = [Hotel, LifeBuoy, ReceiptText];

/**
 * "Why Nagi of Mekong", after the Sparkdesign template's "why" section (docs/08): a split
 * heading and three short claims. The claims follow the offer brief (docs/04 §2–3, §8):
 * door to door (effort ↓), someone with you both days (likelihood ↑), prices up front
 * (risk ↓). Each has a proof line made of published facts, with no superlatives and no claims
 * about other boats.
 */
export function WhyNagi({ id = "why-title" }: { id?: string }) {
  const { m } = getI18n();
  const copy = m.why;
  const from = fromPriceUsd(availableOptions(getTripData("downstream")?.options ?? []));
  const price = from ? <Price usd={from} className="text-heading" /> : null;

  return (
    <section aria-labelledby={id} className="py-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div data-reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={id} className="text-h2">
              {copy.title}
            </h2>
          </div>
          <p data-reveal className="max-w-xl text-lead text-muted">
            {copy.intro}
          </p>
        </div>
        <ul data-reveal="group" className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.points.map((point, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <li
                key={point.title}
                className="flex flex-col rounded-md border border-line bg-surface p-6 shadow-sm sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-sm bg-surface-tint text-primary"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-h3">{point.title}</h3>
                <p className="mt-2 mb-6 text-muted">{point.text}</p>
                <p className="mt-auto border-t border-line pt-4 text-sm text-ink">
                  {interpolate(point.proof, { price })}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
