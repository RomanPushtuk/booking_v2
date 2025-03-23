import { Step } from "../application";
import { UpdateClientDTO } from "../dtos";
import { shared } from "../imports";

export class UpdateClientInInfoServiceStep extends Step<UpdateClientDTO, void> {
  override async invoke(): Promise<void> {
    shared.logger.info(this.constructor.name + " invoke");
    return;
  }

  override async withCompenstation(): Promise<void> {
    shared.logger.info(this.constructor.name + " withCompenstation");
    return;
  }
}
