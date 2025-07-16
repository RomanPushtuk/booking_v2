import { Saga } from "../application";
import { DeleteHostBookingInBookingServiceStep } from "../steps";

export class DeleteHostBookingSaga extends Saga<string, void> {
  constructor(step1: DeleteHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
