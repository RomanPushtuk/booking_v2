import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class ClientUpdatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<ClientUpdatedDTO>) {
    this.id = data.id;
  }
}
