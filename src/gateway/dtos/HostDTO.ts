import {
  MaxLength,
  IsString,
  ValidateNested,
  validateSync,
} from "class-validator";
import { shared } from "../imports";

class _info {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class HostDTO {
  @MaxLength(36)
  id: string;

  @ValidateNested()
  info: _info;

  constructor(data: shared.types.GetInterface<HostDTO>) {
    this.id = data.id;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(HostDTO.name, errors);
  }
}
