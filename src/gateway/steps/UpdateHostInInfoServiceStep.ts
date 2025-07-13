import { Step } from "../application";
import { UpdateHostDTO } from "../dtos";
import { info } from "../imports";
import { logger } from "../logger";

export class UpdateHostInInfoServiceStep extends Step<UpdateHostDTO, void> {
  override async invoke(
    updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.userService.updateHost(updateHostDTO, hostId);
    return;
  }

  override async withCompensation(
    _updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    info.services.userService.revertHost(hostId);
    return;
  }
}
