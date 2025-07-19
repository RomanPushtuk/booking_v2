import { Step } from "../application";
import { CreateHostBookingDTO, BookingCreatedDTO } from "../dtos";
import { logger } from "../logger";

export class CreateHostBookingInBookingServiceStep extends Step<
  CreateHostBookingDTO,
  BookingCreatedDTO
> {
  private _invokeCb: (
    createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ) => Promise<BookingCreatedDTO>;
  private _withCompensationCb: (bookingId: string, hostId: string) => Promise<BookingCreatedDTO>;

  constructor(
    invokeCb: (
      createHostBookingDTO: CreateHostBookingDTO,
      hostId: string,
      bookingId: string,
    ) => Promise<BookingCreatedDTO>,
    withCompensationCb: (bookingId: string, hostId: string) => Promise<BookingCreatedDTO>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }

  override async invoke(
    createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ): Promise<BookingCreatedDTO> {
    logger.info(this.constructor.name + " invoke");
    return await this._invokeCb(createHostBookingDTO, hostId, bookingId);
  }

  override async withCompensation(
    _createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ): Promise<BookingCreatedDTO> {
    logger.info(this.constructor.name + " withCompensation");
    return await this._withCompensationCb(bookingId, hostId);
  }
}