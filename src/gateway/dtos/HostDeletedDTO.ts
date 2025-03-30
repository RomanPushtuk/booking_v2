import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class HostDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<HostDeletedDTO>) {
    this.id = data.id;
  }
}
