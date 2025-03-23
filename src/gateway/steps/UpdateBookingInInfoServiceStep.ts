import { Step } from "../application";
import { UpdateBookingDTO } from "../dtos";
import { shared } from "../imports";

export class UpdateBookingInInfoServiceStep extends Step<
  UpdateBookingDTO,
  void
> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
