import { Step } from "../application";
import { BookingDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class CreateBookingInInfoServiceStep extends Step<BookingDTO, void> {
  override async invoke(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.createBooking(bookingDTO);
    return;
  }

  override async withCompensation(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    info.services.bookingService.deleteBooking(bookingDTO.id);
    return;
  }
}
