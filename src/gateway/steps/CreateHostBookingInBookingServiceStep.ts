import { Step } from "../application";
import { CreateHostBookingDTO } from "../dtos";
import { logger } from "../logger";

export class CreateHostBookingInBookingServiceStep extends Step<
  CreateHostBookingDTO,
  void
> {
  private _invokeCb: (
    createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ) => Promise<void>;
  private _withCompensationCb: (bookingId: string, hostId: string) => Promise<void>;

  constructor(
    invokeCb: (
      createHostBookingDTO: CreateHostBookingDTO,
      hostId: string,
      bookingId: string,
    ) => Promise<void>,
    withCompensationCb: (bookingId: string, hostId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }

  override async invoke(
    createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(createHostBookingDTO, hostId, bookingId);
    return;
  }

  override async withCompensation(
    _createHostBookingDTO: CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingId, hostId);
    return;
  }
}