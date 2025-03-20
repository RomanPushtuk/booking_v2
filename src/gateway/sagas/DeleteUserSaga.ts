import { Saga } from "../application";
import { DeleteUserDTO } from "../dtos";

export class DeleteUserSaga extends Saga<DeleteUserDTO, void> {}
