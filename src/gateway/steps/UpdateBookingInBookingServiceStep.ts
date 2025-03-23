import { Step } from "../application";
import { UpdateBookingDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateBookingInBookingServiceStep extends Step<
  UpdateBookingDTO,
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
