import {
  MaxLength,
  validateSync,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class PublicBookingDTO {
  @MaxLength(36)
  id: string;

  @IsDateString()
  fromDateTime: string;

  @IsDateString()
  toDateTime: string;

  @ValidateNested()
  @IsOptional()
  info?: _Info;

  constructor(data: shared.types.GetInterface<PublicBookingDTO>) {
    this.id = data.id;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(PublicBookingDTO.name, errors);
  }
}
