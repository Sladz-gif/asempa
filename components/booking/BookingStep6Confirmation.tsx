"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { cn } from "@/lib/utils/cn";
import { FIRM } from "@/lib/config";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { Calendar, Download, Phone, MessageCircle } from "lucide-react";
import type { BookingConfirmation } from "@/types";

interface BookingStep6ConfirmationProps {
  confirmation: BookingConfirmation;
  onReset: () => void;
}

export function BookingStep6Confirmation({
  confirmation,
  onReset,
}: BookingStep6ConfirmationProps) {
  const { reference, summary, consultationFeeGHS } = confirmation;

  const practiceArea = summary.practiceAreaId
    ? practiceAreas.find((pa) => pa.id === summary.practiceAreaId)
    : null;
  const attorney = summary.attorneyId && summary.attorneyId !== "any"
    ? attorneys.find((a) => a.id === summary.attorneyId)
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

  const generateICS = () => {
    const dateISO = summary.selectedDateISO || "";
    const time = summary.selectedTime || "09:00";
    const [hours, minutes] = time.split(":").map(Number);

    const startDate = new Date(dateISO + "T00:00:00Z");
    startDate.setUTCHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setUTCHours(hours + 1, minutes, 0, 0);

    const formatDateICS = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Asempa Bediako & CO//Booking//EN",
      "BEGIN:VEVENT",
      `UID:${reference}@asempabediako.com`,
      `DTSTAMP:${formatDateICS(new Date())}`,
      `DTSTART:${formatDateICS(startDate)}`,
      `DTEND:${formatDateICS(endDate)}`,
      `SUMMARY:Legal Consultation - ${FIRM.name}`,
      `DESCRIPTION:Consultation with ${attorney?.fullName.replace(/[[\]]/g, "") || "Attorney"} at ${FIRM.name}\\n\\nReference: ${reference}\\n\\nPractice Area: ${practiceArea?.name.replace(/[[\]]/g, "") || "General"}`,
      `LOCATION:${FIRM.address}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consultation-${reference}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-text mb-2">
          Booking Confirmed
        </h2>
        <p className="text-sm sm:text-base text-warm-muted">
          Your consultation has been successfully booked.
        </p>
      </div>

      <Card className="p-4 sm:p-6 space-y-4">
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
          <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
            Reference Number
          </p>
          <p className="text-lg sm:text-xl font-mono font-bold text-gold break-all">
            {reference}
          </p>
        </div>

        <Divider />

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
              {summary.consultationType
                ? consultationTypeLabels[summary.consultationType]
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
                : summary.attorneyId === "any"
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
              {summary.selectedDateISO && summary.selectedTime
                ? `${formatDate(summary.selectedDateISO)} at ${summary.selectedTime} (Africa/Accra)`
                : "Not selected"}
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-xs text-warm-muted uppercase tracking-wider mb-1">
              Consultation Fee
            </p>
            <p className="text-warm-text font-medium text-sm sm:text-base">
              ₵{consultationFeeGHS.toLocaleString("en-GH")}
            </p>
            <p className="text-xs text-warm-muted mt-1">
              Payable at the consultation
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button
          onClick={generateICS}
          variant="outline"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Add to Calendar
        </Button>

        <a
          href={`tel:${FIRM.phone}`}
          className="block"
        >
          <Button variant="outline" className="w-full">
            <Phone className="w-4 h-4 mr-2" />
            Call Us
          </Button>
        </a>

        <a
          href={`https://wa.me/${FIRM.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="outline" className="w-full">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp Us
          </Button>
        </a>
      </div>

      <div className="bg-warm-surface/50 rounded-lg p-4">
        <p className="text-sm text-warm-muted">
          <strong className="text-warm-text">Important:</strong> Please arrive 10 minutes early for in-person consultations. For phone or video consultations, ensure you have a stable connection. If you need to reschedule, please contact us at least 24 hours in advance.
        </p>
      </div>

      <div className="text-center pt-4">
        <Button onClick={onReset} variant="ghost" className="w-full sm:w-auto">
          Book Another Consultation
        </Button>
      </div>
    </div>
  );
}
