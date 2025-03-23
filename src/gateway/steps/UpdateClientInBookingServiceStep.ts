import { Step } from "../application";
import { UpdateClientDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateClientInBookingServiceStep extends Step<
  UpdateClientDTO,
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
