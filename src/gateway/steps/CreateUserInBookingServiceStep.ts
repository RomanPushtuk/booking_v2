import { Step } from "../application";
import { UserDTO } from "../dtos";
import { booking } from "../imports";
import { logger } from "../logger";

export class CreateUserInBookingServiceStep extends Step<UserDTO, void> {
  override async invoke(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.userService.createUser(userDTO);
    return;
  }

  override async withCompensation(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await booking.services.userService.deleteUser(userDTO.id);
    return;
  }
}
