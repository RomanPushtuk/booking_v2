import { Step } from "../application";
import { UpdateClientDTO, ClientUpdatedDTO } from "../dtos";
import { logger } from "../logger";
import { info } from "../imports";

export class UpdateClientInInfoServiceStep extends Step<
  UpdateClientDTO,
  ClientUpdatedDTO
> {
  override async invoke(
    updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<ClientUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await info.services.userService.updateClient(
      updateClientDTO,
      clientId,
    );
  }

  override async withCompensation(
    _updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<ClientUpdatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await info.services.bookingService.revertBooking(clientId);
  }
}
