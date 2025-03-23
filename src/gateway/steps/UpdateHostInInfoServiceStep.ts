import { Step } from "../application";
import { UpdateHostDTO } from "../dtos";
import { logger } from "../logger";

export class UpdateHostInInfoServiceStep extends Step<UpdateHostDTO, void> {
  override async invoke(): Promise<void> {
    logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
