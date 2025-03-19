import { Service } from "typedi";
import { Saga } from "../application";
import { UpdateClientDTO } from "../dtos";

@Service()
export class UpdateClientSaga extends Saga<UpdateClientDTO, void> {}
