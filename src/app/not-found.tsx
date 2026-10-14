import type { Metadata } from "next";
import { BoatMark } from "@/components/brand/boat-mark";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <BoatMark className="w-24 text-vermilion" />
      <h1 className="mt-6 text-h1">This page drifted downstream</h1>
      <p className="mt-4 max-w-xl text-lead text-muted">
        The page you are looking for doesn’t exist, or has moved with the new website.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ButtonLink href="/contact/" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
