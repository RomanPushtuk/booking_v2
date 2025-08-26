import { DateTime, Duration } from "luxon";

import { validateDurationFormat } from "./validateDurationFormat";

export const addDurationToDate = (
  durationString: string,
  fromDate?: string,
): string => {
  const baseDate = fromDate ? DateTime.fromISO(fromDate) : DateTime.now();

  validateDurationFormat(durationString);

  const duration = Duration.fromISO(durationString);
  const resultDate = baseDate.plus(duration);
  return resultDate.toISO()!;
};
