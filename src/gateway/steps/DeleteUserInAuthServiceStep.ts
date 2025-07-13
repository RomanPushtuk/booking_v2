import { Step } from "../application";
import { logger } from "../logger";
import { auth } from "../imports";

export class DeleteUserInAuthServiceStep extends Step<string, void> {
  override async invoke(userId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await auth.services.authService.deleteUser(userId);
    return;
  }

  override async withCompensation(userId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await auth.services.authService.restoreUser(userId);
    return;
  }
}
