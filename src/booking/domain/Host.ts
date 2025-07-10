import { intervalsOverlap } from "../../shared/utils";
import { logger } from "../logger";
import { HostProperties, UpdateBookingData } from "../types";
import { Booking } from "./Booking";
import { User } from "./User";
import config from "../../config.json";
import {
  isSameDay,
  getDayOfWeek,
  getTimeFromDateTime,
  isTimeIntervalInWorkingHours,
} from "../../shared/utils/date";

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
    if (
      this.checkIfWorkingHours(
        booking.getFromDateTime(),
        booking.getToDateTime(),
      )
    ) {
      throw new Error(
        "Can't create a booking. The host is not working at this time",
      );
    }

    if (
      this.checkIfDuplicateBooking(
        booking.getClientId(),
        booking.getFromDateTime(),
        booking.getToDateTime(),
      )
    ) {
      throw new Error("Can't create a booking. Booking already exists");
    }

    if (
      this.checkOverlapingBookings(
        booking.getFromDateTime(),
        booking.getToDateTime(),
      )
    ) {
      throw new Error(
        "Can't create a booking. There are overlapping bookings.",
      );
    }

    this._bookings.push(booking);
    logger.info("Added to Host new Booking");
  }

  updateBooking(booking: Booking, updateData: UpdateBookingData) {
    Booking.update(booking, updateData);

    if (
      this.checkIfWorkingHours(
        booking.getFromDateTime(),
        booking.getToDateTime(),
      )
    ) {
      throw new Error(
        "Can't update a booking. The host is not working at this time",
      );
    }

    if (
      this.checkIfDuplicateBooking(
        booking.getClientId(),
        booking.getFromDateTime(),
        booking.getToDateTime(),
        booking.getId(),
      )
    ) {
      throw new Error("Can't update a booking. Booking already exists");
    }

    if (
      this.checkOverlapingBookings(
        booking.getFromDateTime(),
        booking.getToDateTime(),
        booking.getId(),
      )
    ) {
      throw new Error(
        "Can't update a booking. There are overlapping bookings.",
      );
    }

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

  private checkOverlapingBookings(
    fromDateTime: string,
    toDateTime: string,
    excludeBookingId?: string,
  ): boolean {
    if (config.allowOverlappingBookings) return false;

    const hostBookings = this.getBookings();
    for (const booking of hostBookings) {
      if (booking.getDeleted()) continue;
      if (booking.getId() === excludeBookingId) continue;

      const isOverlap = intervalsOverlap(
        booking.getFromDateTime(),
        booking.getToDateTime(),
        fromDateTime,
        toDateTime,
      );

      if (isOverlap) return true;
    }
    return false;
  }

  private checkIfDuplicateBooking(
    clientId: string,
    fromDateTime: string,
    toDateTime: string,
    excludeBookingId?: string,
  ): boolean {
    const bookings = this.getBookings();

    for (const booking of bookings) {
      if (
        booking.getClientId() === clientId &&
        !booking.getDeleted() &&
        booking.getFromDateTime() === fromDateTime &&
        booking.getToDateTime() === toDateTime &&
        booking.getId() !== excludeBookingId
      ) {
        return true;
      }
    }
    return false;
  }

  private checkIfWorkingHours(
    fromDateTime: string,
    toDateTime: string,
  ): boolean {
    if (!isSameDay(fromDateTime, toDateTime)) return true;

    const dayOfWeek = getDayOfWeek(fromDateTime);

    if (!dayOfWeek) return true;

    if (!this._workDays.includes(dayOfWeek)) return true;

    const fromTime = getTimeFromDateTime(fromDateTime);
    const toTime = getTimeFromDateTime(toDateTime);

    if (!isTimeIntervalInWorkingHours(fromTime, toTime, this._workHours))
      return true;

    return false;
  }
}
