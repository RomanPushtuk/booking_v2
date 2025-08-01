import { Saga } from "../application";
import { CreateHostDTO } from "../dtos";
import {
  CreateHostInBookingServiceStep,
  CreateUserInAuthServiceStep,
  CreateUserInInfoServiceStep,
} from "../steps";

export class CreateHostSaga extends Saga<CreateHostDTO & { id: string }, void> {
  constructor(
    step1: CreateUserInAuthServiceStep,
    step2: CreateHostInBookingServiceStep,
    step3: CreateUserInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2, step3];
  }
}
