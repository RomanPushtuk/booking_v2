import { Saga } from "../application";
import { CreateClientDTO } from "../dtos";
import {
  CreateClientInBookingServiceStep,
  CreateUserInAuthServiceStep,
  CreateUserInInfoServiceStep,
} from "../steps";

export class CreateClientSaga extends Saga<
  CreateClientDTO & { id: string },
  void
> {
  constructor(
    step1: CreateUserInAuthServiceStep,
    step2: CreateClientInBookingServiceStep,
    step3: CreateUserInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2, step3];
  }
}
