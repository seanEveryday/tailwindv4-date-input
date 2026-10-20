import { createContext, useContext } from "react";
import { DEFAULT_DATE_FORMAT } from "./dateUtils";

// Lets an app set the display date format once (e.g. "DD/MM/YYYY" for en-AU)
// instead of passing `dateFormat` to every <DateInput>. A `dateFormat` prop on
// an individual input always wins over the provider value.
const DateInputConfigContext = createContext({ dateFormat: DEFAULT_DATE_FORMAT });

export function DateInputConfigProvider({ dateFormat = DEFAULT_DATE_FORMAT, children }) {
  return <DateInputConfigContext.Provider value={{ dateFormat }}>{children}</DateInputConfigContext.Provider>;
}

export function useDateInputConfig() {
  return useContext(DateInputConfigContext);
}

// Resolve the effective format: explicit prop > provider > default.
export function useResolvedDateFormat(explicitFormat) {
  const { dateFormat } = useDateInputConfig();
  return explicitFormat || dateFormat || DEFAULT_DATE_FORMAT;
}
