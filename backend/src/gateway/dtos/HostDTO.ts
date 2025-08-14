import {
  MaxLength,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";
import { Type } from "class-transformer";
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
  @Type(() => _WorkHour)
  workHours: _WorkHour[];

  @IsString({ each: true })
  workDays: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;

  constructor(data: shared.types.GetInterface<HostDTO>) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.info = data.info;
  }
}
