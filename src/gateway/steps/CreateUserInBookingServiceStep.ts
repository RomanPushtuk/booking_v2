import { Step } from "../application";
import { DeleteUserDTO, UserDTO } from "../dtos";
import { booking } from "../imports";
import { logger } from "../logger";

export class CreateUserInBookingServiceStep extends Step<UserDTO, void> {
  override async invoke(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.userService.createUser(userDTO);
    return;
  }

  override async withCompenstation(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    const deleteUserDTO = new DeleteUserDTO({ id: userDTO.id });
    await booking.services.userService.deleteUser(deleteUserDTO);
    return;
  }
}
