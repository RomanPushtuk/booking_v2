import { IsStrongPassword, MaxLength } from "class-validator";

export class LogInUserDTO {
  @MaxLength(36)
  login: string;

  @IsStrongPassword()
  password: string;
}
