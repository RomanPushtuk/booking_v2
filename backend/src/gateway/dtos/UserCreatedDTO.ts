import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class UserCreatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<UserCreatedDTO>) {
    this.id = data.id;
  }
}
