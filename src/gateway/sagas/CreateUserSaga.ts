import { Service } from "typedi";
import { Saga } from "../application";
import { CreateUserDTO } from "../dtos";

@Service()
export class CreateUserSaga extends Saga<CreateUserDTO, void> {}
