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
  ) => Promise<void>;
  private _withCompenstationCb: (clientId: string) => Promise<void>;

  constructor(
    invokeCb: (
      updateClientDTO: UpdateClientDTO,
      clientId: string,
    ) => Promise<void>,
    withCompenstationCb: (clientId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(
    updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateClientDTO, clientId);
    return;
  }

  override async withCompenstation(
    _updateClientDTO: UpdateClientDTO,
    clientId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(clientId);
    return;
  }
}
