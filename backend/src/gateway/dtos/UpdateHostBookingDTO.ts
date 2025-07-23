import {
  validateSync,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateHostBookingDTO {
  @IsOptional()
  @IsDateString()
  fromDateTime?: string;

  @IsOptional()
  @IsDateString()
  toDateTime?: string;

  @IsOptional()
  @ValidateNested()
  info?: _Info;

  constructor(data: shared.types.GetInterface<UpdateHostBookingDTO>) {
    this.fromDateTime = data?.fromDateTime;
    this.toDateTime = data?.toDateTime;
    this.info = data?.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(
        UpdateHostBookingDTO.name,
        errors,
      );
  }
}
