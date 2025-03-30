import {
  MaxLength,
  validateSync,
  IsDateString,
  IsString,
  ValidateNested,
} from "class-validator";
import { shared } from "../imports";

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

  constructor(data: shared.types.GetInterface<CreateBookingDTO>) {
    console.log("Received data:", data);

    if (!data || !data.clientId || !data.hostId || !data.fromDateTime || !data.toDateTime || !data.info) {
      throw new Error("Missing required properties in data object");
    }

    this.clientId = data.clientId || "some-client-id";
    this.hostId = data.hostId;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(CreateBookingDTO.name, errors);
  }
}
