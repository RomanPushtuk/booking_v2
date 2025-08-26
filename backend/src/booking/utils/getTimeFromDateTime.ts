import { DateTime } from "luxon";

export const getTimeFromDateTime = (dateTime: string): string => {
  const date = DateTime.fromISO(dateTime);
  return date.toFormat("HH:mm");
};
