import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class HostCreatedDTO {
  @MaxLength(36)
  id: string;
  constructor(data: shared.types.GetInterface<HostCreatedDTO>) {
    this.id = data.id;
  }
}
