"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { bookingHref, bookingLabel, cruiseLinks, primaryLinks } from "@/content/navigation";
import { site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-11 items-center justify-center rounded-full border border-maroon/20 bg-paper text-maroon lg:hidden"
        aria-label="Open menu"
      >
        <Menu aria-hidden="true" className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-[rise_0.3s_ease_both]" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-sand shadow-raised focus:outline-none data-[state=open]:animate-rise">
          <VisuallyHidden.Root>
            <Dialog.Title>Menu</Dialog.Title>
            <Dialog.Description>Site navigation and contact options</Dialog.Description>
          </VisuallyHidden.Root>
          <div className="flex h-18 items-center justify-between border-b border-silt px-4">
            <Wordmark />
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-full border border-maroon/20 bg-paper text-maroon"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-lantern uppercase">
              Cruises
            </p>
            <ul className="mt-2 divide-y divide-silt">
              {cruiseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-14 flex-col justify-center py-2"
                  >
                    <span className="font-display text-xl font-semibold text-maroon">
                      {link.label}
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
                    className="flex min-h-12 items-center font-display text-2xl font-semibold text-maroon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-silt bg-paper p-4">
            <ButtonLink href={bookingHref} onClick={close} size="lg" className="w-full">
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
