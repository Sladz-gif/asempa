import React from "react";
import { Divider } from "@/components/ui/Divider";

const PLACEHOLDER_LOGOS = [
  "[Ghana Legal Journal]",
  "[Business & Financial Times]",
  "[The Ghana Report]",
  "[Accra Business Review]",
  "[Law & Practice Africa]",
  "[Citi Business News]",
];

export function HomeAsFeaturedIn() {
  return (
    <section aria-labelledby="feat-heading" className="py-10 sm:py-14 md:py-20 border-y border-black-700/60 bg-black-800/15">
      <div className="container-page">
        <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-widgold text-warm-muted text-center">
            <span id="feat-heading">As featured in & working with</span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6 items-center">
          {PLACEHOLDER_LOGOS.map((name) => (
            <div
              key={name}
              className="group flex items-center justify-center min-h-[3rem] sm:min-h-[3.5rem] opacity-50 hover:opacity-100 transition-all duration-300"
              aria-label={name.replace(/[[\]]/g, "")}
            >
              <span className="font-serif text-xs sm:text-sm md:text-base text-warm-muted group-hover:text-gold tracking-wide text-center leading-tight">
                {name.replace(/[[\]]/g, "")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
