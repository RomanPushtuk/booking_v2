import { Step } from "../application";
import { logger } from "../logger";
import { booking } from "../imports";

export class DeleteUserInBookingServiceStep extends Step<string, void> {
  override async invoke(userId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.userService.deleteUser(userId);
    return;
  }

  override async withCompenstation(userId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await booking.services.userService.restoreUser(userId);
    return;
  }
}
