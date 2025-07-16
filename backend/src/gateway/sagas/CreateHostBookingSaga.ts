import { Saga } from "../application";
import { CreateHostBookingDTO } from "../dtos";
import { CreateHostBookingInBookingServiceStep } from "../steps";

export class CreateHostBookingSaga extends Saga<
  CreateHostBookingDTO,
  void
> {
  constructor(step1: CreateHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}