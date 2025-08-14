import { Type } from "class-transformer";
import {
  MaxLength,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";

class _Info {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateBookingDTO {
  @MaxLength(36)
  clientId: string;

  @MaxLength(36)
  hostId: string;

  @IsDateString()
  fromDateTime: string;

  @IsDateString()
  toDateTime: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info: _Info;
}
