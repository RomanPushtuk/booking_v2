import { Saga } from "../application";
import { CreateUserDTO } from "../dtos";

export class CreateUserSaga extends Saga<CreateUserDTO, void> {}
