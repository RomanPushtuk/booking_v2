import { Step } from "../application";
import { DeleteBookingDTO } from "../dtos";
import { shared } from "../imports";

export class DeleteBookingInBookingServiceStep extends Step<
  DeleteBookingDTO,
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
