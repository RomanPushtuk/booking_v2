import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class ClientUpdatedDTO {
  @MaxLength(36)
  id: string;
  constructor(data: shared.types.GetInterface<ClientUpdatedDTO>) {
    this.id = data.id;
  }
}
