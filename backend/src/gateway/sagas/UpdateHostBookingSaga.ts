import { Saga } from "../application";
import { UpdateHostBookingDTO } from "../dtos";
import { UpdateHostBookingInBookingServiceStep } from "../steps";

export class UpdateHostBookingSaga extends Saga<
  UpdateHostBookingDTO,
  void
> {
  constructor(step1: UpdateHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}