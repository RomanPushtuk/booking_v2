import { HostProperties } from "../types";
import { Booking } from "./Booking";

export class Host {
  id: string;
  forwardBooking: string;
  workHours: {
    from: string;
    to: string;
  }[];
  workDays: string[];
  bookings: Booking[];
  deleted: boolean;

  constructor(data: HostProperties) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.bookings = data.bookings;
    this.deleted = data.deleted;
  }

  addBooking(booking: Booking) {
    // Business logic that checks the possibility of adding a given booking

    // 1. Check if there are no intersecting bookings
    // 2. Check that the booking is not available on weekends
    // 3. Check that the booking does not fall during non-business hours

    this.bookings.push(booking);
  }

  deleteBooking(booking: Booking) {
    // Business logic that checks the possibility of deleting a given booking

    booking.setDeleted(true);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }
}
