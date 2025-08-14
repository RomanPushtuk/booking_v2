import {
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

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
  @Type(() => _Info)
  info?: _Info;
}
