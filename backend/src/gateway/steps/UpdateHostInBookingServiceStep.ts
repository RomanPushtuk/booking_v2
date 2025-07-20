import { Step } from "../application";
import { UpdateHostDTO, HostUpdatedDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostInBookingServiceStep extends Step<UpdateHostDTO, HostUpdatedDTO> {
  private _invokeCb: (
    updateHostDTO: UpdateHostDTO,
    hostId: string,
    versionId: string,
  ) => Promise<HostUpdatedDTO>;
  private _withCompensationCb: (hostId: string, versionId: string) => Promise<HostUpdatedDTO>;

  constructor(
    invokeCb: (updateHostDTO: UpdateHostDTO, hostId: string, versionId: string) => Promise<HostUpdatedDTO>,
    withCompensationCb: (hostId: string, versionId: string) => Promise<HostUpdatedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(
    updateHostDTO: UpdateHostDTO,
    hostId: string,
    versionId: string,
  ): Promise<HostUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(updateHostDTO, hostId, versionId);
  }

  override async withCompensation(
    _updateHostDTO: UpdateHostDTO,
    hostId: string,
    versionId: string,
  ): Promise<HostUpdatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(hostId, versionId);
  }
}
