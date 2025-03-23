import { Step } from "../application";
import { UserDTO } from "../dtos";
import { shared } from "../imports";

export class CreateUserInAuthServiceStep extends Step<UserDTO, void> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
