import { Controller, useFormContext, get } from "react-hook-form";
import { DateInput } from "./DateInput";

// react-hook-form adapter. Pass `control` explicitly, or render inside a
// <FormProvider> and it reads context. Wires value/onChange/onBlur and surfaces
// the field's validation message as DateInput's `error`.
export function RHFDateInput({ name, control: controlProp, rules, ...props }) {
  const formContext = useFormContext();
  const control = controlProp || formContext?.control;

  if (!control) {
    throw new Error(
      "RHFDateInput requires a react-hook-form `control` — pass it as a prop or render inside a <FormProvider>.",
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, onBlur, ref, name: fieldName }, formState: { errors } }) => {
        const fieldError = get(errors, name);
        return (
          <DateInput
            {...props}
            name={fieldName}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={fieldError?.message || !!fieldError}
          />
        );
      }}
    />
  );
}
