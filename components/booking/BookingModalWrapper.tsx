"use client";

import { BookingModal } from "./BookingModal";
import { useBookingModal } from "@/lib/hooks/useBookingModal";

export function BookingModalWrapper() {
  const { isOpen, close, initialPracticeAreaId, initialAttorneyId } = useBookingModal();

  return (
    <BookingModal
      isOpen={isOpen}
      onClose={close}
      initialPracticeAreaId={initialPracticeAreaId}
      initialAttorneyId={initialAttorneyId}
    />
  );
}
