import { intervalsOverlap } from "../../shared/utils";
import { logger } from "../logger";
import { HostProperties } from "../types";
import { Booking } from "./Booking";
import { User } from "./User";
import config from "../../config.json";

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
    // TODO: discuss with Roman
    // this.validateWorkingHoursHost();

    this.validateExistClientBooking(
      this,
      booking.getClientId(),
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

    this.validateOverlapBooking(
      this,
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

    this._bookings.push(booking);
    logger.info("Added to Host new Booking");
  }

  updateBooking(booking: Booking) {
    // TODO: discuss with Roman
    // this.validateWorkingHoursHost();

    this.validateExistClientBooking(
      this,
      booking.getClientId(),
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

    this.validateOverlapBooking(
      this,
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

    logger.info("Updated booking");
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

  private validateOverlapBooking(
    host: Host,
    fromDateTime: string,
    toDateTime: string,
  ) {
    if (config.allowOverlappingBookings) return;

    const hostBookings = host.getBookings();
    for (const booking of hostBookings) {
      if (booking.getDeleted()) continue;

      const isOverlap = intervalsOverlap(
        booking.getFromDateTime(),
        booking.getToDateTime(),
        fromDateTime,
        toDateTime,
      );

      if (isOverlap) throw new Error("Booking overlaps with existing booking");
    }
  }

  private validateExistClientBooking(
    host: Host,
    clientId: string,
    fromDateTime: string,
    toDateTime: string,
  ) {
    const bookings = host.getBookings();

    for (const booking of bookings) {
      if (
        booking.getClientId() === clientId &&
        !booking.getDeleted() &&
        booking.getFromDateTime() === toDateTime &&
        booking.getToDateTime() === fromDateTime
      ) {
        throw new Error("Booking already exists");
      }
    }
  }

  private validateWorkingHoursHost() {}
}
