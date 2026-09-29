import type {
  BookingService,
  TimeSlot,
  BookingWizardState,
  BookingConfirmation,
  AttorneyId,
  PracticeAreaId,
} from "@/types";
import { FIRM } from "@/lib/config";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function generateDateWindow(dateFromISO: string, days: number): string[] {
  const start = new Date(dateFromISO + "T00:00:00Z");
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

const STANDARD_SLOT_TIMES = [
  "09:00", "09:45", "10:30", "11:15",
  "12:00", "13:30", "14:15", "15:00", "15:45", "16:30",
];

function isWeekend(dateISO: string): boolean {
  const dow = new Date(dateISO + "T00:00:00Z").getUTCDay();
  return dow === 0 || dow === 6;
}

function seededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const MockBookingService: BookingService = {
  async getAvailableSlots(params: {
    dateFromISO: string;
    days: number;
    attorneyId?: AttorneyId;
    practiceAreaId?: PracticeAreaId;
  }) {
    await delay(700 + Math.floor(Math.random() * 400));
    const dates = generateDateWindow(params.dateFromISO, params.days);
    const out: Record<string, TimeSlot[]> = {};
    for (const dateISO of dates) {
      if (isWeekend(dateISO)) {
        out[dateISO] = [];
        continue;
      }
      const seedKey = `${params.attorneyId ?? "any"}|${params.practiceAreaId ?? "any"}|${dateISO}`;
      const rand = seededRandom(seedKey);
      out[dateISO] = STANDARD_SLOT_TIMES.map((time) => ({
        dateISO,
        time,
        attorneyId: params.attorneyId && params.attorneyId !== "any" ? params.attorneyId : undefined,
        available: rand() > 0.25,
      }));
    }
    return out;
  },

  async submitBooking(state: BookingWizardState): Promise<BookingConfirmation> {
    await delay(900 + Math.floor(Math.random() * 600));
    const shouldFail = Math.random() < 0.12;
    if (shouldFail) {
      const err = new Error("[Mock booking submission failed. Please retry.]");
      (err as any).code = "BOOKING_MOCK_FAILURE";
      throw err;
    }
    const todayISO = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    const reference = `FIRM-${todayISO}-${suffix}`;
    return {
      reference,
      summary: state,
      consultationFeeGHS: FIRM.consultationFeeGHS,
    };
  },
};

/**
 * FUTURE HttpBookingService stub — DISABLED BY DEFAULT.
 * To connect a real backend, replace `MockBookingService` with
 * `HttpBookingService` and ensure the following env var is set:
 *   NEXT_PUBLIC_BOOKING_ENDPOINT=https://api.your-firm.example/v1/bookings
 *
 * IMPORTANT: This is a skeleton only — production use requires authenticated
 * calls, idempotency keys, and proper error mapping.
 */
const NEXT_PUBLIC_BOOKING_ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;
const _HttpBookingService: BookingService = {
  async getAvailableSlots(params) {
    if (!NEXT_PUBLIC_BOOKING_ENDPOINT) throw new Error("NEXT_PUBLIC_BOOKING_ENDPOINT not set");
    const qs = new URLSearchParams({
      dateFrom: params.dateFromISO,
      days: String(params.days),
      ...(params.attorneyId ? { attorneyId: params.attorneyId } : {}),
      ...(params.practiceAreaId ? { practiceAreaId: params.practiceAreaId } : {}),
    });
    const res = await fetch(`${NEXT_PUBLIC_BOOKING_ENDPOINT}/slots?${qs}`);
    if (!res.ok) throw new Error(`Failed to fetch slots (${res.status})`);
    return res.json();
  },
  async submitBooking(state) {
    if (!NEXT_PUBLIC_BOOKING_ENDPOINT) throw new Error("NEXT_PUBLIC_BOOKING_ENDPOINT not set");
    const res = await fetch(`${NEXT_PUBLIC_BOOKING_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    if (!res.ok) throw new Error(`Booking failed (${res.status})`);
    return res.json();
  },
};

export const bookingService: BookingService = MockBookingService;
