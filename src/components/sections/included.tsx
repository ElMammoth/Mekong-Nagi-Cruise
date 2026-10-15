import { Check, Minus } from "lucide-react";
import { RouteLabel } from "@/components/ui/route-label";
import { getI18n } from "@/i18n/server";

export function Included({
  included,
  notIncluded,
}: {
  included: readonly string[];
  notIncluded: readonly string[];
}) {
  const { m } = getI18n();
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-eyebrow text-heading uppercase">{m.common.included}</h3>
        <ul className="mt-4 space-y-3">
          {included.map((item) => (
            <li key={item} className="flex gap-3">
              <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
              <RouteLabel text={item} />
            </li>
          ))}
        </ul>
      </div>
      {notIncluded.length ? (
        <div>
          <h3 className="text-eyebrow text-muted uppercase">{m.common.notIncluded}</h3>
          <ul className="mt-4 space-y-3">
            {notIncluded.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <Minus aria-hidden="true" className="mt-1 size-5 shrink-0" />
                <RouteLabel text={item} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
