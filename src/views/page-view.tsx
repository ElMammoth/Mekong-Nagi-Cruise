import { JsonLd } from "@/components/layout/json-ld";
import type { PageKey, TripSlug } from "@/i18n/routes";
import { getLocale } from "@/i18n/server";
import { pageCopy } from "@/lib/metadata";
import { webPageJsonLd } from "@/lib/structured-data";
import { ChartersView } from "./charters-view";
import { ContactView } from "./contact-view";
import { FaqView } from "./faq-view";
import { GuideView } from "./guide-view";
import { HomeView } from "./home-view";
import { PrivacyView } from "./privacy-view";
import { TripView } from "./trip-view";
import { WhereToStayView } from "./where-to-stay-view";

/** Any page, in the language set for this render (English routes and the prefixed catch-all). */
export function PageView({ page }: { page: PageKey }) {
  const locale = getLocale();
  const { title, description } = pageCopy(locale, page);
  return (
    <>
      <View page={page} />
      <JsonLd data={webPageJsonLd(locale, page, { name: title, description })} />
    </>
  );
}

function View({ page }: { page: PageKey }) {
  if (page.startsWith("trip:")) return <TripView slug={page.slice(5) as TripSlug} />;
  switch (page) {
    case "home":
      return <HomeView />;
    case "whereToStay":
      return <WhereToStayView />;
    case "charters":
      return <ChartersView />;
    case "guide":
      return <GuideView />;
    case "faq":
      return <FaqView />;
    case "contact":
      return <ContactView />;
    case "privacy":
      return <PrivacyView />;
    default:
      return null;
  }
}
