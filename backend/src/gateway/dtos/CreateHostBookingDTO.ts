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

export class CreateHostBookingDTO {
  @IsString()
  clientId: string;

  @IsDateString()
  fromDateTime: string;

  @IsDateString()
  toDateTime: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;

  constructor(data?: shared.types.GetInterface<CreateHostBookingDTO>) {
    if (data) {
      this.clientId = data.clientId;
      this.fromDateTime = data.fromDateTime;
      this.toDateTime = data.toDateTime;
      this.info = data.info;

      const errors = validateSync(this);
      if (errors.length) {
        throw new shared.errors.DTOValidationError(
          CreateHostBookingDTO.name,
          errors,
        );
      }
    }
  }
}
