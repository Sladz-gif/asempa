import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { GoldSpan } from "@/components/ui/Divider";
import { results } from "@/content/results";
import { practiceAreas } from "@/content/practice-areas";

export function HomeResults() {
  const items = results.slice(0, 4);
  return (
    <section id="results" aria-labelledby="res-heading" className="section">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-end mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Results & notable matters</span>
            <h2 id="res-heading" className="mb-3 sm:mb-4 md:mb-5">
              Selected <GoldSpan>outcomes and engagements.</GoldSpan>
            </h2>
            <p className="text-warm-muted max-w-xl leading-relaxed text-sm sm:text-base md:text-base">
              A snapshot of recent, illustrative engagements across our practice areas. Every
              matter described below is a general summary placeholder; specific client names and
              identifying details are not disclosed.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/results"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-hl"
            >
              View all notable matters
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {items.map((r) => {
            const pa = practiceAreas.find((p) => p.id === r.practiceAreaId);
            return (
              <Card key={r.id} className="group">
                <div className="space-y-3 sm:space-y-4">
                  {pa && (
                    <Badge variant="outline" className="text-[10px] sm:text-[10px] md:text-xs">
                      {pa.name.replace(/[[\]]/g, "")} · {r.year}
                    </Badge>
                  )}
                  <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-warm-text leading-snug group-hover:text-gold transition-colors">
                    {r.title.replace(/[[\]]/g, "")}
                  </h3>
                  <div
                    aria-hidden="true"
                    className="font-serif font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gold tracking-tight leading-none"
                  >
                    {r.outcomeFigure.replace(/[[\]]/g, "")}
                  </div>
                  <p className="text-sm sm:text-sm md:text-base leading-relaxed">
                    {r.summary.replace(/[[\]]/g, "")}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
