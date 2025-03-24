import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";
import { logger } from "../logger";
import { booking } from "../imports";

export class DeleteUserInBookingServiceStep extends Step<DeleteUserDTO, void> {
  override async invoke(deleteUserDTO: DeleteUserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.userService.deleteUser(deleteUserDTO);
    return;
  }

  override async withCompenstation(
    deleteUserDTO: DeleteUserDTO,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await booking.services.userService.restoreUser(deleteUserDTO);
    return;
  }
}
