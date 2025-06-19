import { Booking } from "../domain";

export class BookingRegistry {
  registry = new Map<string, Booking>();

  getById(bookingId: string): Booking | null {
    const booking = this.registry.get(bookingId);
    if (!booking) return null;
    return booking;
  }
  save(booking: Booking) {
    this.registry.set(booking.getId(), booking);
  }
}
