import { Step } from "../application";
import { logger } from "../logger";

export class DeleteBookingInBookingServiceStep extends Step<string, void> {
  private _invokeCb: (bookingId: string) => Promise<void>;
  private _withCompenstationCb: (bookingId: string) => Promise<void>;

  constructor(
    invokeCb: (bookingId: string) => Promise<void>,
    withCompenstationCb: (bookingId: string) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(bookingId);
    return;
  }

  override async withCompenstation(bookingId: string): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(bookingId);
    return;
  }
}
