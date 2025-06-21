import { gateway } from "../imports";
import { ClientProperties } from "../types";
import { Booking } from "./Booking";

export class Client {
  id: string;
  bookings: Booking[];
  role: string;
  deleted: boolean;

  constructor(data: ClientProperties) {
    this.id = data.id;
    this.bookings = data.bookings;
    this.role = data.role;
    this.deleted = data.deleted;
  }

  getId() {
    return this.id;
  }

  setDeleted(flag: boolean) {
    this.deleted = flag;
  }

  getDeleted() {
    return this.deleted;
  }

  createBooking(bookingDTO: gateway.dtos.BookingDTO): Booking {
    return new Booking({ ...bookingDTO, deleted: false });
  }
}
