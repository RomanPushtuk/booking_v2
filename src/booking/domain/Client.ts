import { shared, gateway } from "../imports";
import { Booking } from "./Booking";

export class Client {
  id: string;
  booking: Booking[];
  deleted: boolean;

  constructor(data: shared.types.GetInterface<Client>) {
    this.id = data.id;
    this.deleted = data.deleted;
  }

  createBooking(bookingDTO: gateway.dtos.BookingDTO): Booking {
    return new Booking({ ...bookingDTO, deleted: false });
  }
}
