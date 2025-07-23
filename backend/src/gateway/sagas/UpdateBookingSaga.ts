import { Saga } from "../application";
import { BookingUpdatedDTO, UpdateBookingDTO } from "../dtos";
import { UpdateBookingInBookingServiceStep } from "../steps";

export class UpdateBookingSaga extends Saga<
  UpdateBookingDTO,
  BookingUpdatedDTO
> {
  constructor(step1: UpdateBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
