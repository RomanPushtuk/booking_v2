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

  private makeBookingFilter(filters: shared.application.BookingFilters) {
    return (booking: Booking) => {
      const {
        clientId,
        hostId,
        fromDateTime,
        toDateTime,
        deleted,
      } = filters;

      if (clientId && booking.getClientId() !== clientId) return false;

      if (hostId && booking.getHostId() !== hostId) return false;

      if (typeof deleted === "boolean" && booking.getDeleted() !== deleted) {
        return false;
      }

      if (fromDateTime && new Date(booking.getFromDateTime()) < new Date(fromDateTime)) {
        return false;
      }

      if (toDateTime && new Date(booking.getToDateTime()) > new Date(toDateTime)) {
        return false;
      }

      return true;
    };
  }

  private makeBookingSorter(sorting: shared.application.BookingSorting) {
    const getters: Record<string, (booking: Booking) => Date> = {
      fromDateTime: (booking) => new Date(booking.getFromDateTime()),
      toDateTime: (booking) => new Date(booking.getFromDateTime()),
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
