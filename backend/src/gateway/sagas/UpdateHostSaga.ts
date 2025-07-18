import { Saga } from "../application";
import { UpdateHostDTO } from "../dtos";
import {
  UpdateHostInBookingServiceStep,
  UpdateHostInInfoServiceStep,
} from "../steps";

export class UpdateHostSaga extends Saga<UpdateHostDTO, void> {
  constructor(
    step1: UpdateHostInBookingServiceStep,
    step2: UpdateHostInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
