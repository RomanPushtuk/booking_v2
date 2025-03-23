import { Saga } from "../application";
import { BookingDTO } from "../dtos";
import {
  CreateBookingInBookingServiceStep,
  CreateBookingInInfoServiceStep,
} from "../steps";

export class CreateBookingSaga extends Saga<BookingDTO, void> {
  constructor(
    step1: CreateBookingInBookingServiceStep,
    step2: CreateBookingInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
