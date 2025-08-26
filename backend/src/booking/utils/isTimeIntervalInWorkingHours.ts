export const isTimeIntervalInWorkingHours = (
  fromTime: string,
  toTime: string,
  workingHours: { from: string; to: string }[],
): boolean => {
  return workingHours.some(({ from, to }) => {
    return fromTime >= from && toTime <= to;
  });
};
