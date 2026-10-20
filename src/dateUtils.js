import dayjs from "./dayjs";

// Storage contract: the field always emits/stores an ISO date "YYYY-MM-DD",
// regardless of the display `dateFormat`. parseStoredDate accepts an ISO string,
// a dayjs object, a string in the current display format, or anything dayjs can
// loosely parse — so values round-trip even if the display format changes.
export const DATE_FORMAT_BACKEND = "YYYY-MM-DD";

export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

export const parseStoredDate = (value, dateFormat = DEFAULT_DATE_FORMAT) => {
  if (!value || value === "") return null;
  if (dayjs.isDayjs(value)) return value.isValid() ? value : null;
  const iso = dayjs.utc(value, DATE_FORMAT_BACKEND, true);
  if (iso.isValid()) return iso;
  const display = dayjs.utc(value, dateFormat, true);
  if (display.isValid()) return display;
  const loose = dayjs.utc(value);
  return loose.isValid() ? loose : null;
};
