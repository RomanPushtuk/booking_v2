import { Duration } from "luxon";

import { InvalidDurationFormatException } from "../exceptions";

export const validateDurationFormat = (durationString: string): void => {
  if (!Duration.fromISO(durationString).isValid) {
    throw new InvalidDurationFormatException({
      context: {
        input: durationString,
        expectedFormat: "ISO 8601 (like P1D, P1W, P1M, P1Y, PT1H)",
      },
    });
  }
};
