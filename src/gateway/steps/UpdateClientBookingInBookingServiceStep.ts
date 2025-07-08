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
  ) => Promise<void>;
  private _withCompenstationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (
      updateClientBookingDTO: UpdateClientBookingDTO,
      bookingId: string,
    ) => Promise<void>,
    withCompenstationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }

  override async invoke(
    updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(updateClientBookingDTO, bookingId);
    return;
  }

  override async withCompenstation(
    _updateClientBookingDTO: UpdateClientBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(bookingId);
    return;
  }
}
