"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { cn } from "@/lib/utils/cn";
import { FIRM } from "@/lib/config";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import type { BookingWizardState } from "@/types";

interface BookingStep5ReviewProps {
  state: BookingWizardState;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function BookingStep5Review({
  state,
  onSubmit,
  onBack,
  isSubmitting,
}: BookingStep5ReviewProps) {
  const practiceArea = state.practiceAreaId
    ? practiceAreas.find((pa) => pa.id === state.practiceAreaId)
    : null;
  const attorney = state.attorneyId && state.attorneyId !== "any"
    ? attorneys.find((a) => a.id === state.attorneyId)
    : null;

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO + "T00:00:00Z");
    return date.toLocaleDateString("en-GH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const consultationTypeLabels = {
    "in-person": "In Person at Accra Office",
    "phone": "Phone Call",
    "video": "Video Call",
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Review & Confirm
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Please review your booking details before confirming.
        </p>
      </div>

      <Card className="p-4 sm:p-6 space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Practice Area
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              {practiceArea?.name.replace(/[[\]]/g, "") || "Not selected"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Consultation Type
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              {state.consultationType
                ? consultationTypeLabels[state.consultationType]
                : "Not selected"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Attorney
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              {attorney
                ? attorney.fullName.replace(/[[\]]/g, "")
                : state.attorneyId === "any"
                ? "Any Available Attorney"
                : "Not selected"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Date & Time
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              {state.selectedDateISO && state.selectedTime
                ? `${formatDate(state.selectedDateISO)} at ${state.selectedTime} (Africa/Accra)`
                : "Not selected"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Contact Information
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              {state.client?.fullName}
            </p>
            <p className="text-warm-text text-sm">
              {state.client?.phone}
            </p>
            <p className="text-warm-text text-sm">
              {state.client?.email}
            </p>
          </div>

          {state.client?.matterDescription && (
            <>
              <Divider />
              <div>
                <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
                  Matter Description
                </p>
                <p className="text-warm-text text-sm">
                  {state.client.matterDescription}
                </p>
              </div>
            </>
          )}
        </div>

        <Divider />

        <div className="bg-gray-100/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-warm-muted">Consultation Fee</p>
              <p className="text-xs text-warm-muted/70 mt-1">
                Payable at the consultation
              </p>
            </div>
            <p className="text-xl sm:text-2xl font-serif font-bold text-gold">
              ₵{FIRM.consultationFeeGHS.toLocaleString("en-GH")}
            </p>
          </div>
        </div>
      </Card>

      <div className="bg-warm-surface/50 rounded-lg p-4">
        <p className="text-sm text-warm-muted">
          <strong className="text-warm-text">Important:</strong> This booking does not create a lawyer-client relationship. That relationship is established only when you formally engage the firm and sign a retainer agreement.
        </p>
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
        <Button onClick={onSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Confirming..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
