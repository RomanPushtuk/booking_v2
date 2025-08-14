import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class HostDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<HostDeletedDTO>) {
    this.id = data.id;
  }
}
