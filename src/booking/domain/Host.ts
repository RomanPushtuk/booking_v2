import { intervalsOverlap } from "../../shared/utils";
import { logger } from "../logger";
import { HostProperties, UpdateBookingData, UpdateHostData } from "../types";
import { Booking } from "./Booking";
import { User } from "./User";
import config from "../../config.json";
import { shared } from "../imports";
import {
  isSameDay,
  getDayOfWeek,
  getTimeFromDateTime,
  isTimeIntervalInWorkingHours,
  isIntervalInPast,
  addDurationToDate,
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

  getBookingById(bookingId: string) {
    const booking = this._bookings.find((b) => b.getId() === bookingId);

    if (!booking) throw new Error("Booking not found");

    if (booking.getDeleted()) throw new Error("Booking is deleted");

    return booking;
  }

  addBookingByHost(booking: Booking) {
    this.validateBookingRules(booking, true);
    this.validateAndAddBooking(booking);
  }

  addBookingByClient(booking: Booking) {
    this.validateBookingRules(booking, false);
    this.validateAndAddBooking(booking);
  }

  private validateBookingRules(booking: Booking, isHostAction: boolean) {
    const fromDateTime = booking.getFromDateTime();
    const toDateTime = booking.getToDateTime();

    if (isHostAction ? this.checkIfWorkingHoursForHost(fromDateTime, toDateTime) : this.checkIfWorkingHours(fromDateTime, toDateTime)) {
      throw new Error("Can't create a booking. The host is not working at this time");
    }

    if (isHostAction ? this.checkIfPastTimeForHost(fromDateTime, toDateTime) : this.checkIfPastTime(fromDateTime, toDateTime)) {
      throw new Error("Can't create a booking. The booking time is in the past");
    }

    if (isHostAction ? this.checkIfBeyondForwardBookingForHost(fromDateTime) : this.checkIfBeyondForwardBooking(fromDateTime)) {
      throw new Error("Can't create a booking. The booking is beyond the forward booking limit");
    }
  }

  private validateAndAddBooking(booking: Booking) {
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
      this.checkOverlappingBookings(
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

  updateBookingByHost(booking: Booking, updateData: UpdateBookingData) {
    Booking.update(booking, updateData);
    this.validateBookingRules(booking, true);
    this.validateUpdatedBooking(booking);
  }

  updateBookingByClient(booking: Booking, updateData: UpdateBookingData) {
    Booking.update(booking, updateData);
    this.validateBookingRules(booking, false);
    this.validateUpdatedBooking(booking);
  }

  private validateUpdatedBooking(booking: Booking) {
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
      this.checkOverlappingBookings(
        booking.getFromDateTime(),
        booking.getToDateTime(),
        [booking],
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

  getBookings(options?: {
    filters?: shared.application.BookingFilters;
    sorting?: shared.application.BookingSorting;
  }): Booking[] {
    let bookings = this._bookings;

    if (options?.filters) {
      bookings = bookings.filter(this.makeBookingFilter(options.filters));
    }

    if (options?.sorting) {
      bookings = bookings.sort(this.makeBookingSorter(options.sorting));
    }

    return bookings;
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

  setForwardBooking(forwardBooking: string) {
    this._forwardBooking = forwardBooking;
  }

  setWorkHours(workHours: { from: string; to: string }[]) {
    this._workHours = workHours;
  }

  setWorkDays(workDays: string[]) {
    this._workDays = workDays;
  }

  static update(host: Host, updateData: UpdateHostData) {
    if (updateData.forwardBooking !== undefined) {
      host.setForwardBooking(updateData.forwardBooking);
    }

    if (updateData.workHours !== undefined) {
      host.setWorkHours(updateData.workHours);
    }

    if (updateData.workDays !== undefined) {
      host.setWorkDays(updateData.workDays);
    }
  }

  private checkOverlappingBookings(
    fromDateTime: string,
    toDateTime: string,
    exclude?: Booking[],
  ): boolean {
    if (config.allowOverlappingBookings) return false;

    const hostBookings = this.getBookings();
    for (const booking of hostBookings) {
      if (booking.getDeleted()) continue;
      if (exclude?.includes(booking)) continue;

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

  private checkIfWorkingHoursForHost(
    fromDateTime: string,
    toDateTime: string,
  ): boolean {
    if (config.allowHostWorkingHoursOverride) {
      return false;
    }

    return this.checkIfWorkingHours(fromDateTime, toDateTime);
  }

  private checkIfPastTimeForHost(
    fromDateTime: string,
    toDateTime: string,
  ): boolean {
    if (config.allowHostPastTimeBookings) {
      return false;
    }

    return this.checkIfPastTime(fromDateTime, toDateTime);
  }

  private checkIfPastTime(
    fromDateTime: string,
    toDateTime: string,
  ): boolean {
    return isIntervalInPast(fromDateTime, toDateTime);
  }

  private checkIfBeyondForwardBooking(
    fromDateTime: string,
  ): boolean {
    const forwardBookingLimit = addDurationToDate(this._forwardBooking);
    const bookingDate = new Date(fromDateTime);
    const limitDate = new Date(forwardBookingLimit);
    
    logger.info({
      forwardBooking: this._forwardBooking,
      forwardBookingLimit,
      fromDateTime,
      bookingDate: bookingDate.toISOString(),
      limitDate: limitDate.toISOString(),
      isBeyond: bookingDate > limitDate
    }, "checkIfBeyondForwardBooking");
    
    return bookingDate > limitDate;
  }

  private checkIfBeyondForwardBookingForHost(
    fromDateTime: string,
  ): boolean {
    const isBeyond = this.checkIfBeyondForwardBooking(fromDateTime);
    
    if (config.allowHostForwardBookingOverride) {
      return false;
    }

    return isBeyond;
  }

  private makeBookingFilter(filters: shared.application.BookingFilters) {
    return (booking: Booking) => {
      const { clientId, hostId, fromDateTime, toDateTime, deleted } = filters;

      if (clientId && booking.getClientId() !== clientId) return false;

      if (hostId && booking.getHostId() !== hostId) return false;

      if (typeof deleted === "boolean" && booking.getDeleted() !== deleted) {
        return false;
      }

      if (
        fromDateTime &&
        new Date(booking.getFromDateTime()) < new Date(fromDateTime)
      ) {
        return false;
      }

      if (
        toDateTime &&
        new Date(booking.getToDateTime()) > new Date(toDateTime)
      ) {
        return false;
      }

      return true;
    };
  }

  private makeBookingSorter(sorting: shared.application.BookingSorting) {
    const getters: Record<string, (booking: Booking) => Date> = {
      fromDateTime: (booking) => new Date(booking.getFromDateTime()),
      toDateTime: (booking) => new Date(booking.getToDateTime()),
    };

    const getValue = getters[sorting.property];

    if (!getValue) return () => 0;

    const isAscending = sorting.direction === shared.enums.SortDirection.ASC;

    return (bookingA: Booking, bookingB: Booking) => {
      const aValue = getValue(bookingA);
      const bValue = getValue(bookingB);

      if (aValue === bValue) return 0;

      const aIsMoreRecent = aValue > bValue;

      if (isAscending) return aIsMoreRecent ? 1 : -1;

      return aIsMoreRecent ? -1 : 1;
    };
  }
}
