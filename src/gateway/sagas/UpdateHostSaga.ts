import { Saga } from "../application";
import { UpdateHostDTO } from "../dtos";

export class UpdateHostSaga extends Saga<UpdateHostDTO, void> {}
