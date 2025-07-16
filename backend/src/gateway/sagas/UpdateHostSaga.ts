import { Saga } from "../application";
import { UpdateHostDTO } from "../dtos";
import {
  UpdateHostInBookingServiceStep,
} from "../steps";

export class UpdateHostSaga extends Saga<UpdateHostDTO, void> {
  constructor(
    step1: UpdateHostInBookingServiceStep,
  ) {
    super();
    this.steps = [step1];
  }
}
