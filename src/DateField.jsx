import { useState, useRef, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import MaskedInput from "react-text-mask";
import clsx from "clsx";
import { TextInput } from "./TextInput";
import { CalendarPanel } from "./CalendarPanel";
import { DATE_FORMAT_BACKEND, parseStoredDate } from "./dateUtils";
import { DATE_POPOVER_ATTR } from "./popover";
import dayjs from "./dayjs";

const DATE_MASK = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

// Controlled field: `value` is the stored ISO "YYYY-MM-DD" (or ""), `onChange`
// emits the same. Display is localized through `format`.
export function DateField({
  id,
  fieldName,
  value,
  onChange,
  onBlur,
  inputRef,
  format,
  placeholder,
  disabled,
  error,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  classNames = {},
  ...props
}) {
  const toDisplay = (storedValue) => {
    const parsed = parseStoredDate(storedValue, format);
    return parsed ? parsed.format(format) : "";
  };

  const [text, setText] = useState(() => toDisplay(value));
  const buttonRef = useRef(null);

  useEffect(() => {
    setText(toDisplay(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, format]);

  const handleBlur = () => {
    if (!text) {
      if (value) onChange("");
      onBlur?.();
      return;
    }
    const parsed = dayjs(text, format, true);
    if (parsed.isValid()) {
      setText(parsed.format(format));
      onChange(parsed.format(DATE_FORMAT_BACKEND));
    } else {
      // Leave bad text in place so user can correct; clear stored value
      onChange("");
    }
    onBlur?.();
  };

  const handleSelect = (day) => {
    setText(day.format(format));
    onChange(day.format(DATE_FORMAT_BACKEND));
    buttonRef.current?.click(); // close popover
  };

  return (
    <Popover className="relative">
      <div className="relative">
        <MaskedInput
          mask={DATE_MASK}
          guide={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          render={(setMaskRef, maskedProps) => (
            <TextInput
              ref={(node) => {
                setMaskRef(node);
                if (typeof inputRef === "function") inputRef(node);
                else if (inputRef) inputRef.current = node;
              }}
              id={id}
              name={fieldName}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              disabled={disabled}
              data-invalid={error ? "" : undefined}
              placeholder={placeholder}
              className={classNames.input}
              {...maskedProps}
              {...props}
            />
          )}
        />
        <PopoverButton
          ref={buttonRef}
          type="button"
          disabled={disabled}
          aria-label="Open calendar"
          {...{ [DATE_POPOVER_ATTR]: "" }}
          className={clsx("absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-tdi-text-muted hover:text-tdi-text focus:outline-none", classNames.calendarButton)}
        >
          <CalendarIcon className="size-4" />
        </PopoverButton>
      </div>
      <PopoverPanel
        portal
        anchor="bottom start"
        {...{ [DATE_POPOVER_ATTR]: "" }}
        className={clsx("z-[1400] mt-1 rounded-lg bg-tdi-surface shadow-lg ring-1 ring-tdi-border", classNames.popover)}
      >
        <CalendarPanel
          value={text}
          onSelect={handleSelect}
          format={format}
          disableFuture={disableFuture}
          disablePast={disablePast}
          minDate={minDate}
          maxDate={maxDate}
          classNames={classNames}
        />
      </PopoverPanel>
    </Popover>
  );
}
