import React from "react";
import Link from "next/link";
import { Building2, Scale, Home, Heart, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { practiceAreas } from "@/content/practice-areas";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Scale,
  Home,
  Heart,
  Briefcase,
  ShieldCheck,
};

export function HomePracticeAreas() {
  return (
    <section id="practice-areas" aria-labelledby="pa-heading" className="section">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-end mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Practice Areas</span>
            <h2 id="pa-heading" className="mb-3 sm:mb-4 md:mb-5">
              A full-service practice built around <GoldSpan>the matters our clients face.</GoldSpan>
            </h2>
            <p className="text-warm-muted max-w-xl leading-relaxed text-sm sm:text-base md:text-base">
              We advise across the areas of law most relevant to individuals, families, and
              businesses operating in and around Ghana. Every team is led by a partner with deep
              on-the-ground experience of the Ghanaian courts, regulators, and market.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/practice-areas"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-hl"
            >
              View all practice areas
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {practiceAreas.map((pa) => {
            const Icon = ICON_MAP[pa.icon] ?? Building2;
            return (
              <Link
                key={pa.id}
                href={`/practice-areas/${pa.slug}`}
                aria-label={`Learn more about ${pa.name.replace(/[[\]]/g, "")}`}
                className="group block"
              >
                <Card
                  className={cn(
                    "h-full flex flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-gold-md",
                    "relative overflow-hidden"
                  )}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <div
                      aria-hidden="true"
                      className="mb-2 inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-md bg-gold/10 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black-900 transition-colors"
                    >
                      <Icon className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <CardTitle className="text-sm sm:text-base md:text-lg">{pa.name.replace(/[[\]]/g, "")}</CardTitle>
                  </CardHeader>
                  <CardDescription className="flex-1 text-xs sm:text-sm md:text-base">{pa.shortDescription.replace(/[[\]]/g, "")}</CardDescription>
                  <div className="mt-3 sm:mt-4 md:mt-6 flex items-center justify-between pt-3 border-t border-black-700">
                    <span className="text-[10px] sm:text-[10px] md:text-xs uppercase tracking-widgold text-warm-muted">
                      Explore
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
