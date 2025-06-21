import { logger } from "../logger";
import { HostProperties } from "../types";
import { Booking } from "./Booking";
import { User } from "./User";

export class Host {
  private _id: string;
  private _forwardBooking: string;
  private _workHours: {
    from: string;
    to: string;
  }[];
  private _workDays: string[];
  private _bookings: Booking[];
  private _role: string;
  private _deleted: boolean;

  constructor(data: HostProperties) {
    this._id = data.id;
    this._forwardBooking = data.forwardBooking;
    this._workHours = data.workHours;
    this._workDays = data.workDays;
    this._bookings = data.bookings;
    this._role = data.role;
    this._deleted = data.deleted;
  }

  getId() {
    return this._id;
  }

  getForwardBooking() {
    return this._forwardBooking;
  }

  getWorkHours() {
    return this._workHours;
  }

  getWorkDays() {
    return this._workDays;
  }

  addBooking(booking: Booking) {
    // Business logic that checks the possibility of adding a given booking

    // 1. Check if there are no intersecting bookings
    // 2. Check that the booking is not available on weekends
    // 3. Check that the booking does not fall during non-business hours

    this._bookings.push(booking);
    logger.info("Added to Host new Booking");
  }

  deleteBooking(booking: Booking) {
    // Business logic that checks the possibility of deleting a given booking

    booking.setDeleted(true);
  }

  getBookings(): Booking[] {
    return this._bookings;
  }

  getRole() {
    return this._role;
  }

  getDeleted() {
    return this._deleted;
  }

  getUser() {
    return new User({
      id: this._id,
      role: this._role,
      deleted: this._deleted,
    });
  }
}
