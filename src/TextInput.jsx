import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";

// Vendored and tokenized from the host app's Catalyst-style TextInput. All
// literal palette colors (teal/zinc/white/red) were replaced with `tdi-*` theme
// tokens defined in styles/preset.css, so a `.dark` ancestor and consumer token
// overrides restyle it without touching this file.
export const TextInput = forwardRef(function TextInput({ className, ...props }, ref) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        "relative block w-full",
        // Inset background + rounded surface
        "before:absolute before:inset-px before:rounded-[calc(var(--radius-tdi)-1px)] before:bg-tdi-input-bg",
        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-tdi after:ring-transparent after:ring-inset focus-within:after:ring-2 focus-within:after:ring-tdi-accent",
        // Disabled state
        "has-data-disabled:opacity-50 has-data-disabled:before:shadow-none",
      ])}
    >
      <Headless.Input
        ref={ref}
        {...props}
        className={clsx([
          // Basic layout
          "relative block w-full appearance-none rounded-tdi border border-tdi-border px-3 py-1.5",
          // Typography
          "text-sm/6 text-tdi-text placeholder:text-tdi-text-muted",
          // Background color
          "bg-transparent",
          // Hide default focus styles
          "focus:outline-hidden",
          // Invalid state
          "data-invalid:border-tdi-error-border",
          // Disabled state
          "data-disabled:border-tdi-border data-disabled:opacity-60",
        ])}
      />
    </span>
  );
});
