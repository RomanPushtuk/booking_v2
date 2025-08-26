import { DateTime } from "luxon";
import { shared } from "../imports";

export const getDayOfWeek = (dateTime: string): shared.enums.Days => {
  const date = DateTime.fromISO(dateTime).setLocale("en");
  const dayName = date.weekdayLong?.toUpperCase();

  return shared.enums.Days[dayName as keyof typeof shared.enums.Days];
};
