import { Saga } from "../application";
import { UpdateClientDTO } from "../dtos";
import {
  UpdateClientInBookingServiceStep,
  UpdateClientInInfoServiceStep,
} from "../steps";

export class UpdateClientSaga extends Saga<UpdateClientDTO, void> {
  constructor(
    step1: UpdateClientInBookingServiceStep,
    step2: UpdateClientInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
