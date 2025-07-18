import { Step } from "../application";
import { UpdateClientBookingDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateClientBookingInBookingServiceStep extends Step<
  UpdateClientBookingDTO,
  void
> {
  private _invokeCb: (
    updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ) => Promise<void>;
  private _withCompensationCb: (
    bookingId: string,
    versionId: string,
  ) => Promise<void>;

  constructor(
    invokeCb: (
      updateClientBookingDTO: UpdateClientBookingDTO,
      bookingId: string,
      versionId: string,
    ) => Promise<void>,
    withCompensationCb: (bookingId: string, versionId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }

  override async invoke(
    updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateClientBookingDTO, bookingId, versionId);
    return;
  }

  override async withCompensation(
    _updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingId, versionId);
    return;
  }
}
