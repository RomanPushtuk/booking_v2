import { Saga } from "../application";
import { UpdateClientDTO, ClientUpdatedDTO } from "../dtos";
import {
  UpdateClientInBookingServiceStep,
  UpdateClientInInfoServiceStep,
} from "../steps";

export class UpdateClientSaga extends Saga<UpdateClientDTO, ClientUpdatedDTO> {
  constructor(
    step1: UpdateClientInBookingServiceStep,
    step2: UpdateClientInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2];
  }
}
