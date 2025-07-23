import { Step } from "../application";
import { CreateClientDTO, CreateHostDTO } from "../dtos";
import { booking } from "../imports";
import { logger } from "../logger";

export class CreateClientInBookingServiceStep extends Step<
  CreateClientDTO & { id: string },
  void
> {
  override async invoke(
    createClientDTO: CreateClientDTO & { id: string },
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.clientService.createClient(createClientDTO);
    return;
  }

  override async withCompensation(
    createHostDTO: CreateHostDTO & { id: string },
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await booking.services.clientService.deleteClient(createHostDTO.id);
    return;
  }
}
