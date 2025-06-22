import { gateway } from "../imports";
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

  getBookings() {
    return this._bookings;
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
}
