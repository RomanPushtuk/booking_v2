import { Saga } from "../application";
import {
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
} from "../steps";

export class DeleteUserSaga extends Saga<string, void> {
  constructor(
    step1: DeleteUserInAuthServiceStep,
    step2: DeleteUserInBookingServiceStep,
    step3: DeleteUserInInfoServiceStep,
  ) {
    super();
    this.steps = [step1, step2, step3];
  }
}
