import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class HostUpdatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<HostUpdatedDTO>) {
    this.id = data.id;
  }
}
