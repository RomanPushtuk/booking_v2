import {
  MaxLength,
  IsDateString,
  IsString,
  ValidateNested,
} from "class-validator";

class _Info {
  @IsString()
  title: string;

  @IsString()
  description: string;
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

  @ValidateNested()
  info: _Info;
}
