export type ConsultationType = "in-person" | "phone" | "video";
export type PracticeAreaId = string;
export type AttorneyId = string | "any";

export interface TimeSlot {
  dateISO: string;
  time: string;
  available: boolean;
  attorneyId?: string;
}

export interface BookingClientDetails {
  fullName: string;
  phone: string;
  email: string;
  matterDescription?: string;
  consent: true;
}

export interface BookingWizardState {
  step: 1 | 2 | 3 | 4 | 5 | 6;
  practiceAreaId?: PracticeAreaId;
  consultationType?: ConsultationType;
  attorneyId?: AttorneyId;
  selectedDateISO?: string;
  selectedTime?: string;
  client?: BookingClientDetails;
}

export interface BookingConfirmation {
  reference: string;
  summary: BookingWizardState;
  consultationFeeGHS: number;
}

export interface BookingService {
  getAvailableSlots(params: {
    dateFromISO: string;
    days: number;
    attorneyId?: AttorneyId;
    practiceAreaId?: PracticeAreaId;
  }): Promise<Record<string, TimeSlot[]>>;

  submitBooking(state: BookingWizardState): Promise<BookingConfirmation>;
}
