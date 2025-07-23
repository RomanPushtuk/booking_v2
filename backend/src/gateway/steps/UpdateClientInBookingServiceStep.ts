import { Step } from "../application";
import { UpdateClientDTO, ClientUpdatedDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateClientInBookingServiceStep extends Step<
  UpdateClientDTO,
  ClientUpdatedDTO
> {
  private _invokeCb: (
    updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ) => Promise<ClientUpdatedDTO>;
  private _withCompensationCb: (
    clientId: string,
    versionId: string,
  ) => Promise<ClientUpdatedDTO>;

  constructor(
    invokeCb: (
      updateClientDTO: UpdateClientDTO,
      clientId: string,
      versionId: string,
    ) => Promise<ClientUpdatedDTO>,
    withCompensationCb: (
      clientId: string,
      versionId: string,
    ) => Promise<ClientUpdatedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(
    updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ): Promise<ClientUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(updateClientDTO, clientId, versionId);
  }

  override async withCompensation(
    _updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ): Promise<ClientUpdatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(clientId, versionId);
  }
}
