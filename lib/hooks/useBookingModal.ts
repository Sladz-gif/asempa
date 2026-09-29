"use client";

import { create } from "zustand";

interface BookingModalState {
  isOpen: boolean;
  initialPracticeAreaId?: string;
  initialAttorneyId?: string;
  open: (params?: { practiceAreaId?: string; attorneyId?: string }) => void;
  close: () => void;
}

export const useBookingModal = create<BookingModalState>((set) => ({
  isOpen: false,
  initialPracticeAreaId: undefined,
  initialAttorneyId: undefined,
  open: (params) =>
    set({
      isOpen: true,
      initialPracticeAreaId: params?.practiceAreaId,
      initialAttorneyId: params?.attorneyId,
    }),
  close: () =>
    set({
      isOpen: false,
      initialPracticeAreaId: undefined,
      initialAttorneyId: undefined,
    }),
}));
