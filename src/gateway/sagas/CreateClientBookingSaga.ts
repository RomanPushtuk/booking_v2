import { Saga } from "../application";
import { CreateClientBookingDTO, BookingCreatedDTO } from "../dtos";
import { CreateClientBookingInBookingServiceStep } from "../steps";

export class CreateClientBookingSaga extends Saga<
  CreateClientBookingDTO,
  BookingCreatedDTO
> {
  constructor(step1: CreateClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
