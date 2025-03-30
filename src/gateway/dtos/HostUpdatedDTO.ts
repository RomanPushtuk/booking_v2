import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class HostUpdatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<HostUpdatedDTO>) {  
    this.id = data.id;
  }
}
