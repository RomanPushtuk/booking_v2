import { Step } from "../application";
import { DeleteUserDTO, UserDTO } from "../dtos";
import { auth } from "../imports";
import { logger } from "../logger";

export class CreateUserInAuthServiceStep extends Step<UserDTO, void> {
  override async invoke(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await auth.services.authService.createUser(userDTO);
    return;
  }

  override async withCompenstation(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    const deleteUserDTO = new DeleteUserDTO({ id: userDTO.id });
    await auth.services.authService.deleteUser(deleteUserDTO);
    return;
  }
}
