const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Dates are formatted and manipulated in local calendar dates, but displayed with
 * an explicit "Africa/Accra (GMT, no daylight saving)" label in the UI.
 * Inputs are always ISO calendar dates (YYYY-MM-DD).
 */

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

export function addDaysISO(dateISO: string, days: number): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  dt.setDate(dt.getDate() + days);
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
}

export function getDayOfWeek(dateISO: string): number {
  const [y, m, d] = dateISO.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getDay();
}

export function formatDateLong(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return `${WEEKDAY_LONG[dt.getDay()]}, ${MONTH_NAMES[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
}

export function formatDateShort(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return `${pad(d)} ${MONTH_NAMES[dt.getMonth()].slice(0, 3)} ${y}`;
}

export function formatTime12(timeHHMM: string): string {
  const [hh, mm] = timeHHMM.split(":").map(Number);
  const isPM = (hh || 0) >= 12;
  const h = ((hh || 0) + 11) % 12 + 1;
  return `${h}:${pad(mm || 0)} ${isPM ? "PM" : "AM"}`;
}

export function monthLabel(dateISO: string): string {
  const [y, m] = dateISO.split("-").map(Number);
  return `${MONTH_NAMES[(m || 1) - 1]} ${y}`;
}

export function weekdaysForCalendar(firstDayOfWeek = 0): string[] {
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    out.push(WEEKDAY_SHORT[(i + firstDayOfWeek) % 7]);
  }
  return out;
}

export function buildCalendarGrid(dateISO: string, firstDayOfWeek = 0): (string | null)[] {
  const [y, m] = dateISO.split("-").map(Number);
  const firstOfMonth = new Date(y, (m || 1) - 1, 1);
  const lastOfMonth = new Date(y, (m || 1), 0);
  const leadingBlanks = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  const cells: (string | null)[] = new Array(leadingBlanks).fill(null);
  for (let d = 1; d <= lastOfMonth.getDate(); d++) {
    cells.push(`${y}-${pad(m)}-${pad(d)}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function isWeekendISO(dateISO: string): boolean {
  const dow = getDayOfWeek(dateISO);
  return dow === 0 || dow === 6;
}
