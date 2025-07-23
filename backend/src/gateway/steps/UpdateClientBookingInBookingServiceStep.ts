import { Step } from "../application";
import { UpdateClientBookingDTO, BookingUpdatedDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateClientBookingInBookingServiceStep extends Step<
  UpdateClientBookingDTO,
  BookingUpdatedDTO
> {
  private _invokeCb: (
    updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ) => Promise<BookingUpdatedDTO>;
  private _withCompensationCb: (
    bookingId: string,
    versionId: string,
  ) => Promise<BookingUpdatedDTO>;

  constructor(
    invokeCb: (
      updateClientBookingDTO: UpdateClientBookingDTO,
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
    updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ): Promise<BookingUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(updateClientBookingDTO, bookingId, versionId);
  }

  override async withCompensation(
    _updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ): Promise<BookingUpdatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId, versionId);
  }
}
