import { Saga } from "../application";
import { BookingDeletedDTO } from "../dtos";
import { DeleteClientBookingInBookingServiceStep } from "../steps";

export class DeleteClientBookingSaga extends Saga<string, BookingDeletedDTO> {
  constructor(step1: DeleteClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
