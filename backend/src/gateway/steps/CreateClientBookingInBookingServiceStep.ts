import { Step } from "../application";
import { CreateClientBookingDTO, BookingCreatedDTO } from "../dtos";
import { logger } from "../logger";

export class CreateClientBookingInBookingServiceStep extends Step<
  CreateClientBookingDTO,
  BookingCreatedDTO
> {
  private _invokeCb: (
    createClientBookingDTO: CreateClientBookingDTO,
    clientId: string,
    bookingId: string,
  ) => Promise<BookingCreatedDTO>;
  private _withCompensationCb: (
    bookingId: string,
  ) => Promise<BookingCreatedDTO>;

  constructor(
    invokeCb: (
      createClientBookingDTO: CreateClientBookingDTO,
      clientId: string,
      bookingId: string,
    ) => Promise<BookingCreatedDTO>,
    withCompensationCb: (bookingId: string) => Promise<BookingCreatedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }

  override async invoke(
    createClientBookingDTO: CreateClientBookingDTO,
    clientId: string,
    bookingId: string,
  ): Promise<BookingCreatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(createClientBookingDTO, clientId, bookingId);
  }

  override async withCompensation(
    _createClientBookingDTO: CreateClientBookingDTO,
    bookingId: string,
  ): Promise<BookingCreatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId);
  }
}
