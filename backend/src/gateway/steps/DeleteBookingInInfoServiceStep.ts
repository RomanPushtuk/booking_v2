import { Step } from "../application";
import { info } from "../imports";
import { logger } from "../logger";

export class DeleteBookingInInfoServiceStep extends Step<string, void> {
  override async invoke(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.bookingService.deleteBooking(bookingId);
    return;
  }

  override async withCompensation(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    info.services.bookingService.restoreBooking(bookingId);
    return;
  }
}
