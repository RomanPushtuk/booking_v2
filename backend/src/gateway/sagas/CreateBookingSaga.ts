import { Saga } from "../application";
import { CreateBookingDTO } from "../dtos";
import { CreateBookingInBookingServiceStep } from "../steps";

export class CreateBookingSaga extends Saga<
  CreateBookingDTO & { id: string },
  void
> {
  constructor(step1: CreateBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
