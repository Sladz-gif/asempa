import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ArrowRight, GraduationCap, Languages, Award } from "lucide-react";
import { attorneys } from "@/content/attorneys";
import { practiceAreas } from "@/content/practice-areas";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  title: "Attorneys",
  description: `Meet the partners and associates of ${FIRM.name.replace(/[[\]]/g, "")}. Ghana Bar-admitted lawyers with deep expertise across our practice areas.`,
  alternates: { canonical: "/attorneys" },
  openGraph: {
    title: `Attorneys · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Ghana Bar-admitted partners and associates, each with a profile, specialisation, and direct booking option.",
    url: "/attorneys",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Attorneys · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
    description: "Ghana Bar-admitted partners and associates, each with a profile, specialisation, and direct booking option.",
  },
};

function practiceNamesFor(ids: string[]) {
  return ids
    .map((id) => practiceAreas.find((p) => p.id === id)?.name.replace(/[[\]]/g, ""))
    .filter(Boolean)
    .join(" · ");
}

export default function AttorneysIndexPage() {
  return (
    <>
      <section aria-labelledby="attorneys-heading" className="section pt-20 md:pt-28 pb-6">
        <div className="container-page max-w-4xl">
          <span className="eyebrow">Our people</span>
          <h1 id="attorneys-heading" className="text-balance">
            Attorneys admitted to practice before the <GoldSpan>courts of Ghana.</GoldSpan>
          </h1>
          <p className="mt-6 text-lg text-warm-muted leading-relaxed max-w-2xl">
            Every partner and associate at {FIRM.name.replace(/[[\]]/g, "")} is admitted to the Ghana Bar
            and brings a record of hands-on advocacy and advisory experience. Browse profiles below or book
            directly with the lawyer you would like to meet.
          </p>
          <div className="gold-divider-short mt-10" />
        </div>
      </section>

      <Divider />

      <section aria-labelledby="attorneys-grid-heading" className="section py-16 md:py-24">
        <div className="container-page">
          <h2 id="attorneys-grid-heading" className="sr-only">All attorneys</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {attorneys.map((a) => {
              const cleanName = a.fullName.replace(/[[\]]/g, "");
              return (
                <li key={a.id}>
                  <Card padding="none" className="h-full" interactive hover asChild>
                    <Link href={`/attorneys/${a.slug}`} className="block h-full group/card">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-white">
                        <Image
                          src={a.photoUrl}
                          alt={`${cleanName} — professional headshot`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          priority={a.featured}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black-900/70" />
                        <div className="absolute bottom-4 left-5 right-5">
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-gold/20 px-3 py-1.5 text-xs text-gold">
                            <Award aria-hidden="true" className="h-3.5 w-3.5" />
                            Called to the Ghana Bar · {a.ghanaBarAdmissionYear}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col h-full">
                        <h3 className="font-serif text-2xl text-warm-text leading-tight">{cleanName}</h3>
                        <p className="mt-1 text-gold">{a.title.replace(/[[\]]/g, "")}</p>

                        <div className="mt-5 space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <GraduationCap aria-hidden="true" className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                            <div className="text-warm-muted">
                              {a.education.slice(0, 2).map((e, i) => (
                                <p key={i}>{e.replace(/[[\]]/g, "")}</p>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Languages aria-hidden="true" className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                            <span className="text-warm-muted">{a.languages.join(", ")}</span>
                          </div>
                        </div>

                        <p className="mt-5 text-sm text-warm-muted line-clamp-3 flex-1">
                          {a.bio.replace(/[[\]]/g, "")}
                        </p>

                        <div className="mt-5 border-t border-gold/10 pt-4">
                          <p className="text-xs uppercase tracking-widgold text-warm-muted">Practice areas</p>
                          <p className="mt-1 text-sm text-warm-text">
                            {practiceNamesFor(a.practiceAreaIds)}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover/card:gap-3 transition-all">
                            View full profile
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </span>
                          <span
                            aria-hidden="true"
                            className="inline-flex items-center gap-1 rounded-full bg-gold/10 border border-gold/20 px-2.5 py-1 text-xs text-gold"
                          >
                            <CalendarCheck className="h-3.5 w-3.5" />
                            Book
                          </span>
                        </div>
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
        eyebrow="Prefer a recommendation?"
        heading="Tell us about your matter and we will suggest the right attorney."
        description="If you are not sure who to book, send a short enquiry and our team will respond within one business day."
        primary={
          <LinkButton href="/contact" variant="primary" size="lg">
            Enquire about representation
          </LinkButton>
        }
      />

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Attorneys", url: "/attorneys" },
        ]}
      />
    </>
  );
}
