import { Saga } from "../application";
import { DeleteClientBookingInBookingServiceStep } from "../steps";

export class DeleteClientBookingSaga extends Saga<string, void> {
  constructor(step1: DeleteClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
