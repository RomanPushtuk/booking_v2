import { Saga } from "../application";
import { UpdateHostDTO, HostUpdatedDTO } from "../dtos";
import {
  UpdateHostInBookingServiceStep,
} from "../steps";

export class UpdateHostSaga extends Saga<UpdateHostDTO, HostUpdatedDTO> {
  constructor(
    step1: UpdateHostInBookingServiceStep,
  ) {
    super();
    this.steps = [step1];
  }
}
