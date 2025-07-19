import { Step } from "../application";
import { UserDeletedDTO } from "../dtos";
import { logger } from "../logger";
import { booking } from "../imports";

export class DeleteUserInBookingServiceStep extends Step<string, UserDeletedDTO> {
  override async invoke(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await booking.services.userService.deleteUser(userId);
  }

  override async withCompensation(userId: string): Promise<UserDeletedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await booking.services.userService.restoreUser(userId);
  }
}
