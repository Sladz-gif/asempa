import React from "react";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { GoldSpan } from "@/components/ui/Divider";

export function CTABand({
  eyebrow = "Next step",
  heading,
  description,
  primary,
}: {
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  primary?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 gold-divider" aria-hidden="true" />

      <div className="container-page relative text-center max-w-3xl mx-auto">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id="cta-heading" className="mb-3 sm:mb-4 md:mb-6">
          {heading ?? (
            <>
              Ready to talk through <GoldSpan>your matter?</GoldSpan>
            </>
          )}
        </h2>
        {description ?? (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-warm-muted max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-8">
            Book a private initial consultation online in about two minutes — in person at our
            Accra office, by phone, or by video.
          </p>
        )}
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-3.5 sm:justify-center">
          {primary ?? (
            <LinkButton
              href="/book"
              variant="primary"
              size="md"
              leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Book a Consultation
            </LinkButton>
          )}
          <LinkButton
            href="/contact"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Contact our Accra office
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
