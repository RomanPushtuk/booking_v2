import { Step } from "../application";
import { DeleteBookingDTO } from "../dtos";
import { logger } from "../logger";

export class DeleteBookingInBookingServiceStep extends Step<
  DeleteBookingDTO,
  void
> {
  private _invokeCb: (deleteBookingDTO: DeleteBookingDTO) => Promise<void>;
  private _withCompenstationCb: (
    deleteBookingDTO: DeleteBookingDTO,
  ) => Promise<void>;

  constructor(
    invokeCb: (deleteBookingDTO: DeleteBookingDTO) => Promise<void>,
    withCompenstationCb: (deleteBookingDTO: DeleteBookingDTO) => Promise<void>,
  ) {
    super();
    this._invokeCb = invokeCb;
    this._withCompenstationCb = withCompenstationCb;
  }
  override async invoke(deleteBookingDTO: DeleteBookingDTO): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    await this._invokeCb(deleteBookingDTO);
    return;
  }

  override async withCompenstation(
    deleteBookingDTO: DeleteBookingDTO,
  ): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    await this._withCompenstationCb(deleteBookingDTO);
    return;
  }
}
