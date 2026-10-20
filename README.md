# tailwindv4-date-input

A themeable, accessible date input for React — a masked text field plus a popover
calendar — styled with **Tailwind CSS v4**. Ships default **light and dark** themes
and is fully restyleable through CSS theme tokens. Works standalone (controlled
`value`/`onChange`) or with **react-hook-form**.

- 🎨 Light + dark out of the box (OS preference *and* `.dark` class strategy)
- 🧩 Restyle via `--tdi-*` CSS variables, or override any element with `classNames`
- 📅 Masked typing (`MM/DD/YYYY`), strict parse-on-blur, min/max, disable past/future
- 🗓️ Stores/emits ISO `YYYY-MM-DD` regardless of display format
- ⚛️ Controlled core with an optional react-hook-form adapter (RHF is not required)

## Install

```bash
npm install tailwindv4-date-input
```

Peer dependencies: `react` >=18, `react-dom` >=18, `tailwindcss` ^4.
Optional: `react-hook-form` ^7 (only for the `/rhf` adapter).

## Setup

In your Tailwind v4 entry CSS, after importing Tailwind, import the preset and
point Tailwind at the package so its token utility classes are generated:

```css
@import "tailwindcss";
@import "tailwindv4-date-input/preset";
@source "../node_modules/tailwindv4-date-input/dist";
```

## Usage

### Controlled (any form, or none)

```jsx
import { DateInput } from "tailwindv4-date-input";

function Example() {
  const [value, setValue] = useState(""); // ISO "YYYY-MM-DD"
  return <DateInput label="Date of birth" inline value={value} onChange={setValue} disableFuture />;
}
```

### react-hook-form

```jsx
import { FormProvider, useForm } from "react-hook-form";
import { RHFDateInput } from "tailwindv4-date-input/rhf";

function Form() {
  const methods = useForm({ defaultValues: { dob: "" } });
  return (
    <FormProvider {...methods}>
      <RHFDateInput name="dob" label="Date of birth" inline required />
    </FormProvider>
  );
}
```

## Theming

### Dark mode

Dark applies automatically from the OS (`prefers-color-scheme`) and when a `.dark`
class is present on an ancestor (class strategy — matches most Tailwind apps). An
explicit `.light` / `.dark` class always wins over the OS preference.

### Override tokens

Set any token in your own CSS — globally or scoped to a subtree:

```css
:root {
  --tdi-accent: #7c3aed;      /* selected day + focus ring */
  --tdi-accent-hover: #6d28d9;
  --tdi-radius: 0.75rem;
}
.dark {
  --tdi-accent: #a78bfa;
}
```

| Token | Purpose |
| --- | --- |
| `--tdi-accent` / `--tdi-accent-hover` / `--tdi-accent-fg` | Selected day, focus ring, text on accent |
| `--tdi-accent-subtle` | Day hover background |
| `--tdi-surface` | Calendar popover background |
| `--tdi-input-bg` | Text field background |
| `--tdi-border` | Field + popover border |
| `--tdi-text` / `--tdi-text-muted` / `--tdi-text-subtle` | Text, labels/icon, out-of-month days |
| `--tdi-hover` | Month-nav button hover |
| `--tdi-error` / `--tdi-error-border` / `--tdi-error-bg` | Validation styling |
| `--tdi-radius` | Corner radius |

### Per-element classes

For finer control, pass a `classNames` slot map (merged after the defaults):

```jsx
<DateInput classNames={{ day: "font-medium", daySelected: "!bg-pink-600", popover: "shadow-xl" }} />
```

Slots: `root`, `label`, `input`, `calendarButton`, `popover`, `calendar`,
`navButton`, `monthSelect`, `yearInput`, `weekday`, `day`, `dayToday`,
`daySelected`, `dayOutside`, `dayDisabled`.

## Props (`DateInput`)

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `string` | Stored ISO `YYYY-MM-DD`, or `""` |
| `onChange` | `(value: string) => void` | Emits ISO `YYYY-MM-DD`, or `""` when cleared |
| `onBlur` | `() => void` | |
| `error` | `boolean \| string` | Truthy marks invalid; a string renders as the message |
| `label`, `description`, `required`, `disabled` | | |
| `inline`, `wrapLabel`, `size` | | `size`: `"small" \| "medium" \| "large" \| "full"` |
| `disableFuture`, `disablePast`, `minDate`, `maxDate` | | |
| `dateFormat` | `string` | e.g. `"DD/MM/YYYY"`; overrides the provider |
| `classNames` | object | Per-element overrides |

### App-wide format

```jsx
import { DateInputConfigProvider } from "tailwindv4-date-input";

<DateInputConfigProvider dateFormat="DD/MM/YYYY">
  <App />
</DateInputConfigProvider>;
```

## Development

```bash
npm install
npm run dev      # interactive demo (light / dark / custom theme)
npm run build    # ESM + CJS + .d.ts into dist/
```

## License

MIT
