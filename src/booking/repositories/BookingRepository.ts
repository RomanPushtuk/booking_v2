import { Booking } from "../domain";
import { logger } from "../logger";
import { db } from "../db";
import { saveBooking, getBookingById, getAllBookings } from "../sql";

export class BookingRepository {
  save(booking: Booking) {
    logger.info(this.constructor.name + " save");
    const sql = saveBooking(booking);
    db.exec(sql);
    return { id: booking.id };
  }

  getById(bookingId: string): Booking | null {
    logger.info(this.constructor.name + " getById");
    const sql = getBookingById(bookingId);
    const data = db.prepare(sql).get() as Booking | undefined;
    if (!data) return null;
    return new Booking(data);
  }

  saveAll(bookings: Booking[]) {
    return bookings.map(this.save);
  }

  getAll(): Booking[] | null {
    const sql = getAllBookings({});
    const data = db.prepare(sql).all() as Booking[] | undefined;
    if (!data) return null;
    return data.map((booking) => new Booking(booking));
  }
}
