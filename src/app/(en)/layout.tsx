import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/root-document";
import { rootMetadata, rootViewport } from "@/lib/metadata";

/** Root layout for English, the default language, served without a prefix. */
export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
