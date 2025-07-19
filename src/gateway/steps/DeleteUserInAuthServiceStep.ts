import { Step } from "../application";
import { logger } from "../logger";
import { auth } from "../imports";
import { UserDeletedDTO } from "../dtos";

export class DeleteUserInAuthServiceStep extends Step<string, UserDeletedDTO> {
  override async invoke(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await auth.services.authService.deleteUser(userId);
  }

  override async withCompensation(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await auth.services.authService.restoreUser(userId);
  }
}
