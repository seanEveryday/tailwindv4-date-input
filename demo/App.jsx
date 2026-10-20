import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DateInput, DateInputConfigProvider } from "../src/index.js";
import { RHFDateInput } from "../src/rhf.jsx";

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-tdi-border p-6 space-y-4 bg-tdi-surface">
      <h2 className="text-sm font-semibold text-tdi-text-muted uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  );
}

function RHFExample() {
  const methods = useForm({ defaultValues: { dob: "" } });
  const dob = methods.watch("dob");
  return (
    <FormProvider {...methods}>
      <RHFDateInput name="dob" label="Date of birth" inline required disableFuture />
      <p className="text-xs text-tdi-text-muted">stored value: {dob || "(empty)"}</p>
    </FormProvider>
  );
}

export function App() {
  const [mode, setMode] = useState("auto"); // auto | light | dark
  const [value, setValue] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (mode !== "auto") root.classList.add(mode);
  }, [mode]);

  return (
    <main className="min-h-screen p-10 max-w-xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-tdi-text">tailwindv4-date-input</h1>
        <div className="flex gap-1 text-sm">
          {["auto", "light", "dark"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={
                "px-3 py-1 rounded-tdi border border-tdi-border " +
                (mode === m ? "bg-tdi-accent text-tdi-accent-fg" : "text-tdi-text hover:bg-tdi-hover")
              }
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      <Section title="Controlled (no form library)">
        <DateInput label="Pick a date" inline value={value} onChange={setValue} />
        <p className="text-xs text-tdi-text-muted">stored value: {value || "(empty)"}</p>
      </Section>

      <Section title="react-hook-form adapter">
        <RHFExample />
      </Section>

      <Section title="en-AU format via provider (DD/MM/YYYY)">
        <DateInputConfigProvider dateFormat="DD/MM/YYYY">
          <DateInput label="Date" inline value={value} onChange={setValue} />
        </DateInputConfigProvider>
      </Section>

      <div className="brand-theme">
        <Section title="Custom theme (overridden tokens: purple accent, bigger radius)">
          <DateInput label="Pick a date" inline value={value} onChange={setValue} />
        </Section>
      </div>
    </main>
  );
}
