import { IsIn, IsJWT } from "class-validator";
import { shared } from "../imports";

export class UserLoggedInDTO {
  @IsJWT()
  accessToken: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: shared.enums.Roles;

  constructor(data: shared.types.GetInterface<UserLoggedInDTO>) {
    this.accessToken = data.accessToken;
    this.role = data.role;
  }
}
