import { Step } from "../application";
import { BookingDTO, DeleteBookingDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class CreateBookingInInfoServiceStep extends Step<BookingDTO, void> {
  override async invoke(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.createBooking(bookingDTO);
    return;
  }

  override async withCompenstation(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    const deleteBookingDTO = new DeleteBookingDTO({ id: bookingDTO.id });
    info.services.bookingService.deleteBooking(deleteBookingDTO);
    return;
  }
}
