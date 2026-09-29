import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { practiceAreas } from "@/content/practice-areas";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";
import { cn } from "@/lib/utils/cn";
import * as LucideIcons from "lucide-react";

export const metadata: Metadata = {
  title: "Practice Areas",
  description: `Explore the full range of legal services offered by ${FIRM.name.replace(/[[\]]/g, "")} in Accra, Ghana — from corporate counsel and dispute resolution to family, real estate, employment, and energy law.`,
  alternates: { canonical: "/practice-areas" },
  openGraph: {
    title: `Practice Areas · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Six focused practice areas, led by partners with hands-on experience advising Ghanaian and international clients.",
    url: "/practice-areas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Practice Areas · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Six focused practice areas, led by partners with hands-on experience advising Ghanaian and international clients.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Building2: (LucideIcons as any).Building2,
  Scale: (LucideIcons as any).Scale,
  Users: (LucideIcons as any).Users,
  Home: (LucideIcons as any).Home,
  Briefcase: (LucideIcons as any).Briefcase,
  Zap: (LucideIcons as any).Zap,
};

export default function PracticeAreasIndexPage() {
  return (
    <>
      <section aria-labelledby="pa-heading" className="section pt-20 md:pt-28 pb-6">
        <div className="container-page max-w-4xl">
          <span className="eyebrow">Our services</span>
          <h1 id="pa-heading" className="text-balance">
            Practice areas tailored to the matters <GoldSpan>that shape your life and work.</GoldSpan>
          </h1>
          <p className="mt-6 text-lg text-warm-muted leading-relaxed max-w-2xl">
            {FIRM.name.replace(/[[\]]/g, "")} advises across six core disciplines. Every practice area is
            partner-led, with a single point of contact and direct access to the senior lawyer handling your matter.
          </p>
          <div className="gold-divider-short mt-10" />
        </div>
      </section>

      <Divider />

      <section aria-labelledby="pa-grid-heading" className="section py-16 md:py-24">
        <div className="container-page">
          <h2 id="pa-grid-heading" className="sr-only">All practice areas</h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
            {practiceAreas.map((pa, idx) => {
              const Icon = iconMap[pa.icon] ?? LucideIcons.CircleDot;
              return (
                <li key={pa.id}>
                  <Card interactive hover asChild padding="lg">
                    <Link
                      href={`/practice-areas/${pa.slug}`}
                      aria-label={`${pa.name.replace(/[[\]]/g, "")} — view practice area detail`}
                      className="h-full flex flex-col"
                    >
                      <div
                        aria-hidden="true"
                        className={cn(
                          "inline-flex h-12 w-12 items-center justify-center rounded-xl",
                          "bg-gold text-black-900 shadow-gold-sm",
                          "transition-transform duration-300 group-hover/card:-translate-y-0.5",
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden={true} />
                      </div>
                      <h3 className="mt-6 font-serif text-2xl leading-tight text-warm-text">
                        <span>{idx + 1}. </span>
                        {pa.name.replace(/[[\]]/g, "")}
                      </h3>
                      <p className="mt-3 text-warm-muted leading-relaxed flex-1">
                        {pa.shortDescription.replace(/[[\]]/g, "")}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-gold font-medium text-sm group-hover/card:gap-3 transition-all">
                        Learn more
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </div>
                    </Link>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTABand
        eyebrow="Not sure which practice area covers your matter?"
        heading="Tell us a little about what you need."
        description="We will direct your enquiry to the right partner within one business day."
      />

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Practice Areas", url: "/practice-areas" },
        ]}
      />
    </>
  );
}
