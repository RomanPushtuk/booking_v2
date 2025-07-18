import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class BookingService {
  constructor() {
    this.createBooking = this.createBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.restoreBooking = this.restoreBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.revertBooking = this.revertBooking.bind(this);
  }

  async createBooking(bookingDTO: gateway.dtos.BookingDTO) {
    logger.info({ bookingDTO }, this.constructor.name + " createBooking");
  }

  async deleteBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
  }

  async updateBooking(
    updateBookingDTO: gateway.dtos.UpdateBookingDTO,
    bookingId: string,
  ) {
    logger.info(
      { updateBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );
  }

  async revertBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " revertBookingVersion");
  }
}
