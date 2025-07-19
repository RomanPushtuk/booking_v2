import { Saga } from "../application";
import { UpdateClientBookingDTO, BookingUpdatedDTO } from "../dtos";
import { UpdateClientBookingInBookingServiceStep } from "../steps";

export class UpdateClientBookingSaga extends Saga<
  UpdateClientBookingDTO,
  BookingUpdatedDTO
> {
  constructor(step1: UpdateClientBookingInBookingServiceStep) {
    super();
    this.steps = [step1];
  }
}
