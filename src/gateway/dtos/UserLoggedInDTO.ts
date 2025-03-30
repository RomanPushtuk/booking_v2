import { IsJWT, MaxLength } from "class-validator";
import { shared } from "../imports";

export class UserLoggedInDTO {
  @MaxLength(36)
  id: string;

  @IsJWT()
  accessToken: string;

  constructor(data: shared.types.GetInterface<UserLoggedInDTO>) {
    this.id = data.id;
    this.accessToken = data.accessToken;
  }

}
