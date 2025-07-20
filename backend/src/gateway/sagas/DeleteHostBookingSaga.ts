import { Saga } from "../application";
import { BookingDeletedDTO } from "../dtos";
import { DeleteHostBookingInBookingServiceStep } from "../steps";

export class DeleteHostBookingSaga extends Saga<string, BookingDeletedDTO> {
  constructor(step1: DeleteHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
