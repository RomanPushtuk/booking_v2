import { Step } from "../application";
import { UpdateBookingDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class UpdateBookingInInfoServiceStep extends Step<
  UpdateBookingDTO,
  void
> {
  override async invoke(
    updateBookingDTO: UpdateBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.updateBooking(updateBookingDTO, bookingId);
    return;
  }

  override async withCompenstation(
    _updateBookingDTO: UpdateBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    info.services.bookingService.revertBooking(bookingId);
    return;
  }
}
