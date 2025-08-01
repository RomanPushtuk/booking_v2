import { Step } from "../application";
import {
  BookingRevertedDTO,
  BookingUpdatedDTO,
  UpdateBookingDTO,
} from "../dtos";
import { logger } from "../logger";

export class UpdateBookingInBookingServiceStep extends Step<
  UpdateBookingDTO & { id: string },
  unknown
> {
  private _invokeCb: (
    updateBookingDTO: UpdateBookingDTO & { id: string },
    versionId: string,
  ) => Promise<BookingUpdatedDTO>;
  private _withCompensationCb: (
    bookingId: string,
    versionId: string,
  ) => Promise<BookingRevertedDTO>;

  constructor(
    invokeCb: (
      updateBookingDTO: UpdateBookingDTO & { id: string },
      bookingId: string,
    ) => Promise<BookingUpdatedDTO>,
    withCompensationCb: (
      bookingId: string,
      versionId: string,
    ) => Promise<BookingRevertedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(
    updateBookingDTO: UpdateBookingDTO & { id: string },
    versionId: string,
  ): Promise<BookingUpdatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(updateBookingDTO, versionId);
  }

  override async withCompensation(
    updateBookingDTO: UpdateBookingDTO & { id: string },
    versionId: string,
  ): Promise<BookingRevertedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(updateBookingDTO.id, versionId);
  }
}
