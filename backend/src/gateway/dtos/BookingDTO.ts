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
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class BookingDTO {
  @MaxLength(36)
  id: string;

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
  info?: _Info;

  constructor(data: shared.types.GetInterface<BookingDTO>) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.info = data.info;
  }
}
