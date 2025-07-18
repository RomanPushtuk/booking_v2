import { Step } from "../application";
import { logger } from "../logger";
import { info } from "../imports";

export class DeleteUserInInfoServiceStep extends Step<string, void> {
  override async invoke(userId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await info.services.userService.deleteUser(userId);
    return;
  }

  override async withCompensation(userId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await info.services.userService.restoreUser(userId);
    return;
  }
}
