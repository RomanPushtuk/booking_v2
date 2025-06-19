import { Booking } from "../domain";

export type HostProperties = {
  id: string;
  forwardBooking: string;
  workHours: {
    from: string;
    to: string;
  }[];
  workDays: string[];
  bookings: Booking[];
  deleted: boolean;
};
