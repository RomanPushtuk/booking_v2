import { Step } from "../application";
import { BookingCreatedDTO, BookingDeletedDTO, BookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateBookingInBookingServiceStep extends Step<
  BookingDTO,
  unknown
> {
  private _invokeCb: (bookingDTO: BookingDTO) => Promise<BookingCreatedDTO>;
  private _withCompensationCb: (
    bookingId: string,
  ) => Promise<BookingDeletedDTO>;

  constructor(
    invokeCb: (bookingDTO: BookingDTO) => Promise<BookingCreatedDTO>,
    withCompensationCb: (bookingId: string) => Promise<BookingCreatedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  async invoke(bookingDTO: BookingDTO): Promise<BookingCreatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(bookingDTO);
  }

  async withCompensation(bookingDTO: BookingDTO): Promise<BookingDeletedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingDTO.id);
  }
}
