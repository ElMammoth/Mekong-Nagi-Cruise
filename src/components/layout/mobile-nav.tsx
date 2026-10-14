"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { BoatMark } from "@/components/brand/boat-mark";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { RouteLabel } from "@/components/ui/route-label";
import { bookingHref, bookingLabel, cruiseLinks, primaryLinks } from "@/content/navigation";
import { site } from "@/content/site";

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-sm border border-control bg-surface text-primary transition-colors duration-fast hover:bg-surface-tint";

/**
 * Mobile menu on a Radix Dialog: focus is trapped inside, Esc and the close button dismiss
 * it, focus returns to the menu button, and the page behind can't scroll.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={`${iconButton} lg:hidden`} aria-label="Open menu">
        <Menu aria-hidden="true" className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary/40 data-[state=open]:animate-rise" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-canvas shadow-lg focus:outline-none data-[state=open]:animate-rise">
          <VisuallyHidden.Root>
            <Dialog.Title>Menu</Dialog.Title>
            <Dialog.Description>Site navigation and contact options</Dialog.Description>
          </VisuallyHidden.Root>
          <div className="flex h-header items-center justify-between border-b border-line px-gutter">
            <BoatMark title={site.name} className="h-7 w-auto text-primary" />
            <Dialog.Close className={iconButton} aria-label="Close menu">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-gutter py-6">
            <p className="font-display text-eyebrow text-muted uppercase">Cruises</p>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {cruiseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-14 flex-col justify-center rounded-sm py-2"
                  >
                    <span className="font-display text-lg text-heading">
                      <RouteLabel text={link.label} />
                    </span>
                    <span className="text-sm text-muted">
                      {link.kind} · {link.duration}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-1">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-sm font-display text-xl text-heading"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line bg-surface-subtle p-gutter">
            <ButtonLink
              href={bookingHref}
              onClick={close}
              size="lg"
              variant="cta"
              className="w-full"
            >
              {bookingLabel}
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <ButtonAnchor href={site.contact.whatsappHref} variant="secondary">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </ButtonAnchor>
              <ButtonAnchor href={site.contact.phoneHref} variant="secondary">
                <Phone aria-hidden="true" />
                Call
              </ButtonAnchor>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
