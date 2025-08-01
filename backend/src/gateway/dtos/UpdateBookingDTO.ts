import {
  MaxLength,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

class _Info {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}

export class UpdateBookingDTO {
  @IsOptional()
  @MaxLength(36)
  clientId?: string;

  @IsOptional()
  @MaxLength(36)
  hostId?: string;

  @IsOptional()
  @IsDateString()
  fromDateTime?: string;

  @IsOptional()
  @IsDateString()
  toDateTime?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;
}
