import * as React from "react";
import type { Control } from "react-hook-form";
import type { DateInputProps } from "./index";

export interface RHFDateInputProps extends Omit<DateInputProps, "value" | "onChange" | "onBlur" | "error" | "inputRef"> {
  name: string;
  /** Optional — falls back to the surrounding <FormProvider> context. */
  control?: Control<any>;
  rules?: Record<string, unknown>;
}

export const RHFDateInput: React.FC<RHFDateInputProps>;
