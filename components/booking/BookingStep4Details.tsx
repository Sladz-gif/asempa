"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Checkbox } from "@/components/ui/Form";
import { cn } from "@/lib/utils/cn";

const ghanaPhoneRegex = /^(\+233|0)?[2-9]\d{8}$/;

const step4Schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(ghanaPhoneRegex, "Please enter a valid Ghanaian phone number (e.g., +233 XX XXX XXXX or 0XX XXX XXXX)"),
  email: z.string().email("Please enter a valid email address"),
  matterDescription: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to proceed" }),
  }),
});

type Step4FormData = z.infer<typeof step4Schema>;

interface BookingStep4DetailsProps {
  initialData?: Partial<Step4FormData>;
  onNext: (data: Step4FormData) => void;
  onBack: () => void;
}

export function BookingStep4Details({
  initialData,
  onNext,
  onBack,
}: BookingStep4DetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: initialData,
  });

  const onSubmit = (data: Step4FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Your Details
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Please provide your contact information so we can confirm your consultation.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-warm-text mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <Input
            {...register("fullName")}
            placeholder="Enter your full name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-text mb-2">
            Phone Number <span className="text-gold">*</span>
          </label>
          <Input
            {...register("phone")}
            placeholder="+233 XX XXX XXXX or 0XX XXX XXXX"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-text mb-2">
            Email Address <span className="text-gold">*</span>
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your.email@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-text mb-2">
            Matter Description (Optional)
          </label>
          <Textarea
            {...register("matterDescription")}
            rows={3}
            placeholder="Briefly describe your legal matter..."
            aria-invalid={!!errors.matterDescription}
          />
          <p className="mt-1 text-xs text-warm-muted">
            Please do not include confidential or sensitive details in this description.
          </p>
          {errors.matterDescription && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.matterDescription.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border border-gray-300 bg-white text-gold accent-gold focus:ring-2 focus:ring-gold/50"
              aria-invalid={!!errors.consent}
            />
            <span className="text-sm text-warm-text leading-relaxed group-hover:text-warm-text/95">
              I consent to the collection and processing of my personal data in accordance with the{" "}
              <a href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </a>
              . I understand that this does not create a lawyer-client relationship.
              <span className="ml-1 text-gold">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

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
          {isSubmitting ? "Processing..." : "Review Booking"}
        </Button>
      </div>
    </form>
  );
}
