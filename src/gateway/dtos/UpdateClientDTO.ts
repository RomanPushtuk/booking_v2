import {
  IsOptional,
  IsString,
  ValidateNested,
  validateSync,
} from "class-validator";
import { shared } from "../imports";
import { Type } from "class-transformer";
import { _WorkHour } from "./HostDTO";

class _Info {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}

export class UpdateClientDTO {
  @ValidateNested()
  @IsOptional()
  @Type(() => _WorkHour)
  info?: _Info;

  constructor(data: shared.types.GetInterface<UpdateClientDTO>) {
    console.log("data:", data);
    this.info = data?.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(UpdateClientDTO.name, errors);
  }
}
