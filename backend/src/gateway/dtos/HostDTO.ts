import {
  MaxLength,
  IsString,
  ValidateNested,
  validateSync,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";
import {
  IsDurationFormat,
  IsValidTimeIntervals,
} from "../../shared/validators";

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

  @IsDurationFormat()
  forwardBooking: string;

  @IsValidTimeIntervals()
  @ValidateNested({ each: true })
  workHours: _WorkHour[];

  @IsString({ each: true })
  workDays: string[];

  @ValidateNested()
  @IsOptional()
  info?: _Info;

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
