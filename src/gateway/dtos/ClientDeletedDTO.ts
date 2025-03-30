import { MaxLength } from "class-validator";
import { shared } from "../imports";
export class ClientDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<ClientDeletedDTO>) {
    this.id = data.id;
  }
}
