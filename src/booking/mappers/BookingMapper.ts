import { Booking } from "../domain";
import { BookingRegistry } from "../registers";
import { BookingDbModel } from "../sql/saveBooking";

export class BookingMapper {
  static bookingRegistry = new BookingRegistry();

  static toDomain(data: {
    id: string;
    clientId: string;
    hostId: string;
    fromDateTime: string;
    toDateTime: string;
    deleted: boolean;
  }): Booking {
    return BookingMapper.bookingRegistry.getById(data.id) || new Booking(data);
  }

  static toDbModel(booking: Booking): BookingDbModel {
    BookingMapper.bookingRegistry.save(booking);

    return {
      id: booking.id,
      clientId: booking.clientId,
      hostId: booking.hostId,
      fromDateTime: booking.fromDateTime,
      toDateTime: booking.toDateTime,
      deleted: booking.deleted,
    };
  }
}
