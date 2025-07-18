import {
  validateSync,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { shared } from "../imports";

class _Info {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateClientBookingDTO {
  @IsString()
  hostId: string;

  @IsDateString()
  fromDateTime: string;

  @IsDateString()
  toDateTime: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;

  constructor(data?: shared.types.GetInterface<CreateClientBookingDTO>) {
    if (data) {
      this.hostId = data.hostId;
      this.fromDateTime = data.fromDateTime;
      this.toDateTime = data.toDateTime;
      this.info = data.info;

      const errors = validateSync(this);
      if (errors.length) {
        throw new shared.errors.DTOValidationError(
          CreateClientBookingDTO.name,
          errors,
        );
      }
    }
  }
}
