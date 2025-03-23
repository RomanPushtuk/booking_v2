import { Step } from "../application";
import { DeleteUserDTO } from "../dtos";

export class DeleteUserInInfoServiceStep extends Step<DeleteUserDTO, void> {
  override invoke(params: DeleteUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override withCompenstation(params: DeleteUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
