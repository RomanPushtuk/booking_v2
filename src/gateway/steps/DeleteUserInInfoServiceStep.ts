import { Step } from "../application";
import { UserDeletedDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class DeleteUserInInfoServiceStep extends Step<string, UserDeletedDTO> {
  override async invoke(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await info.services.userService.deleteUser(userId);
  }

  override async withCompensation(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await info.services.userService.restoreUser(userId);
  }
}
