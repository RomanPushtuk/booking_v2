import { Step } from "../application";
import { UpdateHostBookingDTO, BookingUpdatedDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostBookingInBookingServiceStep extends Step<
  UpdateHostBookingDTO,
  BookingUpdatedDTO
> {
  private _invokeCb: (
    updateHostBookingDTO: UpdateHostBookingDTO,
    hostId: string,
    bookingId: string,
    versionId: string,
  ) => Promise<BookingUpdatedDTO>;
  private _withCompensationCb: (
    bookingId: string,
    versionId: string,
  ) => Promise<BookingUpdatedDTO>;

  constructor(
    invokeCb: (
      updateHostBookingDTO: UpdateHostBookingDTO,
      hostId: string,
      bookingId: string,
      versionId: string,
    ) => Promise<BookingUpdatedDTO>,
    withCompensationCb: (
      bookingId: string,
      versionId: string,
    ) => Promise<BookingUpdatedDTO>,
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
  ): Promise<BookingUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(updateHostBookingDTO, hostId, bookingId, versionId);
  }

  override async withCompensation(
    _updateHostBookingDTO: UpdateHostBookingDTO,
    _hostId: string,
    bookingId: string,
    versionId: string,
  ): Promise<BookingUpdatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId, versionId);
  }
}