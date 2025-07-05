import { Step } from "../application";
import { CreateClientBookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateClientBookingInBookingServiceStep extends Step<
  CreateClientBookingDTO,
  void
> {
  private _invokeCb: (
    createClientBookingDTO: CreateClientBookingDTO,
    clientId: string,
    bookingId: string,
  ) => Promise<void>;
  private _withCompenstationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (
      createClientBookingDTO: CreateClientBookingDTO,
      clientId: string,
      bookingId: string,
    ) => Promise<void>,
    withCompenstationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }

  override async invoke(
    createClientBookingDTO: CreateClientBookingDTO,
    clientId: string,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(createClientBookingDTO, clientId, bookingId);
    return;
  }

  override async withCompenstation(
    _createClientBookingDTO: CreateClientBookingDTO,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(bookingId);
    return;
  }
}
