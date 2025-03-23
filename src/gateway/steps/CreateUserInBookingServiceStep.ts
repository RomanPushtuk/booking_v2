import { Step } from "../application";
import { UserDTO } from "../dtos";

export class CreateUserInBookingServiceStep extends Step<UserDTO, void> {
  override invoke(params: UserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override withCompenstation(params: UserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
