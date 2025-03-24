import { Step } from "../application";
import { DeleteBookingDTO } from "../dtos";
import { info } from "../imports";
import { logger } from "../logger";

export class DeleteBookingInInfoServiceStep extends Step<
  DeleteBookingDTO,
  void
> {
  override async invoke(deleteBookingDTO: DeleteBookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.deleteBooking(deleteBookingDTO);
    return;
  }

  override async withCompenstation(
    deleteBookingDTO: DeleteBookingDTO,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    info.services.bookingService.restoreBooking(deleteBookingDTO);
    return;
  }
}
