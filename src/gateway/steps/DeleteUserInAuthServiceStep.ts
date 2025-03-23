import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";
import { logger } from "../logger";

export class DeleteUserInAuthServiceStep extends Step<DeleteUserDTO, void> {
  override async invoke(): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
