import { Saga } from "../application";
import { UserDTO } from "../dtos";
import {
  CreateUserInAuthServiceStep,
  CreateUserInBookingServiceStep,
} from "../steps";

export class CreateUserSaga extends Saga<UserDTO, void> {
  constructor(
    step1: CreateUserInAuthServiceStep,
    step2: CreateUserInBookingServiceStep,
    step3: CreateUserInBookingServiceStep,
  ) {
    super();
    this.steps = [step1, step2, step3];
  }
}
