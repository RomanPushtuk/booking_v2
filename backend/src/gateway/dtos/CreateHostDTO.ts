import { Type } from "class-transformer";
import {
  IsOptional,
  IsDefined,
  IsString,
  IsIn,
  ValidateNested,
  MaxLength,
} from "class-validator";
import { shared } from "../imports";
import {
  IsDurationFormat,
  IsValidTimeIntervals,
} from "../../shared/validators";

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
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class CreateHostDTO {
  @MaxLength(36)
  login: string;

  @IsString()
  password: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: shared.enums.Roles = shared.enums.Roles.HOST;

  @IsDurationFormat()
  forwardBooking: string;

  @IsValidTimeIntervals()
  @ValidateNested({ each: true })
  @Type(() => _WorkHour)
  workHours: _WorkHour[];

  @IsIn(Object.values(shared.enums.Days), { each: true })
  workDays: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info: _Info;
}
