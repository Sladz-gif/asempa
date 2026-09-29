"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export function Accordion({
  items,
  allowMultiple = true,
  defaultOpenIds,
  className,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpenIds ?? []));
  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "card-surface rounded-xl border border-black-700/60 overflow-hidden transition-all",
              isOpen && "border-gold/40"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-header-${item.id}`}
              className="w-full flex items-start justify-between gap-3 sm:gap-4 text-left px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 hover:bg-black-800/40 transition-colors"
            >
              <span className="text-sm sm:text-base md:text-lg font-serif font-semibold text-warm-text leading-snug">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gold transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 md:pb-7 text-warm-muted text-xs sm:text-sm md:text-base leading-relaxed border-t border-black-700/50 pt-3 sm:pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
