import { Booking } from "../domain";
import { logger } from "../logger";
// import { db } from "../db";
// import { saveBooking, getBookingById, getAllBookings } from "../sql";

export class BookingRepository {
  save(booking: Booking) {
    logger.info(this.constructor.name + " save");
    // const sql = saveBooking();
    // db.exec(sql);
    return { id: booking.id };
  }
  getById() {
    logger.info(this.constructor.name + " getById");
  }
  saveAll() {
    logger.info(this.constructor.name + " saveAll");
  }
  getAll() {
    logger.info(this.constructor.name + " getAll(");
  }
}
