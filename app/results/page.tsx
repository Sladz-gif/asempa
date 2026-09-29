import React from "react";
import type { Metadata } from "next";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";
import { ResultsFilterGrid } from "@/components/sections/ResultsFilterGrid";

export const metadata: Metadata = {
  title: "Results & Notable Matters",
  description: `Selected notable results and matters handled by ${FIRM.name.replace(/[[\]]/g, "")} across our practice areas. Filter by area of law.`,
  alternates: { canonical: "/results" },
  openGraph: {
    title: `Results & Notable Matters · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Selected notable matters and results across dispute resolution, corporate, property, family, employment, and regulatory practice areas.",
    url: "/results",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Results & Notable Matters · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Selected notable matters and results across our practice areas.",
  },
};

export default function ResultsPage() {
  return (
    <>
      <section aria-labelledby="results-heading" className="section pt-20 md:pt-28 pb-6">
        <div className="container-page max-w-4xl">
          <span className="eyebrow">Selected work</span>
          <h1 id="results-heading" className="text-balance">
            Notable matters &amp; <GoldSpan>results we have delivered.</GoldSpan>
          </h1>
          <p className="mt-6 text-lg text-warm-muted leading-relaxed max-w-2xl">
            Below is a selection of matters handled by the firm across our practice areas. Specifics are
            anonymised where confidentiality requires. Every matter is partner-led and documented with the
            same level of care.
          </p>
          <p className="mt-4 text-xs text-warm-muted/80 border-l-2 border-gold/40 pl-4">
            [Past results are not a guarantee of future outcomes. Each matter turns on its own facts and
            circumstances. Please consult the firm for an assessment of your specific situation.]
          </p>
          <div className="gold-divider-short mt-10" />
        </div>
      </section>

      <Divider />

      <section aria-labelledby="results-grid-heading" className="section py-16 md:py-24">
        <div className="container-page">
          <h2 id="results-grid-heading" className="sr-only">Results by practice area</h2>
          <ResultsFilterGrid />
        </div>
      </section>

      <CTABand
        eyebrow="Discuss a matter"
        heading="Have a matter in mind? Speak with the relevant practice lead."
        description="Book an initial consultation and your enquiry will be routed to the partner with the closest relevant experience."
      />

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Results & Notable Matters", url: "/results" },
        ]}
      />
    </>
  );
}
