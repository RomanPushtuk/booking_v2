import { Step } from "../application";
import { UserDTO } from "../dtos";
import { info } from "../imports";
import { logger } from "../logger";

export class CreateUserInInfoServiceStep extends Step<UserDTO, void> {
  override async invoke(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await info.services.userService.createUser(userDTO);
    return;
  }

  override async withCompensation(userDTO: UserDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await info.services.userService.deleteUser(userDTO.id);
    return;
  }
}
