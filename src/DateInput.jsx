import clsx from "clsx";
import { DateField } from "./DateField";
import { useResolvedDateFormat } from "./config";

// Controlled, form-library-agnostic date input.
//   value    stored ISO "YYYY-MM-DD" (or "")
//   onChange (isoString) => void
//   onBlur   () => void
//   error    truthy to mark invalid; a string renders as the error message
// For react-hook-form, use the <RHFDateInput> adapter from "tailwindv4-date-input/rhf".
export function DateInput({
  id,
  name,
  label,
  required,
  disabled,
  description,
  value,
  onChange,
  onBlur,
  error,
  inline = false,
  wrapLabel = false,
  size = "small", // "small" | "medium" | "large" | "full"
  disableFuture = false,
  disablePast = false,
  minDate,
  maxDate,
  dateFormat,
  classNames = {},
  inputRef,
  ...props
}) {
  const format = useResolvedDateFormat(dateFormat);
  const placeholder = format.toLowerCase();
  const inputId = id || name;
  const errorMessage = typeof error === "string" ? error : undefined;

  return (
    <div className={clsx("space-y-0", classNames.root)}>
      <div className={clsx(inline && "flex items-center gap-2")}>
        {label && (
          <label htmlFor={inputId} className={clsx("text-sm text-tdi-text", wrapLabel ? "shrink" : "shrink-0", classNames.label)}>
            {label}
            {required && <span className="text-tdi-error ml-1">*</span>}
          </label>
        )}

        {description && !inline && <p className="text-sm text-tdi-text-muted">{description}</p>}

        <div
          className={clsx(
            inline && "flex-1",
            size === "small" && "w-25",
            size === "medium" && "w-35",
            size === "large" && "w-50",
            "max-w-full min-w-0",
          )}
        >
          <DateField
            id={inputId}
            fieldName={name}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={inputRef}
            format={format}
            placeholder={placeholder}
            disabled={disabled}
            error={!!error}
            disableFuture={disableFuture}
            disablePast={disablePast}
            minDate={minDate}
            maxDate={maxDate}
            classNames={classNames}
            {...props}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-tdi-error-bg border border-tdi-error-border px-3 py-2">
          <p className="text-sm text-tdi-error">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
