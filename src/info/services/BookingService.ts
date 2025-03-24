import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class BookingService {
  async createBooking(bookingDTO: gateway.dtos.BookingDTO) {
    logger.info({ bookingDTO }, this.constructor.name + " createBooking");
  }

  async deleteBooking(deleteBookingDTO: gateway.dtos.DeleteBookingDTO) {
    logger.info({ deleteBookingDTO }, this.constructor.name + " deleteBooking");
  }

  async restoreBooking(deleteBookingDTO: gateway.dtos.DeleteBookingDTO) {
    logger.info(
      { deleteBookingDTO },
      this.constructor.name + " restoreBooking",
    );
  }
}
