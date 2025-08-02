import { shared } from "../imports";
import { Booking } from "../domain";
import { logger } from "../logger";
import { saveBooking, getBookingById, getAllBookings } from "../sql";
import { BookingMapper } from "../mappers";
import { UnitOfWork } from "../services";

export class BookingRepository {
  constructor(private _uow: UnitOfWork) {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }
  save(booking: Booking) {
    logger.info(this.constructor.name + " save");
    const bookingDbModel = BookingMapper.toDbModel(booking);
    console.log("bookingDbModel", bookingDbModel);
    const sql = saveBooking(bookingDbModel);
    console.log("sql", sql);
    logger.info(this._uow.db.exec(sql), "saving Booking to DB");
    return { id: booking.getId() };
  }

  getById(bookingId: string): Booking | null {
    logger.info(this.constructor.name + " getById");
    const sql = getBookingById(bookingId);
    const data = this._uow.db.prepare(sql).get() as
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
    logger.info(this.constructor.name + " getAll");
    const sql = getAllBookings(filters);
    const data = this._uow.db.prepare(sql).all() as
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
