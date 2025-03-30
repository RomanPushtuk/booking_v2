import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class UserCreatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<UserCreatedDTO>) {
    this.id = data.id;
  }

}
