"use client";

import { useState } from "react";
import { results } from "@/content/results";
import { practiceAreas } from "@/content/practice-areas";
import { Button } from "@/components/ui/Button";
import { Filter, X } from "lucide-react";

export function ResultsFilterGrid() {
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string | null>(null);

  const filteredResults = selectedPracticeArea
    ? results.filter((r) => r.practiceAreaId === selectedPracticeArea)
    : results;

  const clearFilter = () => setSelectedPracticeArea(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-warm-muted">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter by practice area:</span>
        </div>
        <button
          onClick={clearFilter}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
            !selectedPracticeArea
              ? "bg-gold text-black-900"
              : "border border-gold-sh/30 text-warm-text hover:border-gold"
          }`}
        >
          All
        </button>
        {practiceAreas.map((pa) => (
          <button
            key={pa.id}
            onClick={() => setSelectedPracticeArea(pa.id)}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
              selectedPracticeArea === pa.id
                ? "bg-gold text-black-900"
                : "border border-gold-sh/30 text-warm-text hover:border-gold"
            }`}
          >
            {pa.name.replace(/[[\]]/g, "")}
          </button>
        ))}
      </div>

      {selectedPracticeArea && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-warm-muted">
            Filtered by: {practiceAreas.find((pa) => pa.id === selectedPracticeArea)?.name.replace(/[[\]]/g, "")}
          </span>
          <button
            onClick={clearFilter}
            className="text-sm text-gold hover:text-gold-hl flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear filter
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((result) => {
          const practiceArea = practiceAreas.find((pa) => pa.id === result.practiceAreaId);
          return (
            <div
              key={result.id}
              className="bg-white p-6 border border-gray-200 rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded border border-gold/30">
                  {practiceArea?.name.replace(/[[\]]/g, "")}
                </span>
                <span className="text-xs text-warm-muted">{result.year}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-warm-text mb-3">
                {result.title.replace(/[[\]]/g, "")}
              </h3>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gold">
                  {result.outcomeFigure}
                </span>
                <span className="text-sm text-warm-muted ml-1">
                  {result.outcomeUnit === "GHS" && "GHS"}
                  {result.outcomeUnit === "percentage" && "%"}
                  {result.outcomeUnit === "favourable" && " favourable outcome"}
                  {result.outcomeUnit === "dismissed" && " dismissed"}
                </span>
              </div>
              <p className="text-sm text-warm-muted line-clamp-3">
                {result.summary.replace(/[[\]]/g, "")}
              </p>
            </div>
          );
        })}
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-warm-muted">No results found for this practice area.</p>
        </div>
      )}
    </div>
  );
}
