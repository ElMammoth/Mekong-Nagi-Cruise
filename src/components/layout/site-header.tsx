"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { bookingHref, cruiseLinks, primaryLinks } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";

const linkBase =
  "inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-semibold transition-colors hover:bg-maroon/5 hover:text-maroon";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");
  const inCruises = pathname.startsWith("/cruises");

  return (
    <header className="sticky top-0 z-40 border-b border-silt/70 bg-sand/90 backdrop-blur-md supports-[backdrop-filter]:bg-sand/80">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" className="-m-1 rounded-xl p-1" aria-label="Nagi of Mekong, home">
          <Wordmark />
        </Link>

        <NavigationMenu.Root aria-label="Main" className="relative hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(linkBase, "group gap-1", inCruises ? "text-lantern" : "text-ink")}
              >
                Cruises
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-[min(42rem,90vw)] rounded-card border border-silt bg-paper p-3 shadow-raised data-[motion=from-end]:animate-rise data-[motion=from-start]:animate-rise">
                <ul className="grid grid-cols-2 gap-1">
                  {cruiseLinks.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link asChild active={isActive(link.href)}>
                        <Link
                          href={link.href}
                          className="block rounded-xl p-3 transition-colors hover:bg-sand data-[active]:bg-sand"
                        >
                          <span className="block text-xs font-semibold tracking-[0.12em] text-lantern uppercase">
                            {link.kind} · {link.duration}
                          </span>
                          <span className="mt-1 block font-display text-lg font-semibold text-maroon">
                            {link.label}
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
                    className={cn(linkBase, isActive(link.href) ? "text-lantern" : "text-ink")}
                  >
                    {link.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={bookingHref}>Request a booking</ButtonLink>
          </span>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
