import { Saga } from "../application";
import { CreateHostBookingDTO, BookingCreatedDTO } from "../dtos";
import { CreateHostBookingInBookingServiceStep } from "../steps";

export class CreateHostBookingSaga extends Saga<
  CreateHostBookingDTO,
  BookingCreatedDTO
> {
  constructor(step1: CreateHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
