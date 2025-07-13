import { Step } from "../application";
import { BookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateBookingInBookingServiceStep extends Step<BookingDTO, void> {
  private _invokeCb: (bookingDTO: BookingDTO) => Promise<void>;
  private _withCompensationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (bookingDTO: BookingDTO) => Promise<void>,
    withCompensationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(bookingDTO);
    return;
  }

  override async withCompensation(bookingDTO: BookingDTO): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingDTO.id);
    return;
  }
}
