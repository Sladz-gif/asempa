"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { BookingWizard } from "./BookingWizard";
import { cn } from "@/lib/utils/cn";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPracticeAreaId?: string;
  initialAttorneyId?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialPracticeAreaId,
  initialAttorneyId,
}: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative bg-white w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-lg border border-gold-sh/30 shadow-gold-lg",
          "animate-in fade-in zoom-in duration-200"
        )}
      >
        <div className="sticky top-0 bg-white border-b border-gold-sh/20 p-3 sm:p-4 md:p-6 flex items-center justify-between z-10 gap-3">
          <h2 id="booking-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-warm-text truncate">
            Book a Consultation
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-warm-muted hover:text-gold transition-colors rounded-md hover:bg-gray-100 shrink-0"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <BookingWizard
            initialPracticeAreaId={initialPracticeAreaId}
            initialAttorneyId={initialAttorneyId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
