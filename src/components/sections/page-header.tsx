import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

interface Crumb {
  href: string;
  label: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-silt bg-paper/60">
      <Container className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-lantern hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-4" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-lantern hover:underline">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-h1">{title}</h1>
          {intro ? <div className="mt-5 text-lead text-muted">{intro}</div> : null}
          {children}
        </div>
      </Container>
    </div>
  );
}
