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

  @ValidateNested()
  @IsOptional()
  info?: _Info;

  constructor(data: shared.types.GetInterface<BookingDTO>) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(BookingDTO.name, errors);
  }
}
