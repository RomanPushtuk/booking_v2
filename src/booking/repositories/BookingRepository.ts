import { shared } from "../imports";
import { Booking } from "../domain";
import { logger } from "../logger";
import { db } from "../db";
import { saveBooking, getBookingById, getAllBookings } from "../sql";
import { BookingMapper } from "../mappers";

export class BookingRepository {
  constructor() {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }
  save(booking: Booking) {
    logger.info(this.constructor.name + " save");

    const bookingDbModel = BookingMapper.toDbModel(booking);
    const sql = saveBooking(bookingDbModel);
    db.exec(sql);
    return { id: booking.id };
  }

  getById(bookingId: string): Booking | null {
    logger.info(this.constructor.name + " getById");
    const sql = getBookingById(bookingId);
    const data = db.prepare(sql).get() as
      | {
        id: string;
        clientId: string;
        hostId: string;
        fromDateTime: string;
        toDateTime: string;
        deleted: boolean;
      }
      | undefined;
    if (!data) return null;
    return BookingMapper.toDomain(data);
  }

  saveAll(bookings: Booking[]) {
    return bookings.map(this.save);
  }

  getAll(filters?: {
    sorting?: shared.application.BookingSorting;
    filters?: shared.application.BookingFilters;
  }): Booking[] | null {
    const sql = getAllBookings(filters);
    const data = db.prepare(sql).all() as
      | {
        id: string;
        clientId: string;
        hostId: string;
        fromDateTime: string;
        toDateTime: string;
        deleted: boolean;
      }[]
      | undefined;
    if (!data) return null;
    return data.map(BookingMapper.toDomain);
  }
}
