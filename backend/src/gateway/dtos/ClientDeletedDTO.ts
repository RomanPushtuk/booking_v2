import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class ClientDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<ClientDeletedDTO>) {
    this.id = data.id;
  }
}
