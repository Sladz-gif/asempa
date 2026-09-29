"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { attorneys } from "@/content/attorneys";
import { cn } from "@/lib/utils/cn";

const step2Schema = z.object({
  attorneyId: z.string().min(1, "Please select an attorney"),
});

type Step2FormData = z.infer<typeof step2Schema>;

interface BookingStep2AttorneyProps {
  initialData?: Partial<Step2FormData>;
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
}

export function BookingStep2Attorney({
  initialData,
  onNext,
  onBack,
}: BookingStep2AttorneyProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: initialData,
  });

  const onSubmit = (data: Step2FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Choose Your Attorney
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Select a specific attorney or let us assign the best available attorney for your matter.
        </p>
      </div>

      <div className="space-y-3" role="radiogroup">
        <label
          className={cn(
            "relative cursor-pointer block",
            "border border-warm-muted/30 rounded-lg p-3 sm:p-4 transition-all",
            "hover:border-gold/50 hover:bg-gray-100/50",
            "focus-within:ring-2 focus-within:ring-gold/40"
          )}
        >
          <input
            type="radio"
            value="any"
            {...register("attorneyId")}
            className="sr-only peer"
          />
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-warm-muted peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-black-900 opacity-0 peer-checked:opacity-100" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-warm-text text-sm sm:text-base">Any Available Attorney</p>
              <p className="text-xs sm:text-sm text-warm-muted">
                We will assign the best attorney for your matter based on availability and expertise
              </p>
            </div>
          </div>
        </label>

        {attorneys.map((attorney) => (
          <label
            key={attorney.id}
            className={cn(
              "relative cursor-pointer block",
              "border border-warm-muted/30 rounded-lg p-3 sm:p-4 transition-all",
              "hover:border-gold/50 hover:bg-gray-100/50",
              "focus-within:ring-2 focus-within:ring-gold/40"
            )}
          >
            <input
              type="radio"
              value={attorney.id}
              {...register("attorneyId")}
              className="sr-only peer"
            />
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="mt-0.5 shrink-0">
                <div className="w-4 h-4 rounded-full border-2 border-warm-muted peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-800 opacity-0 peer-checked:opacity-100" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-warm-text text-sm sm:text-base">
                  {attorney.fullName.replace(/[[\]]/g, "")}
                </p>
                <p className="text-xs sm:text-sm text-warm-muted">
                  {attorney.title.replace(/[[\]]/g, "")}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {errors.attorneyId && (
        <p className="text-sm text-red-400" role="alert">
          {errors.attorneyId.message}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
