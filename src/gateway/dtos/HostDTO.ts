import {
  MaxLength,
  IsString,
  ValidateNested,
} from "class-validator";
import { shared } from "../imports";

export class _WorkHour {
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

  constructor(data: shared.types.GetInterface<HostDTO>) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.info = data.info;
  }
  
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

  // constructor(data: shared.types.GetInterface<HostDTO>) {
  //   this.id = data.id;
  //   this.forwardBooking = data.forwardBooking;
  //   this.workHours = data.workHours;
  //   this.workDays = data.workDays;
  //   this.info = data.info;
  // }
}
