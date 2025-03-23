import { Saga } from "../application";
import { UpdateBookingDTO } from "../dtos";
import { UpdateBookingInBookingServiceStep } from "../steps/UpdateBookingInBookingServiceStep";
import { UpdateBookingInInfoServiceStep } from "../steps/UpdateBookingInInfoServiceStep";

export class UpdateBookingSaga extends Saga<UpdateBookingDTO, void> {
  constructor(
    step1: UpdateBookingInBookingServiceStep,
    step2: UpdateBookingInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
