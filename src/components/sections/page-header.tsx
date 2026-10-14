import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/layout/json-ld";
import { Photo, isPhotoShown } from "@/components/media/photo";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import type { PhotoSlot } from "@/content/types";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { RouteLabel } from "@/components/ui/route-label";

interface Crumb {
  href: string;
  label: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
  photo,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  /** Trail after "Home". The last crumb is the current page. Also emitted as BreadcrumbList. */
  crumbs?: Crumb[];
  photo?: PhotoSlot;
  children?: ReactNode;
}) {
  const withPhoto = photo && isPhotoShown(photo);
  return (
    <div className="border-b border-line bg-surface-subtle">
      {crumbs.length ? <JsonLd data={breadcrumbJsonLd(crumbs)} /> : null}
      <Container className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-primary hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-4" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      <RouteLabel text={c.label} />
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-primary hover:underline">
                      <RouteLabel text={c.label} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={cn(withPhoto && "grid items-center gap-10 lg:grid-cols-media lg:gap-14")}>
          <div className="max-w-3xl min-w-0">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-h1">{title}</h1>
            {intro ? <div className="mt-5 text-lead text-muted">{intro}</div> : null}
            {children}
          </div>
          {withPhoto ? <Photo photo={photo} eager sizes="(min-width: 1024px) 40vw, 100vw" /> : null}
        </div>
      </Container>
    </div>
  );
}
