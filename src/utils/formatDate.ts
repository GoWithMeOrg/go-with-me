import { DateTime } from "luxon";

export const formatDate = (date: Date | string | undefined, format: string): string => {
    return date ? DateTime.fromISO(date.toString()).toFormat(format) : "";
};
