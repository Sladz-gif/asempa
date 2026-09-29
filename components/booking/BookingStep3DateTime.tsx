"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { cn } from "@/lib/utils/cn";
import { bookingService } from "@/lib/services/booking";
import type { TimeSlot } from "@/types";

const step3Schema = z.object({
  selectedDateISO: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
});

type Step3FormData = z.infer<typeof step3Schema>;

interface BookingStep3DateTimeProps {
  initialData?: Partial<Step3FormData>;
  attorneyId?: string;
  practiceAreaId?: string;
  onNext: (data: Step3FormData) => void;
  onBack: () => void;
}

export function BookingStep3DateTime({
  initialData,
  attorneyId,
  practiceAreaId,
  onNext,
  onBack,
}: BookingStep3DateTimeProps) {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: initialData,
  });

  const selectedDateISO = watch("selectedDateISO");
  const [slots, setSlots] = useState<Record<string, TimeSlot[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDateISO && !slots[selectedDateISO]) {
      setLoading(true);
      const today = new Date().toISOString().slice(0, 10);
      bookingService
        .getAvailableSlots({
          dateFromISO: today,
          days: 30,
          attorneyId,
          practiceAreaId,
        })
        .then((data) => {
          setSlots(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [selectedDateISO, attorneyId, practiceAreaId, slots]);

  const availableSlots = selectedDateISO ? slots[selectedDateISO] || [] : [];
  const availableTimeSlots = availableSlots.filter((s) => s.available);

  const onSubmit = (data: Step3FormData) => {
    onNext(data);
  };

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO + "T00:00:00Z");
    return date.toLocaleDateString("en-GH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Choose Date & Time
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Select a convenient date and time for your consultation. All times are in Africa/Accra (GMT).
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-warm-text mb-3">
          Select Date <span className="text-gold">*</span>
        </label>
        <BookingCalendar
          selectedDateISO={selectedDateISO}
          onSelect={(date) => setValue("selectedDateISO", date)}
          availableByDate={Object.fromEntries(Object.keys(slots).map(date => [date, true]))}
        />
        {errors.selectedDateISO && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors.selectedDateISO.message}
          </p>
        )}
      </div>

      {selectedDateISO && (
        <div>
          <label className="block text-sm font-medium text-warm-text mb-3">
            Available Times for {formatDate(selectedDateISO)} <span className="text-gold">*</span>
          </label>
          {loading ? (
            <div className="text-warm-muted">Loading available times...</div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="text-warm-muted">No available times for this date. Please select another date.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" role="radiogroup">
              {availableTimeSlots.map((slot) => (
                <label
                  key={slot.time}
                  className={cn(
                    "relative cursor-pointer text-center",
                    "border border-warm-muted/30 rounded-lg p-2.5 sm:p-3 transition-all",
                    "hover:border-gold/50 hover:bg-gray-100/50",
                    "focus-within:ring-2 focus-within:ring-gold/40"
                  )}
                >
                  <input
                    type="radio"
                    value={slot.time}
                    {...register("selectedTime")}
                    className="sr-only peer"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 rounded-full border-2 border-warm-muted peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-gray-800 opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-warm-text">{slot.time}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
          {errors.selectedTime && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.selectedTime.message}
            </p>
          )}
        </div>
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
        <Button type="submit" disabled={isSubmitting || !selectedDateISO} className="w-full sm:w-auto">
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
