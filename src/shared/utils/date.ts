import { DateTime, Interval } from "luxon";

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
