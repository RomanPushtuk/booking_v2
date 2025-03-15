import { IsIn, IsStrongPassword, MaxLength } from "class-validator";
import { sharedModule } from "../imports";

export class CreateUserDTO {
  @MaxLength(36)
  login: string;

  @IsStrongPassword()
  password: string;

  @IsIn(Object.values(sharedModule.enums.Roles))
  role: string;
}
