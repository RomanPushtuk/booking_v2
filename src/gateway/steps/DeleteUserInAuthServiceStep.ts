import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";
import { logger } from "../logger";
import { auth } from "../imports";

export class DeleteUserInAuthServiceStep extends Step<DeleteUserDTO, void> {
  override async invoke(deleteUserDTO: DeleteUserDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await auth.services.authService.deleteUser(deleteUserDTO);
    return;
  }

  override async withCompenstation(
    deleteUserDTO: DeleteUserDTO,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await auth.services.authService.restoreUser(deleteUserDTO);
    return;
  }
}
