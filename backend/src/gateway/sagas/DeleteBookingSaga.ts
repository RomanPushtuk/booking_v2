import { Saga, Step } from "../application";
import { BookingDeletedDTO } from "../dtos";

export class DeleteBookingSaga extends Saga<string, BookingDeletedDTO> {
  constructor(step1: Step<unknown, BookingDeletedDTO>) {
    super();
    this.steps = [step1];
  }
}
