"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { BoatMark } from "@/components/brand/boat-mark";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RouteLabel } from "@/components/ui/route-label";
import { bookingHref, bookingLabel, cruiseLinks, primaryLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";

/* Shared look for top-level items: text link with a token underline when current. */
const itemClass =
  "inline-flex min-h-11 items-center gap-1 rounded-sm px-3 font-display text-sm text-heading transition-colors duration-fast hover:bg-surface-tint data-[active]:text-accent aria-[current=page]:text-accent";

/**
 * Main navigation: Radix NavigationMenu (roving focus, arrow keys, Esc, hover + click),
 * with a shared Viewport so the Cruises panel animates its size, and an Indicator arrow.
 * Below `lg` the Dialog-based MobileNav takes over.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");
  const inCruises = pathname.startsWith("/cruises");

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-canvas"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex h-header items-center justify-between gap-4">
        <Link
          href="/"
          className="-m-1 rounded-sm p-1 text-primary"
          aria-label={`${site.name}, home`}
        >
          <BoatMark title={site.name} className="h-7 w-auto sm:h-8" />
        </Link>

        <NavigationMenu.Root aria-label="Main" className="relative hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(itemClass, "group", inCruises && "text-accent")}
              >
                Cruises
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-base group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 w-full p-2">
                <ul className="grid grid-cols-2 gap-1">
                  {cruiseLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link asChild active={isActive(link.href)}>
                        <Link
                          href={link.href}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className="block rounded-sm p-3 transition-colors duration-fast hover:bg-surface-tint data-[active]:bg-surface-tint"
                        >
                          <span className="block font-display text-base text-heading">
                            <RouteLabel text={link.label} />
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">
                            {link.kind} · {link.duration}
                          </span>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {primaryLinks.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link asChild active={isActive(link.href)}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={itemClass}
                  >
                    {link.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden">
              <span className="relative top-1 size-2.5 rotate-45 rounded-xs border-t border-l border-line bg-surface" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="absolute top-full left-0 flex w-full justify-start pt-2">
            <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-menu overflow-hidden rounded-md border border-line bg-surface shadow-md transition-size data-[state=open]:animate-rise" />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={bookingHref} variant="cta">
              {bookingLabel}
            </ButtonLink>
          </span>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
