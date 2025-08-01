import { Step } from "../application";
import { CreateHostDTO } from "../dtos";
import { booking } from "../imports";
import { logger } from "../logger";

export class CreateHostInBookingServiceStep extends Step<
  CreateHostDTO & { id: string },
  void
> {
  override async invoke(
    createHostDTO: CreateHostDTO & { id: string },
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await booking.services.hostService.createHost(createHostDTO);
    return;
  }

  override async withCompensation(
    createHostDTO: CreateHostDTO & { id: string },
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await booking.services.hostService.deleteHost(createHostDTO.id);
    return;
  }
}
