import { Saga } from "../application";
import { CreateClientBookingDTO } from "../dtos";
import { CreateClientBookingInBookingServiceStep } from "../steps";

export class CreateClientBookingSaga extends Saga<
  CreateClientBookingDTO,
  void
> {
  constructor(step1: CreateClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
