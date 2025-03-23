import {
  MaxLength,
  IsString,
  ValidateNested,
  validateSync,
} from "class-validator";
import { shared } from "../imports";

class _WorkHour {
  @IsString()
  from: string;

  @IsString()
  to: string;
}

class _Info {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class HostDTO {
  @MaxLength(36)
  id: string;

  @IsString()
  forwardBooking: string;

  @ValidateNested({ each: true })
  workHours: _WorkHour[];

  @IsString({ each: true })
  workDays: string[];

  @ValidateNested()
  info: _Info;

  constructor(data: shared.types.GetInterface<HostDTO>) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.info = data.info;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(HostDTO.name, errors);
  }
}
