import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class DeleteUserInInfoServiceStep extends Step<DeleteUserDTO, void> {
  override async invoke(deleteUserDTO: DeleteUserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await info.services.userService.deleteUser(deleteUserDTO);
    return;
  }

  override async withCompenstation(
    deleteUserDTO: DeleteUserDTO,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await info.services.userService.restoreUser(deleteUserDTO);
    return;
  }
}
