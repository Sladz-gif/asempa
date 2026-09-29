"use client";

import React, { useState, useEffect } from "react";
import { BookingProgressIndicator } from "./BookingProgressIndicator";
import { BookingStep1Matter } from "./BookingStep1Matter";
import { BookingStep2Attorney } from "./BookingStep2Attorney";
import { BookingStep3DateTime } from "./BookingStep3DateTime";
import { BookingStep4Details } from "./BookingStep4Details";
import { BookingStep5Review } from "./BookingStep5Review";
import { BookingStep6Confirmation } from "./BookingStep6Confirmation";
import { bookingService } from "@/lib/services/booking";
import type { BookingWizardState, BookingConfirmation } from "@/types";

interface BookingWizardProps {
  initialPracticeAreaId?: string;
  initialAttorneyId?: string;
  onClose?: () => void;
}

const STEP_LABELS = [
  "Matter",
  "Attorney",
  "Date & Time",
  "Your Details",
  "Review",
  "Confirmed",
];

export function BookingWizard({
  initialPracticeAreaId,
  initialAttorneyId,
  onClose,
}: BookingWizardProps) {
  const [state, setState] = useState<BookingWizardState>({
    step: 1,
    practiceAreaId: initialPracticeAreaId,
    attorneyId: initialAttorneyId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const updateState = (updates: Partial<BookingWizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleStep1Next = (data: { practiceAreaId: string; consultationType: string }) => {
    updateState({
      step: 2,
      practiceAreaId: data.practiceAreaId,
      consultationType: data.consultationType as any,
    });
  };

  const handleStep2Next = (data: { attorneyId: string }) => {
    updateState({
      step: 3,
      attorneyId: data.attorneyId as any,
    });
  };

  const handleStep3Next = (data: { selectedDateISO: string; selectedTime: string }) => {
    updateState({
      step: 4,
      selectedDateISO: data.selectedDateISO,
      selectedTime: data.selectedTime,
    });
  };

  const handleStep4Next = (data: any) => {
    updateState({
      step: 5,
      client: data,
    });
  };

  const handleStep5Submit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await bookingService.submitBooking(state);
      setConfirmation(result);
      updateState({ step: 6 });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    updateState({ step: Math.max(1, state.step - 1) as 1 | 2 | 3 | 4 | 5 | 6 });
  };

  const handleReset = () => {
    setState({
      step: 1,
      practiceAreaId: initialPracticeAreaId,
      attorneyId: initialAttorneyId,
    });
    setConfirmation(null);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    handleStep5Submit();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const step = url.searchParams.get("step");
    const practiceAreaId = url.searchParams.get("practiceAreaId");
    const attorneyId = url.searchParams.get("attorneyId");

    if (step) {
      updateState({ step: parseInt(step, 10) as any });
    }
    if (practiceAreaId) {
      updateState({ practiceAreaId });
    }
    if (attorneyId) {
      updateState({ attorneyId });
    }
  }, [initialPracticeAreaId, initialAttorneyId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("step", state.step.toString());
      if (state.practiceAreaId) {
        url.searchParams.set("practiceAreaId", state.practiceAreaId);
      }
      if (state.attorneyId) {
        url.searchParams.set("attorneyId", state.attorneyId);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, [state]);

  return (
    <div className="space-y-6">
      {state.step < 6 && (
        <BookingProgressIndicator
          currentStep={state.step}
          totalSteps={5}
          stepLabels={STEP_LABELS.slice(0, 5)}
        />
      )}

      {error && (
        <div
          className="bg-red-900/20 border border-red-500/50 rounded-lg p-4"
          role="alert"
        >
          <p className="text-red-300 font-medium">Booking Error</p>
          <p className="text-red-200 text-sm mt-1">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-3 text-sm text-red-300 hover:text-red-200 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {state.step === 1 && (
        <BookingStep1Matter
          initialData={{
            practiceAreaId: state.practiceAreaId,
            consultationType: state.consultationType,
          }}
          onNext={handleStep1Next}
        />
      )}

      {state.step === 2 && (
        <BookingStep2Attorney
          initialData={{ attorneyId: state.attorneyId }}
          onNext={handleStep2Next}
          onBack={handleBack}
        />
      )}

      {state.step === 3 && (
        <BookingStep3DateTime
          initialData={{
            selectedDateISO: state.selectedDateISO,
            selectedTime: state.selectedTime,
          }}
          attorneyId={state.attorneyId}
          practiceAreaId={state.practiceAreaId}
          onNext={handleStep3Next}
          onBack={handleBack}
        />
      )}

      {state.step === 4 && (
        <BookingStep4Details
          initialData={state.client}
          onNext={handleStep4Next}
          onBack={handleBack}
        />
      )}

      {state.step === 5 && (
        <BookingStep5Review
          state={state}
          onSubmit={handleStep5Submit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      )}

      {state.step === 6 && confirmation && (
        <BookingStep6Confirmation
          confirmation={confirmation}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
