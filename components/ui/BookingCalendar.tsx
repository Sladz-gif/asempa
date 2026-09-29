"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  todayISO,
  addDaysISO,
  isWeekendISO,
  buildCalendarGrid,
  weekdaysForCalendar,
  monthLabel,
  formatDateLong,
  pad,
} from "@/lib/utils/format-date";

interface BookingCalendarProps {
  startFromISO?: string;
  daysWindow?: number;
  availableByDate?: Record<string, boolean>;
  selectedDateISO?: string | null;
  onSelect?: (dateISO: string) => void;
  disableWeekends?: boolean;
  label?: string;
  id?: string;
}

/**
 * Keyboard-accessible month-calendar component showing the next N days.
 *
 * Controls:
 *  - Arrow keys: move by day (left/right) or week (up/down)
 *  - Home / End: first / last day of the month window
 *  - PageUp / PageDown: prev / next month
 *  - Enter / Space: select the focused date
 */
export function BookingCalendar({
  startFromISO,
  daysWindow = 30,
  availableByDate,
  selectedDateISO,
  onSelect,
  disableWeekends = true,
  label = "Choose a date",
  id = "booking-calendar",
}: BookingCalendarProps) {
  const base = startFromISO ?? todayISO();
  const lastDateISO = useMemo(() => addDaysISO(base, daysWindow - 1), [base, daysWindow]);

  const [viewMonthISO, setViewMonthISO] = useState<string>(() => {
    const [y, m] = base.split("-");
    return `${y}-${m}-01`;
  });
  const grid = useMemo(() => buildCalendarGrid(viewMonthISO, 1), [viewMonthISO]);
  const weekdays = useMemo(() => weekdaysForCalendar(1), []);

  const [focusedISO, setFocusedISO] = useState<string>(base);

  useEffect(() => {
    if (!selectedDateISO) return;
    const [y, m] = selectedDateISO.split("-");
    setViewMonthISO((prev) => {
      const [py, pm] = prev.split("-");
      return py === y && pm === m ? prev : `${y}-${m}-01`;
    });
  }, [selectedDateISO]);

  const isInWindow = useCallback(
    (iso: string) => iso >= base && iso <= lastDateISO,
    [base, lastDateISO]
  );
  const isDateSelectable = useCallback(
    (iso: string) => {
      if (!isInWindow(iso)) return false;
      if (disableWeekends && isWeekendISO(iso)) return false;
      if (availableByDate) return availableByDate[iso] ?? true;
      return true;
    },
    [availableByDate, disableWeekends, isInWindow]
  );

  const shiftFocus = useCallback(
    (current: string, days: number) => {
      let next = addDaysISO(current, days);
      let guard = 0;
      while (!isDateSelectable(next) && guard < 60) {
        next = addDaysISO(next, days >= 0 ? 1 : -1);
        guard++;
      }
      if (isInWindow(next) || isDateSelectable(next)) {
        setFocusedISO(next);
        const [ny, nm] = next.split("-");
        setViewMonthISO((p) => {
          const [py, pm] = p.split("-");
          return py === ny && pm === nm ? p : `${ny}-${nm}-01`;
        });
      }
    },
    [isDateSelectable, isInWindow]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableElement>) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          shiftFocus(focusedISO, 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          shiftFocus(focusedISO, -1);
          break;
        case "ArrowDown":
          e.preventDefault();
          shiftFocus(focusedISO, 7);
          break;
        case "ArrowUp":
          e.preventDefault();
          shiftFocus(focusedISO, -7);
          break;
        case "Home":
          e.preventDefault();
          setFocusedISO(base);
          break;
        case "End":
          e.preventDefault();
          setFocusedISO(lastDateISO);
          break;
        case "PageUp": {
          e.preventDefault();
          setViewMonthISO((prev) => {
            const [y, m] = prev.split("-").map(Number);
            const prevM = m === 1 ? 12 : m - 1;
            const prevY = m === 1 ? y - 1 : y;
            return `${prevY}-${pad(prevM)}-01`;
          });
          break;
        }
        case "PageDown": {
          e.preventDefault();
          setViewMonthISO((prev) => {
            const [y, m] = prev.split("-").map(Number);
            const nextM = m === 12 ? 1 : m + 1;
            const nextY = m === 12 ? y + 1 : y;
            return `${nextY}-${pad(nextM)}-01`;
          });
          break;
        }
        case "Enter":
        case " ":
          e.preventDefault();
          if (isDateSelectable(focusedISO)) onSelect?.(focusedISO);
          break;
      }
    },
    [focusedISO, shiftFocus, base, lastDateISO, isDateSelectable, onSelect]
  );

  const canPrev = (() => {
    const firstCellDate = grid.find((c) => c !== null);
    return firstCellDate ? firstCellDate > base : true;
  })();
  const canNext = (() => {
    const lastCellDate = [...grid].reverse().find((c) => c !== null);
    return lastCellDate ? lastCellDate < lastDateISO : true;
  })();

  return (
    <div id={id} className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 md:p-6">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow !mb-1" />
          <h3 className="font-serif text-base sm:text-lg md:text-xl text-warm-text truncate">{label}</h3>
          {selectedDateISO && (
            <p className="mt-1 text-xs sm:text-sm text-gold truncate">{formatDateLong(selectedDateISO)}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() =>
              setViewMonthISO((prev) => {
                const [y, m] = prev.split("-").map(Number);
                const prevM = m === 1 ? 12 : m - 1;
                const prevY = m === 1 ? y - 1 : y;
                return `${prevY}-${pad(prevM)}-01`;
              })
            }
            disabled={!canPrev}
            aria-label="Previous month"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-md border border-gray-300 bg-white text-warm-text hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-warm-text transition-colors inline-flex items-center justify-center"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <div className="min-w-[100px] sm:min-w-[140px] text-center font-serif text-sm sm:text-base md:text-lg text-warm-text">
            {monthLabel(viewMonthISO)}
          </div>
          <button
            type="button"
            onClick={() =>
              setViewMonthISO((prev) => {
                const [y, m] = prev.split("-").map(Number);
                const nextM = m === 12 ? 1 : m + 1;
                const nextY = m === 12 ? y + 1 : y;
                return `${nextY}-${pad(nextM)}-01`;
              })
            }
            disabled={!canNext}
            aria-label="Next month"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-md border border-gray-300 bg-white text-warm-text hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-warm-text transition-colors inline-flex items-center justify-center"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] sm:text-xs text-warm-muted">
        <span>Showing the next {daysWindow} days · Africa/Accra (GMT)</span>
        <span className="hidden sm:inline">· Weekends disabled</span>
      </div>

      <div className="overflow-x-auto w-full -mx-1 px-1">
        <table
          role="grid"
          aria-label={label}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-2 w-full min-w-[320px] border-separate border-spacing-0.5 sm:border-spacing-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-white rounded-lg table-fixed"
        >
        <thead>
          <tr>
            {weekdays.map((wd) => (
              <th
                key={wd}
                scope="col"
                className="pb-1.5 sm:pb-2 text-center text-[10px] sm:text-xs uppercase tracking-widgold text-warm-muted font-medium"
              >
                {wd}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunk(grid, 7).map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((dateISO, cIdx) => {
                if (!dateISO) return <td key={cIdx} aria-hidden="true" className="h-10 sm:h-12 md:h-14" />;
                const disabled = !isDateSelectable(dateISO);
                const selected = dateISO === selectedDateISO;
                const isFocused = dateISO === focusedISO;
                const dayNum = Number(dateISO.split("-")[2]);
                return (
                  <td key={dateISO} className="relative h-10 sm:h-12 md:h-14 p-0.5">
                    <button
                      type="button"
                      tabIndex={isFocused ? 0 : -1}
                      disabled={disabled}
                      onClick={() => !disabled && onSelect?.(dateISO)}
                      onMouseEnter={() => setFocusedISO(dateISO)}
                      role="gridcell"
                      aria-selected={selected}
                      aria-disabled={disabled}
                      aria-label={formatDateLong(dateISO)}
                      className={cn(
                        "h-full w-full rounded-md text-xs sm:text-sm md:text-base font-medium transition-all duration-200 relative",
                        "focus:outline-none",
                        selected
                          ? "bg-gold text-black-900 shadow-gold scale-[1.03] z-10"
                          : disabled
                          ? "text-warm-muted/35 cursor-not-allowed bg-gray-100/50 line-through"
                          : "bg-white text-warm-text hover:bg-gray-100 hover:text-gold hover:ring-2 hover:ring-gold/60"
                      )}
                    >
                      {dayNum}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
