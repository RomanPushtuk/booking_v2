import { Saga } from "../application";
import { DeleteBookingDTO } from "../dtos";
import {
  DeleteBookingInBookingServiceStep,
  DeleteBookingInInfoServiceStep,
} from "../steps";

export class DeleteBookingSaga extends Saga<DeleteBookingDTO, void> {
  constructor(
    step1: DeleteBookingInBookingServiceStep,
    step2: DeleteBookingInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
