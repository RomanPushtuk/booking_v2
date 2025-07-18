import { Step } from "../application";
import { UpdateClientDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class UpdateClientInInfoServiceStep extends Step<UpdateClientDTO, void> {
  override async invoke(
    updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    info.services.userService.updateClient(updateClientDTO, clientId);
    return;
  }

  override async withCompensation(
    _updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    info.services.bookingService.revertBooking(clientId);
    return;
  }
}
