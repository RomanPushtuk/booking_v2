import { MaxLength, validateSync } from "class-validator";
import { shared } from "../imports";

export class UserDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<UserDeletedDTO>) {
    this.id = data.id;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(UserDeletedDTO.name, errors);
  }
}
