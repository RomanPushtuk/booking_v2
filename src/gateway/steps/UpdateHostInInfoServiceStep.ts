import { Step } from "../application";
import { UpdateHostDTO } from "../dtos";
import { shared } from "../imports";

export class UpdateHostInInfoServiceStep extends Step<UpdateHostDTO, void> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
