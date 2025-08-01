import { IsBoolean, IsArray, IsString, validateSync } from "class-validator";
import { GetInterface } from "../types";
import { DTOValidationError } from "../errors";

export class HostFilters {
  @IsArray()
  @IsString({ each: true })
  workDays?: string[];

  @IsArray()
  workHours?: {
    from: string;
    to: string;
  }[];

  @IsString()
  forwardBooking?: string;

  @IsBoolean()
  deleted?: boolean;

  constructor(data: Partial<GetInterface<HostFilters>>) {
    const { workDays, workHours, forwardBooking, deleted } = data;

    this.workDays = workDays;
    this.workHours = workHours;
    this.forwardBooking = forwardBooking;
    this.deleted = deleted;

    const errors = validateSync(this, { skipMissingProperties: true });
    if (errors.length) throw new DTOValidationError("HostFilters", errors);
  }
}
