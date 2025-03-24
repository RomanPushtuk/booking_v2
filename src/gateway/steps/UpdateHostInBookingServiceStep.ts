import { Step } from "../application";
import { UpdateHostDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostInBookingServiceStep extends Step<UpdateHostDTO, void> {
  private _invokeCb: (
    updateHostDTO: UpdateHostDTO,
    hostId: string,
  ) => Promise<void>;
  private _withCompenstationCb: (hostId: string) => Promise<void>;

  constructor(
    invokeCb: (updateHostDTO: UpdateHostDTO, hostId: string) => Promise<void>,
    withCompenstationCb: (hostId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(
    updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateHostDTO, hostId);
    return;
  }

  override async withCompenstation(
    _updateHostDTO: UpdateHostDTO,
    hostId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(hostId);
    return;
  }
}
