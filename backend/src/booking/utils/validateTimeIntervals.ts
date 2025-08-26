import { DateTime, Interval } from "luxon";

import {
  InvalidTimeIntervalException,
  OverlappingTimeIntervalsException,
} from "../exceptions";
import { validateTimeFormat } from "./validateTimeFormat";

export const validateTimeIntervals = (
  timeIntervals: { from: string; to: string }[],
): void => {
  for (const timeInterval of timeIntervals) {
    validateTimeFormat(timeInterval.from);
    validateTimeFormat(timeInterval.to);

    if (timeInterval.from >= timeInterval.to) {
      throw new InvalidTimeIntervalException({
        context: { from: timeInterval.from, to: timeInterval.to },
      });
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
    throw new OverlappingTimeIntervalsException({
      context: { intervals: timeIntervals },
    });
  }
};
