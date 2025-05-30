import { Saga } from "../application";
import {
  DeleteBookingInBookingServiceStep,
  DeleteBookingInInfoServiceStep,
} from "../steps";

export class DeleteBookingSaga extends Saga<string, void> {
  constructor(
    step1: DeleteBookingInBookingServiceStep,
    step2: DeleteBookingInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
