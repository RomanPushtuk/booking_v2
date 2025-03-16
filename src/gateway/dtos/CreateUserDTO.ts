import { IsIn, IsStrongPassword, MaxLength } from "class-validator";
import { shared } from "../imports";

export class CreateUserDTO {
  @MaxLength(36)
  login: string;

  @IsStrongPassword()
  password: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: string;
}
