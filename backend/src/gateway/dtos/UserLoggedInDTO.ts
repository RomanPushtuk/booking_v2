import { IsJWT } from "class-validator";
import { shared } from "../imports";

export class UserLoggedInDTO {
  @IsJWT()
  accessToken: string;

  constructor(data: shared.types.GetInterface<UserLoggedInDTO>) {
    this.accessToken = data.accessToken;
  }
}
