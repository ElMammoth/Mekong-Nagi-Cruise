import { Check, Minus } from "lucide-react";

export function Included({
  included,
  notIncluded,
}: {
  included: readonly string[];
  notIncluded: readonly string[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="font-sans text-base font-semibold tracking-[0.12em] text-river uppercase">
          Included
        </h3>
        <ul className="mt-4 space-y-3">
          {included.map((item) => (
            <li key={item} className="flex gap-3">
              <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-river" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {notIncluded.length ? (
        <div>
          <h3 className="font-sans text-base font-semibold tracking-[0.12em] text-muted uppercase">
            Not included
          </h3>
          <ul className="mt-4 space-y-3">
            {notIncluded.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <Minus aria-hidden="true" className="mt-1 size-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
