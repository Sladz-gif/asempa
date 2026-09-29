"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { cn } from "@/lib/utils/cn";
import { featuredTestimonials } from "@/content/testimonials";
import { practiceAreas } from "@/content/practice-areas";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function HomeTestimonials() {
  const items = featuredTestimonials;
  const [idx, setIdx] = useState(0);
  const reduced = usePrefersReducedMotion();
  const len = items.length;
  const safeIdx = ((idx % len) + len) % len;

  return (
    <section id="testimonials" aria-labelledby="test-heading" className="section">
      <div className="container-page">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-14 max-w-3xl mx-auto">
          <span className="eyebrow">Client testimonials</span>
          <h2 id="test-heading" className="mb-3 sm:mb-4 md:mb-5">
            Words from <GoldSpan>those we represent.</GoldSpan>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Quote
            aria-hidden="true"
            className="absolute -top-2 sm:-top-3 md:-top-4 lg:-top-6 -left-2 sm:-left-2 md:-left-6 lg:-left-6 h-8 sm:h-10 md:h-14 lg:h-20 w-8 sm:w-10 md:w-14 lg:w-20 text-gold/15"
          />
          <div
            className={cn(
              "rounded-2xl border border-gold/15 card-surface p-4 sm:p-5 md:p-7 lg:p-12 relative overflow-hidden",
              !reduced && "transition-transform duration-500"
            )}
          >
            <p className="relative z-10 text-sm sm:text-base md:text-lg lg:text-2xl font-serif leading-relaxed text-warm-text">
              “{items[safeIdx].quote.replace(/[[\]]/g, "")}”
            </p>

            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-warm-text">
                  {items[safeIdx].clientFullName.replace(/[[\]]/g, "")}
                </p>
                <p className="text-xs sm:text-xs md:text-sm text-warm-muted mt-0.5">
                  {items[safeIdx].clientRole.replace(/[[\]]/g, "")}
                </p>
              </div>
              {items[safeIdx].practiceAreaId &&
                (() => {
                  const pa = practiceAreas.find(
                    (p) => p.id === items[safeIdx].practiceAreaId
                  );
                  return pa ? <Badge variant="outline" className="text-[10px] sm:text-[10px] md:text-xs">{pa.name.replace(/[[\]]/g, "")}</Badge> : null;
                })()}
            </div>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setIdx((i) => i - 1)}
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-md border border-gray-300 bg-white text-warm-text hover:text-gold hover:border-gold inline-flex items-center justify-center transition-colors"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setIdx((i) => i + 1)}
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-md border border-gray-300 bg-white text-warm-text hover:text-gold hover:border-gold inline-flex items-center justify-center transition-colors"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pagination">
              {items.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === safeIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === safeIdx ? "w-5 sm:w-6 md:w-8 bg-gold" : "w-2 bg-black-700 hover:bg-gold/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
