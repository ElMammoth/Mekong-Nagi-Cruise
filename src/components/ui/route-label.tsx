"use client";

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/client";

/**
 * "Houay Xai → Luang Prabang" with the arrow drawn as an icon: the two site fonts don't
 * include "→", and an icon avoids falling back to a third font. Screen readers hear the
 * page language's word for "to".
 */
export function RouteLabel({ text, className }: { text: string; className?: string }) {
  const { m } = useI18n();
  const parts = text.split(/\s*→\s*/);
  return (
    <span className={className}>
      {parts.map((part, i) => (
        <Fragment key={`${part}-${i}`}>
          {i > 0 ? (
            <>
              <ArrowRight aria-hidden="true" className="mx-1 inline size-4 align-middle" />
              <span className="sr-only">{m.common.routeTo} </span>
            </>
          ) : null}
          {part}
        </Fragment>
      ))}
    </span>
  );
}

/** Plain-text version for places that can't hold an icon (select options, messages). */
export function routeText(text: string, to = "to") {
  return text.replace(/\s*→\s*/g, ` ${to} `);
}
