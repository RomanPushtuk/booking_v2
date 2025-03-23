import { Step } from "../application";
import { DeleteBookingDTO } from "../dtos";
import { logger } from "../logger";

export class DeleteBookingInBookingServiceStep extends Step<
  DeleteBookingDTO,
  void
> {
  override async invoke(): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
