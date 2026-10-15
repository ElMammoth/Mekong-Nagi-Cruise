import { Armchair, LifeBuoy, Soup, UserRound } from "lucide-react";
import { getI18n } from "@/i18n/server";

const icons = [Armchair, LifeBuoy, Soup, UserRound];

export function BoatFeatures({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const { m } = getI18n();
  return (
    <ul data-reveal="group" className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {m.boat.map((item, i) => {
        const Icon = icons[i % icons.length]!;
        return (
          <li key={item.title} className="flex gap-4">
            <span
              className={
                tone === "dark"
                  ? "grid size-12 shrink-0 place-items-center rounded-sm bg-primary-hover text-on-primary"
                  : "grid size-12 shrink-0 place-items-center rounded-sm bg-surface-tint text-primary"
              }
            >
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h3 className={tone === "dark" ? "text-h3 text-on-primary" : "text-h3"}>
                {item.title}
              </h3>
              <p className={tone === "dark" ? "mt-2 text-on-primary-muted" : "mt-2 text-muted"}>
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
