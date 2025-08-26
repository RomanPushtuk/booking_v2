import { DateTime } from "luxon";
import { InvalidTimeFormatException } from "../exceptions";

export const validateTimeFormat = (time: string): void => {
  if (!DateTime.fromFormat(time, "HH:mm").isValid) {
    throw new InvalidTimeFormatException({
      context: { input: time, expectedFormat: "HH:MM" },
    });
  }
};
