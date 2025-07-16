import { Step } from "../application";
import { logger } from "../logger";

export class DeleteClientBookingInBookingServiceStep extends Step<string, void> {
  private _invokeCb: (bookingId: string) => Promise<void>;
  private _withCompensationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (bookingId: string) => Promise<void>,
    withCompensationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompensationCb = withCompensationCb;
  }
  override async invoke(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(bookingId);
    return;
  }

  override async withCompensation(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompensation");
    await this._withCompensationCb(bookingId);
    return;
  }
}
