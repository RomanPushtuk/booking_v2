import {
  MaxLength,
  IsDateString,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";
import { Type } from "class-transformer";

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

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;

  constructor(data: shared.types.GetInterface<PublicBookingDTO>) {
    this.id = data.id;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.info = data.info;
  }
}
