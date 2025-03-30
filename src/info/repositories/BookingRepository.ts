import { Database } from '../db';
import { services } from '../exports';
import { gateway } from '../imports';

interface BookingDTO extends gateway.dtos.BookingDTO {
  deleted?: boolean;
}

export class BookingRepository {
  private db: Database;

  constructor() {
    this.db = services.database;
  }

  async saveBooking(booking: BookingDTO): Promise<BookingDTO> {
    return this.db.insert({ ...booking, deleted: booking.deleted ?? false });
  }

  async getBookingById(id: string): Promise<BookingDTO | null> {
    return this.db.findOne({ id, deleted: { $ne: true } });
  }

  async getBookingsByUserId(userId: string): Promise<BookingDTO[]> {
    return this.db.find({ $or: [{ clientId: userId }, { hostId: userId }], deleted: { $ne: true } });
  }

  async deleteBooking(id: string): Promise<number> {
    return this.db.update({ id }, { $set: { deleted: true } }, {});
  }

  async update(
    query: Record<string, any>,
    update: Record<string, any>,
    options: { multi?: boolean; upsert?: boolean } = {}
  ): Promise<number> {
    return this.db.update(query, update, options);
  }
}
