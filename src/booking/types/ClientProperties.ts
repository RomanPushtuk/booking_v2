import { Booking } from "../domain";

export type ClientProperties = {
  id: string;
  bookings: Booking[];
  role: string;
  deleted: boolean;
};
