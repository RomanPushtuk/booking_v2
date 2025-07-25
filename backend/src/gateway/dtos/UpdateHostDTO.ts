import { Type } from "class-transformer";
import {
  IsOptional,
  IsDefined,
  IsString,
  IsIn,
  ValidateNested,
} from "class-validator";
import { shared } from "../imports";
import { IsDurationFormat, IsValidTimeIntervals } from "../../shared/validators";

class _WorkHour {
  @IsDefined()
  @IsString()
  from: string;

  @IsDefined()
  @IsString()
  to: string;
}

class _Info {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateHostDTO {
  @IsOptional()
  @IsDurationFormat()
  forwardBooking?: string;

  @IsOptional()
  @IsValidTimeIntervals()
  @ValidateNested({ each: true })
  @Type(() => _WorkHour)
  workHours?: _WorkHour[];

  @IsOptional()
  @IsIn(Object.values(shared.enums.Days), { each: true })
  workDays?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;
}
