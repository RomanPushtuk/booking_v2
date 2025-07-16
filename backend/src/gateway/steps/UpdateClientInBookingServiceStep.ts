import { Step } from "../application";
import { UpdateClientDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateClientInBookingServiceStep extends Step<
  UpdateClientDTO,
  void
> {
  private _invokeCb: (
    updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ) => Promise<void>;
  private _withCompensationCb: (clientId: string, versionId: string) => Promise<void>;

  constructor(
    invokeCb: (
      updateClientDTO: UpdateClientDTO,
      clientId: string,
      versionId: string,
    ) => Promise<void>,
    withCompensationCb: (clientId: string, versionId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(
    updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateClientDTO, clientId, versionId);
    return;
  }

  override async withCompensation(
    _updateClientDTO: UpdateClientDTO,
    clientId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(clientId, versionId);
    return;
  }
}
