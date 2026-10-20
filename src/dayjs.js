import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

// The date field needs UTC (so stored ISO values are not shifted by the local
// timezone) and customParseFormat (so strict parsing against a display format
// string works, e.g. dayjs(text, "MM/DD/YYYY", true)).
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default dayjs;
