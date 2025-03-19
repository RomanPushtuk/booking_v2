import { Service } from "typedi";
import { Saga } from "../application";
import { UpdateHostDTO } from "../dtos";

@Service()
export class UpdateHostSaga extends Saga<UpdateHostDTO, void> {}
