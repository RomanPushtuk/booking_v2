import { Step } from "../application";
import { UpdateHostBookingDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostBookingInBookingServiceStep extends Step<
  UpdateHostBookingDTO,
  void
> {
  private _invokeCb: (
    updateHostBookingDTO: UpdateHostBookingDTO,
    hostId: string,
    bookingId: string,
    versionId: string,
  ) => Promise<void>;
  private _withCompensationCb: (
    bookingId: string,
    versionId: string,
  ) => Promise<void>;

  constructor(
    invokeCb: (
      updateHostBookingDTO: UpdateHostBookingDTO,
      hostId: string,
      bookingId: string,
      versionId: string,
    ) => Promise<void>,
    withCompensationCb: (
      bookingId: string,
      versionId: string,
    ) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }

  override async invoke(
    updateHostBookingDTO: UpdateHostBookingDTO,
    hostId: string,
    bookingId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateHostBookingDTO, hostId, bookingId, versionId);
    return;
  }

  override async withCompensation(
    _updateHostBookingDTO: UpdateHostBookingDTO,
    _hostId: string,
    bookingId: string,
    versionId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingId, versionId);
    return;
  }
}