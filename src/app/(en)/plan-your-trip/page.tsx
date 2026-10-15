import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageView } from "@/views/page-view";

export const metadata = pageMetadata("en", "faq");

export default function Page() {
  setRequestLocale("en");
  return <PageView page="faq" />;
}
