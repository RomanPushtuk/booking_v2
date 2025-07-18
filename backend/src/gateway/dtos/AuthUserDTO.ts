import { IsStrongPassword, MaxLength } from "class-validator";

export class AuthUserDTO {
  @MaxLength(36)
  login: string;

  @IsStrongPassword()
  password: string;
}
