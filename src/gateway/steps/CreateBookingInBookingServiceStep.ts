import { Step } from "../application";
import { BookingDTO } from "../dtos";
import { shared } from "../imports";

export class CreateBookingInBookingServiceStep extends Step<BookingDTO, void> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
