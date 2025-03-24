import { Step } from "../application";
import { BookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateBookingInBookingServiceStep extends Step<BookingDTO, void> {
  private _invokeCb: (bookingDTO: BookingDTO) => Promise<void>;
  private _withCompenstationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (bookingDTO: BookingDTO) => Promise<void>,
    withCompenstationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(bookingDTO);
    return;
  }

  override async withCompenstation(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(bookingDTO.id);
    return;
  }
}
