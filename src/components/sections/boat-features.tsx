import { Armchair, LifeBuoy, Soup, UserRound } from "lucide-react";
import { site } from "@/content/site";

const icons = [Armchair, LifeBuoy, Soup, UserRound];

export function BoatFeatures({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {site.boat.map((item, i) => {
        const Icon = icons[i % icons.length]!;
        return (
          <li key={item.title} className="flex gap-4">
            <span
              className={
                tone === "dark"
                  ? "grid size-12 shrink-0 place-items-center rounded-2xl bg-sand/10 text-gold"
                  : "grid size-12 shrink-0 place-items-center rounded-2xl bg-vermilion/10 text-lantern"
              }
            >
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h3 className={tone === "dark" ? "text-h3 text-sand" : "text-h3"}>{item.title}</h3>
              <p className={tone === "dark" ? "mt-2 text-river-mist" : "mt-2 text-muted"}>
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
