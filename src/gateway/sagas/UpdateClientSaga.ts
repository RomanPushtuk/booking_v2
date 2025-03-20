import { Saga } from "../application";
import { UpdateClientDTO } from "../dtos";

export class UpdateClientSaga extends Saga<UpdateClientDTO, void> {}
