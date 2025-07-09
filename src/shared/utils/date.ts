import { DateTime, Interval } from "luxon";
import { Days } from "../enums/Days";

export function intervalsOverlap(
  fromA: string,
  toA: string,
  fromB: string,
  toB: string,
): boolean {
  const intervalA = Interval.fromDateTimes(
    DateTime.fromISO(fromA),
    DateTime.fromISO(toA),
  );
  const intervalB = Interval.fromDateTimes(
    DateTime.fromISO(fromB),
    DateTime.fromISO(toB),
  );

  return intervalA.overlaps(intervalB);
}

export function isSameDay(fromDateTime: string, toDateTime: string): boolean {
  const fromDate = DateTime.fromISO(fromDateTime);
  const toDate = DateTime.fromISO(toDateTime);

  return fromDate.hasSame(toDate, "day");
}

export function getDayOfWeek(dateTime: string): Days {
  const date = DateTime.fromISO(dateTime).setLocale('en');
  const dayName = date.weekdayLong?.toUpperCase();

  return Days[dayName as keyof typeof Days];
}

export function getTimeFromDateTime(dateTime: string): string {
  const date = DateTime.fromISO(dateTime);
  return date.toFormat("HH:mm");
}

export function isTimeInWorkingHours(
  time: string,
  workingHours: { from: string; to: string }[],
): boolean {
  return workingHours.some(({ from, to }) => {
    return time >= from && time <= to;
  });
}
