"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

const step1Schema = z.object({
  practiceAreaId: z.string().min(1, "Please select a practice area"),
  consultationType: z.enum(["in-person", "phone", "video"], {
    required_error: "Please select a consultation type",
  }),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface BookingStep1MatterProps {
  initialData?: Partial<Step1FormData>;
  onNext: (data: Step1FormData) => void;
  onBack?: () => void;
}

export function BookingStep1Matter({
  initialData,
  onNext,
  onBack,
}: BookingStep1MatterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: initialData,
  });

  const onSubmit = (data: Step1FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Matter Type
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Select the area of law that best describes your consultation needs.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-warm-text mb-3">
          Practice Area <span className="text-gold">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
          {practiceAreas.map((area) => (
            <label
              key={area.id}
              className={cn(
                "relative cursor-pointer",
                "border border-warm-muted/30 rounded-lg p-3 sm:p-4 transition-all",
                "hover:border-gold/50 hover:bg-gray-100/50",
                "focus-within:ring-2 focus-within:ring-gold/40"
              )}
            >
              <input
                type="radio"
                value={area.id}
                {...register("practiceAreaId")}
                className="sr-only peer"
              />
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className="w-4 h-4 rounded-full border-2 border-warm-muted peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-800 opacity-0 peer-checked:opacity-100" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-warm-text text-sm sm:text-base">
                    {area.name.replace(/[[\]]/g, "")}
                  </p>
                  <p className="text-xs sm:text-sm text-warm-muted mt-1 line-clamp-2">
                    {area.shortDescription.replace(/[[\]]/g, "")}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.practiceAreaId && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors.practiceAreaId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-warm-text mb-3">
          Consultation Type <span className="text-gold">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup">
          {[
            { value: "in-person", label: "In Person", description: "At our Accra office" },
            { value: "phone", label: "Phone Call", description: "Over the phone" },
            { value: "video", label: "Video Call", description: "Via video conference" },
          ].map((type) => (
            <label
              key={type.value}
              className={cn(
                "relative cursor-pointer",
                "border border-warm-muted/30 rounded-lg p-3 sm:p-4 transition-all",
                "hover:border-gold/50 hover:bg-gray-100/50",
                "focus-within:ring-2 focus-within:ring-gold/40"
              )}
            >
              <input
                type="radio"
                value={type.value}
                {...register("consultationType")}
                className="sr-only peer"
              />
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-warm-muted peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-black-900 opacity-0 peer-checked:opacity-100" />
                </div>
                <p className="font-medium text-warm-text text-sm sm:text-base">{type.label}</p>
                <p className="text-xs sm:text-sm text-warm-muted">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.consultationType && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors.consultationType.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
