"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface BookingProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function BookingProgressIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: BookingProgressIndicatorProps) {
  return (
    <div className="mb-6 md:mb-8" role="navigation" aria-label="Booking progress">
      <ol className="flex items-center justify-between gap-1 md:gap-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <li
              key={stepNumber}
              className="flex-1 flex items-center min-w-0"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all shrink-0",
                    isCompleted && "bg-gold text-black-900",
                    isCurrent && "bg-gold text-black-900 ring-4 ring-gold/20",
                    isFuture && "bg-gray-200 text-warm-muted border border-warm-muted/30"
                  )}
                  aria-label={`Step ${stepNumber}: ${label}`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1.5 md:mt-2 text-[10px] md:text-xs lg:text-sm font-medium text-center truncate max-w-full px-1",
                    isCurrent && "text-gold",
                    isCompleted && "text-warm-text",
                    isFuture && "text-warm-muted"
                  )}
                >
                  {label}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 md:mx-2 min-w-[8px]",
                    isCompleted ? "bg-gold" : "bg-gray-200"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
