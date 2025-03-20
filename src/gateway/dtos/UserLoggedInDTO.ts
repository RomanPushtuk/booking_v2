import { IsJWT, MaxLength, validateSync } from "class-validator";
import { shared } from "../imports";

export class UserLoggedInDTO {
  @MaxLength(36)
  id: string;

  @IsJWT()
  accessToken: string;

  constructor(data: shared.types.GetInterface<UserLoggedInDTO>) {
    this.id = data.id;
    this.accessToken = data.accessToken;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(UserLoggedInDTO.name, errors);
  }
}
