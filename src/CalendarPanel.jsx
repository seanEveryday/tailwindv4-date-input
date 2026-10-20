import { useState, useEffect, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs from "./dayjs";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const buildMonthGrid = (viewDate) => {
  const startOfMonth = viewDate.startOf("month");
  const startWeekday = startOfMonth.day();
  const gridStart = startOfMonth.subtract(startWeekday, "day");
  return Array.from({ length: 42 }, (_, i) => gridStart.add(i, "day"));
};

const isDayDisabled = (day, { disableFuture, disablePast, minDate, maxDate }) => {
  const today = dayjs().startOf("day");
  if (disableFuture && day.isAfter(today, "day")) return true;
  if (disablePast && day.isBefore(today, "day")) return true;
  if (minDate && day.isBefore(dayjs(minDate), "day")) return true;
  if (maxDate && day.isAfter(dayjs(maxDate), "day")) return true;
  return false;
};

export function CalendarPanel({ value, onSelect, format, disableFuture, disablePast, minDate, maxDate, classNames = {} }) {
  const initial = useMemo(() => {
    const parsed = value ? dayjs(value, format, true) : null;
    return parsed && parsed.isValid() ? parsed : dayjs();
  }, [value, format]);

  const [viewDate, setViewDate] = useState(initial.startOf("month"));

  useEffect(() => {
    setViewDate(initial.startOf("month"));
  }, [initial]);

  const days = useMemo(() => buildMonthGrid(viewDate), [viewDate]);
  const today = dayjs().startOf("day");
  const selected = value ? dayjs(value, format, true) : null;

  return (
    <div className={clsx("w-72 p-3 select-none", classNames.calendar)}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setViewDate((d) => d.subtract(1, "month"))}
          className={clsx("p-1 rounded text-tdi-text hover:bg-tdi-hover", classNames.navButton)}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          <select
            value={viewDate.month()}
            onChange={(e) => setViewDate((d) => d.month(Number(e.target.value)))}
            className={clsx("text-sm text-tdi-text bg-transparent rounded px-1 py-0.5 hover:bg-tdi-hover focus:outline-none", classNames.monthSelect)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {dayjs().month(i).format("MMMM")}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={viewDate.year()}
            onChange={(e) => {
              const y = Number(e.target.value);
              if (!Number.isNaN(y)) setViewDate((d) => d.year(y));
            }}
            className={clsx("w-16 text-sm text-tdi-text bg-transparent rounded px-1 py-0.5 hover:bg-tdi-hover focus:outline-none", classNames.yearInput)}
          />
        </div>
        <button
          type="button"
          onClick={() => setViewDate((d) => d.add(1, "month"))}
          className={clsx("p-1 rounded text-tdi-text hover:bg-tdi-hover", classNames.navButton)}
          aria-label="Next month"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-xs text-tdi-text-muted mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className={clsx("text-center py-1", classNames.weekday)}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => {
          const isOutside = day.month() !== viewDate.month();
          const isToday = day.isSame(today, "day");
          const isSelected = selected && selected.isValid() && day.isSame(selected, "day");
          const disabled = isDayDisabled(day, { disableFuture, disablePast, minDate, maxDate });
          return (
            <button
              key={day.format("YYYY-MM-DD")}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={clsx(
                "text-sm rounded h-8 w-8 flex items-center justify-center transition-colors",
                classNames.day,
                disabled && clsx("opacity-30 cursor-not-allowed", classNames.dayDisabled),
                !disabled && "hover:bg-tdi-accent-subtle cursor-pointer",
                isOutside && !isSelected && clsx("text-tdi-text-subtle", classNames.dayOutside),
                !isOutside && !isSelected && "text-tdi-text",
                isToday && !isSelected && clsx("ring-1 ring-tdi-accent", classNames.dayToday),
                isSelected && clsx("bg-tdi-accent text-tdi-accent-fg hover:bg-tdi-accent-hover", classNames.daySelected),
              )}
            >
              {day.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
