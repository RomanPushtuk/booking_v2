import {
  MaxLength,
  IsString,
  ValidateNested,
  validateSync,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class ClientDTO {
  @MaxLength(36)
  id: string;

  @ValidateNested()
  info: _Info;

  constructor(data: shared.types.GetInterface<ClientDTO>) {
    this.id = data.id;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(ClientDTO.name, errors);
  }
}
