import { Step } from "../application";
import { UserDTO } from "../dtos";
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
    await auth.services.authService.deleteUser(userDTO.id);
    return;
  }
}
