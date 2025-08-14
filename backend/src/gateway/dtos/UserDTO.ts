import { IsString, MaxLength, IsIn } from "class-validator";
import { shared } from "../imports";

export class UserDTO {
  @MaxLength(36)
  id: string;

  @MaxLength(36)
  login: string;

  @IsString()
  password: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: shared.enums.Roles;

  constructor(data: shared.types.GetInterface<UserDTO>) {
    this.id = data.id;
    this.login = data.login;
    this.password = data.password;
    this.role = data.role;
  }
}
