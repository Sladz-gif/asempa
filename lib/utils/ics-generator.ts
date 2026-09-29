function pad(n: number, length = 2): string {
  return String(n).padStart(length, "0");
}

function toICSDate(d: Date, allDay = false): string {
  const y = d.getUTCFullYear();
  const m = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  if (allDay) return `${y}${m}${day}`;
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  return `${y}${m}${day}T${hh}${mm}${ss}Z`;
}

export interface ICSAppointment {
  summary: string;
  description: string;
  location: string;
  startISO: string;        // "YYYY-MM-DD"
  startTime: string;      // "HH:MM" in Africa/Accra (GMT)
  durationMinutes: number;
  organizerName: string;
  organizerEmail: string;
  uidSuffix?: string;
}

/**
 * Client-side ICS (iCalendar) file generator for the booking confirmation
 * screen. Dates are treated as Africa/Accra (UTC±0 / GMT, no DST).
 * Returns the .ics file contents as a string; the caller triggers a download.
 */
export function generateICS(evt: ICSAppointment): string {
  const [y, m, d] = evt.startISO.split("-").map(Number);
  const [hh, mm] = evt.startTime.split(":").map(Number);
  const start = new Date(Date.UTC(y, (m || 1) - 1, d || 1, hh || 9, mm || 0, 0));
  const end = new Date(start.getTime() + (evt.durationMinutes || 60) * 60_000);
  const created = new Date();
  const uid = `${evt.uidSuffix ?? "appt"}-${start.getTime()}@${
    (typeof location !== "undefined" && location?.hostname) || "firm.local"
  }`;
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Law Firm Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(created)}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${evt.summary.replace(/\n/g, " ")}`,
    `DESCRIPTION:${evt.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${evt.location.replace(/\n/g, " ")}`,
    `ORGANIZER;CN=${evt.organizerName.replace(/,/g, "\\,")}:mailto:${evt.organizerEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

export function downloadICS(filename: string, ics: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
