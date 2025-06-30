import { gateway, shared } from "../imports";
import { ClientProperties } from "../types";
import { Booking } from "./Booking";
import { User } from "./User";

export class Client {
  private _id: string;
  private _bookings: Booking[];
  private _role: string;
  private _deleted: boolean;

  constructor(data: ClientProperties) {
    this._id = data.id;
    this._bookings = data.bookings;
    this._role = data.role;
    this._deleted = data.deleted;
  }

  getId() {
    return this._id;
  }

  setDeleted(flag: boolean) {
    this._deleted = flag;
  }

  getDeleted() {
    return this._deleted;
  }

  getRole() {
    return this._role;
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

  getBookingById(bookingId: string) {
    const booking = this._bookings.find((b) => b.getId() === bookingId);

    if (!booking) throw new Error("Booking not found");

    if (booking.getDeleted()) throw new Error("Booking is deleted");

    return booking;
  }

  createBooking(bookingDTO: gateway.dtos.BookingDTO): Booking {
    return new Booking({ ...bookingDTO, deleted: false });
  }

  getUser() {
    return new User({
      id: this._id,
      role: this._role,
      deleted: this._deleted,
    });
  }

  private makeBookingFilter(filters?: shared.application.BookingFilters) {
    return (b: Booking) => {
      if (!filters) return true;

      if (filters.clientId && b.getClientId() !== filters.clientId) {
        return false;
      }

      if (filters.hostId && b.getHostId() !== filters.hostId) {
        return false;
      }

      if (
        filters.fromDateTime &&
        b.getFromDateTime() !== filters.fromDateTime
      ) {
        return false;
      }

      if (filters.toDateTime && b.getToDateTime() !== filters.toDateTime) {
        return false;
      }

      if (
        typeof filters.deleted === "boolean" &&
        b.getDeleted() !== filters.deleted
      ) {
        return false;
      }

      return true;
    };
  }

  private makeBookingSorter(sorting?: shared.application.BookingSorting) {
    if (!sorting) return () => 0;

    const getters: Record<string, (booking: Booking) => Date> = {
      fromDateTime: (booking) => new Date(booking.getFromDateTime()),
      toDateTime: (booking) => new Date(booking.getToDateTime()),
    };

    if (!sorting) return () => 0;
    if (!getters[sorting.property]) return () => 0;

    if (sorting.direction === shared.enums.SortDirection.ASC) {
      return (a: Booking, b: Booking) => {
        const aValue = getters[sorting.property](a);
        const bValue = getters[sorting.property](b);

        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;

        return 0;
      };
    }

    if (sorting.direction === shared.enums.SortDirection.DESC) {
      return (a: Booking, b: Booking) => {
        const aValue = getters[sorting.property](a);
        const bValue = getters[sorting.property](b);

        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      };
    }

    return () => 0;
  }
}
