export type UpdateHostData = {
  forwardBooking?: string;
  workHours?: {
    from: string;
    to: string;
  }[];
  workDays?: string[];
};
