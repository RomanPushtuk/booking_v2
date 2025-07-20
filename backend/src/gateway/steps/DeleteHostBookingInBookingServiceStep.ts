import { Step } from "../application";
import { BookingDeletedDTO } from "../dtos";
import { logger } from "../logger";

export class DeleteHostBookingInBookingServiceStep extends Step<string, BookingDeletedDTO> {
  private _invokeCb: (bookingId: string, hostId: string) => Promise<BookingDeletedDTO>;
  private _withCompensationCb: (bookingId: string) => Promise<BookingDeletedDTO>;

  constructor(
    invokeCb: (bookingId: string, hostId: string) => Promise<BookingDeletedDTO>,
    withCompensationCb: (bookingId: string) => Promise<BookingDeletedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(bookingId: string, hostId: string): Promise<BookingDeletedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(bookingId, hostId);
  }

  override async withCompensation(bookingId: string): Promise<BookingDeletedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId);
  }
}