// Marks the calendar toggle button and popover panel so form-level onBlur
// autosave handlers can tell that focus is moving *within* the date widget
// (opening the calendar, paging months, picking a day) rather than leaving the
// field. Without this, each of those interactions bubbles a blur to the form and
// fires a save — including a stale save with the pre-selection value that races
// the real one.
export const DATE_POPOVER_ATTR = "data-datepicker-popover";

export const isWithinDatePopover = (el) => !!el?.closest?.(`[${DATE_POPOVER_ATTR}]`);
