import React from "react";
import { StatCounter } from "@/components/ui/StatCounter";

const STATS = [
  { end: 15, suffix: "+", label: "[Years] in practice", duration: 2200 },
  { end: 6, suffix: "", label: "Practice areas", duration: 1800 },
  { end: 24, suffix: "+", label: "Combined attorneys and staff", duration: 2200 },
  { end: 2, suffix: "", label: "[Offices across Ghana]", duration: 1600 },
];

export function HomeStatBar() {
  return (
    <section
      aria-labelledby="stat-bar-heading"
      className="relative -mt-12 md:-mt-16 z-10"
    >
      <div className="container-page">
        <div className="card-surface border-t-2 border-t-gold/60 rounded-2xl border-gray-200 shadow-gold-lg px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
          <h2 id="stat-bar-heading" className="sr-only">
            Firm profile at a glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
