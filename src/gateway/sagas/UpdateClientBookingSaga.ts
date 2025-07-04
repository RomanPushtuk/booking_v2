import { Saga } from "../application";
import { UpdateClientBookingDTO } from "../dtos";
import { UpdateClientBookingInBookingServiceStep } from "../steps";

export class UpdateClientBookingSaga extends Saga<
  UpdateClientBookingDTO,
  void
> {
  constructor(step1: UpdateClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
