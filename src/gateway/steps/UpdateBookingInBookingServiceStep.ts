import { Step } from "../application";
import { UpdateBookingDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateBookingInBookingServiceStep extends Step<
  UpdateBookingDTO,
  void
> {
  private _invokeCb: (
    updateBookingDTO: UpdateBookingDTO,
    bookingId: string,
  ) => Promise<void>;
  private _withCompenstationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (
      updateBookingDTO: UpdateBookingDTO,
      bookingId: string,
    ) => Promise<void>,
    withCompenstationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(
    updateBookingDTO: UpdateBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateBookingDTO, bookingId);
    return;
  }

  override async withCompenstation(
    _updateBookingDTO: UpdateBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(bookingId);
    return;
  }
}
