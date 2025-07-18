import {
  IsOptional,
  IsString,
  ValidateNested,
  validateSync,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateClientDTO {
  @IsOptional()
  @ValidateNested()
  info?: _Info;

  constructor(data: shared.types.GetInterface<UpdateClientDTO> = {}) {
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(UpdateClientDTO.name, errors);
  }
}
