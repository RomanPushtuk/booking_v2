import { Step } from "../application";
import { BookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateBookingInBookingServiceStep extends Step<BookingDTO, void> {
  override async invoke(): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
