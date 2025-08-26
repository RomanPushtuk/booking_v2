import { DateTime } from "luxon";

export const isSameDay = (
  fromDateTime: string,
  toDateTime: string,
): boolean => {
  const fromDate = DateTime.fromISO(fromDateTime);
  const toDate = DateTime.fromISO(toDateTime);

  return fromDate.hasSame(toDate, "day");
};
