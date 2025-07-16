import { Step } from "../application";
import { logger } from "../logger";

export class DeleteHostBookingInBookingServiceStep extends Step<string, void> {
  private _invokeCb: (bookingId: string, hostId: string) => Promise<void>;
  private _withCompensationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (bookingId: string, hostId: string) => Promise<void>,
    withCompensationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(bookingId: string, hostId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(bookingId, hostId);
    return;
  }

  override async withCompensation(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingId);
    return;
  }
}