import * as React from "react";

export type DateInputSize = "small" | "medium" | "large" | "full";

/** Per-element class overrides, merged after the default token classes. */
export interface DateInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  calendarButton?: string;
  popover?: string;
  calendar?: string;
  navButton?: string;
  monthSelect?: string;
  yearInput?: string;
  weekday?: string;
  day?: string;
  dayToday?: string;
  daySelected?: string;
  dayOutside?: string;
  dayDisabled?: string;
}

export interface DateInputProps {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  description?: React.ReactNode;
  /** Stored ISO value "YYYY-MM-DD", or "". */
  value?: string;
  /** Receives the stored ISO value "YYYY-MM-DD", or "" when cleared. */
  onChange?: (value: string) => void;
  onBlur?: () => void;
  /** Truthy marks the field invalid; a string also renders as the error message. */
  error?: boolean | string;
  inline?: boolean;
  wrapLabel?: boolean;
  size?: DateInputSize;
  disableFuture?: boolean;
  disablePast?: boolean;
  minDate?: string | Date;
  maxDate?: string | Date;
  /** Display format, e.g. "MM/DD/YYYY" or "DD/MM/YYYY". Overrides the provider. */
  dateFormat?: string;
  classNames?: DateInputClassNames;
  inputRef?: React.Ref<HTMLInputElement> | ((node: HTMLInputElement | null) => void);
}

export const DateInput: React.FC<DateInputProps>;

export interface DateInputConfigProviderProps {
  dateFormat?: string;
  children?: React.ReactNode;
}
export const DateInputConfigProvider: React.FC<DateInputConfigProviderProps>;
export function useDateInputConfig(): { dateFormat: string };

export const DATE_FORMAT_BACKEND: "YYYY-MM-DD";
export const DEFAULT_DATE_FORMAT: string;
export function parseStoredDate(value: unknown, dateFormat?: string): import("dayjs").Dayjs | null;

export const DATE_POPOVER_ATTR: string;
export function isWithinDatePopover(el: Element | null | undefined): boolean;
