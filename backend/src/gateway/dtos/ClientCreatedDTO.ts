import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class ClientCreatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<ClientCreatedDTO>) {
    this.id = data.id;
  }
}
