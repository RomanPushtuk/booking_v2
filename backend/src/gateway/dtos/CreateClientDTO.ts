import { IsString, MaxLength, IsIn, validateSync } from "class-validator";
import { shared } from "../imports";

export class CreateClientDTO {
  @MaxLength(36)
  login: string;

  @IsString()
  password: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: shared.enums.Roles;

  constructor(data: shared.types.GetInterface<CreateClientDTO>) {
    this.login = data.login;
    this.password = data.password;
    this.role = data.role;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(CreateClientDTO.name, errors);
  }
}
