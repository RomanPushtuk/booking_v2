import { DateTime } from "luxon";

export const isIntervalInPast = (
  fromDateTime: string,
  toDateTime: string,
): boolean => {
  const now = DateTime.now();
  const fromDate = DateTime.fromISO(fromDateTime);
  const toDate = DateTime.fromISO(toDateTime);

  return fromDate < now || toDate < now;
};
