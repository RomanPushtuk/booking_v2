import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";
import { shared } from "../imports";

export class DeleteUserInInfoServiceStep extends Step<DeleteUserDTO, void> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
