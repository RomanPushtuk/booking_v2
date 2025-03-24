import { Step } from "../application";
import { info } from "../imports";
import { logger } from "../logger";

export class DeleteBookingInInfoServiceStep extends Step<string, void> {
  override async invoke(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.deleteBooking(bookingId);
    return;
  }

  override async withCompenstation(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    info.services.bookingService.restoreBooking(bookingId);
    return;
  }
}
