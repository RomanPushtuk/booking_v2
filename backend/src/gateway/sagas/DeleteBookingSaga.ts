import { Saga } from "../application";
import { BookingDeletedDTO } from "../dtos";
import { DeleteBookingInBookingServiceStep } from "../steps";

export class DeleteBookingSaga extends Saga<string, BookingDeletedDTO> {
  constructor(step1: DeleteBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
