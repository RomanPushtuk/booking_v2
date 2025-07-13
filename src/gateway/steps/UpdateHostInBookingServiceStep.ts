import { Step } from "../application";
import { UpdateHostDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostInBookingServiceStep extends Step<UpdateHostDTO, void> {
  private _invokeCb: (
    updateHostDTO: UpdateHostDTO,
    hostId: string,
  ) => Promise<void>;
  private _withCompensationCb: (hostId: string) => Promise<void>;

  constructor(
    invokeCb: (updateHostDTO: UpdateHostDTO, hostId: string) => Promise<void>,
    withCompensationCb: (hostId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(
    updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateHostDTO, hostId);
    return;
  }

  override async withCompensation(
    _updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(hostId);
    return;
  }
}
