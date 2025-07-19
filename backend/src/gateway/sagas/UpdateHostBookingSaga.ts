import { Saga } from "../application";
import { UpdateHostBookingDTO, BookingUpdatedDTO } from "../dtos";
import { UpdateHostBookingInBookingServiceStep } from "../steps";

export class UpdateHostBookingSaga extends Saga<
  UpdateHostBookingDTO,
  BookingUpdatedDTO
> {
  constructor(step1: UpdateHostBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}