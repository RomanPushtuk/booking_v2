import { Step } from "../application";
import { BookingDeletedDTO, BookingRestoredDTO } from "../dtos";
import { logger } from "../logger";

export class DeleteBookingInBookingServiceStep extends Step<string, unknown> {
  private _invokeCb: (bookingId: string) => Promise<BookingDeletedDTO>;
  private _withCompensationCb: (
    bookingId: string,
  ) => Promise<BookingRestoredDTO>;

  constructor(
    invokeCb: (bookingId: string) => Promise<BookingDeletedDTO>,
    withCompensationCb: (bookingId: string) => Promise<BookingRestoredDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(bookingId: string): Promise<BookingDeletedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(bookingId);
  }

  override async withCompensation(
    bookingId: string,
  ): Promise<BookingRestoredDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId);
  }
}
