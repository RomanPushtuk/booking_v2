import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class UserDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<UserDeletedDTO>) {
    this.id = data.id;
  }
}
