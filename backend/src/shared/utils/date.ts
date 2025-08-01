import { DateTime, Duration, Interval } from "luxon";
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
  const date = DateTime.fromISO(dateTime).setLocale("en");
  const dayName = date.weekdayLong?.toUpperCase();

  return Days[dayName as keyof typeof Days];
}

export function getTimeFromDateTime(dateTime: string): string {
  const date = DateTime.fromISO(dateTime);
  return date.toFormat("HH:mm");
}

export function isTimeIntervalInWorkingHours(
  fromTime: string,
  toTime: string,
  workingHours: { from: string; to: string }[],
): boolean {
  return workingHours.some(({ from, to }) => {
    return fromTime >= from && toTime <= to;
  });
}

function validateTimeFormat(time: string): void {
  if (!DateTime.fromFormat(time, "HH:mm").isValid) {
    throw new Error(`Invalid time format: ${time}. Expected format: HH:MM`);
  }
}

export function validateTimeIntervals(
  timeIntervals: { from: string; to: string }[],
): void {
  for (const timeInterval of timeIntervals) {
    validateTimeFormat(timeInterval.from);
    validateTimeFormat(timeInterval.to);

    if (timeInterval.from >= timeInterval.to) {
      throw new Error(
        `Invalid time interval: from time (${timeInterval.from}) must be earlier than to time (${timeInterval.to})`,
      );
    }
  }

  const intervals = timeIntervals.map(({ from, to }) =>
    Interval.fromDateTimes(
      DateTime.fromFormat(from, "HH:mm"),
      DateTime.fromFormat(to, "HH:mm"),
    ),
  );

  const hasOverlap = intervals.some((interval, index) =>
    intervals
      .slice(index + 1)
      .some((otherInterval) => interval.overlaps(otherInterval)),
  );

  if (hasOverlap) {
    throw new Error("Overlapping time intervals detected");
  }
}

export function validateDurationFormat(durationString: string): void {
  if (!Duration.fromISO(durationString).isValid) {
    throw new Error(
      `Invalid duration format: ${durationString}. Expected ISO 8601 format like P1D, P1W, P1M, P1Y, PT1H`,
    );
  }
}

export function addDurationToDate(
  durationString: string,
  fromDate?: string,
): string {
  const baseDate = fromDate ? DateTime.fromISO(fromDate) : DateTime.now();

  validateDurationFormat(durationString);

  const duration = Duration.fromISO(durationString);
  const resultDate = baseDate.plus(duration);
  return resultDate.toISO()!;
}

export function isIntervalInPast(
  fromDateTime: string,
  toDateTime: string,
): boolean {
  const now = DateTime.now();
  const fromDate = DateTime.fromISO(fromDateTime);
  const toDate = DateTime.fromISO(toDateTime);

  return fromDate < now || toDate < now;
}
