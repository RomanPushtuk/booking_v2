import { Service } from "typedi";
import { Saga } from "../application";
import { DeleteUserDTO } from "../dtos";

@Service()
export class DeleteUserSaga extends Saga<DeleteUserDTO, void> {}
