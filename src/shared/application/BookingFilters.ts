import { IsBoolean, IsDateString, validateSync } from "class-validator";
import { GetInterface } from "../types";

export class BookingFilters {
  clientId?: string;

  hostId?: string;

  @IsDateString()
  fromDateTime?: string;

  @IsDateString()
  toDateTime?: string;

  @IsDateString()
  fromDateTimeStart?: string;

  @IsDateString()
  fromDateTimeEnd?: string;

  @IsDateString()
  toDateTimeStart?: string;

  @IsDateString()
  toDateTimeEnd?: string;

  @IsBoolean()
  deleted?: boolean;

  constructor(data: Partial<GetInterface<BookingFilters>>) {
    const {
      clientId,
      hostId,
      fromDateTime,
      toDateTime,
      fromDateTimeStart,
      fromDateTimeEnd,
      toDateTimeStart,
      toDateTimeEnd,
      deleted,
    } = data;

    this.clientId = clientId;
    this.hostId = hostId;
    this.fromDateTime = fromDateTime;
    this.toDateTime = toDateTime;
    this.fromDateTimeStart = fromDateTimeStart;
    this.fromDateTimeEnd = fromDateTimeEnd;
    this.toDateTimeStart = toDateTimeStart;
    this.toDateTimeEnd = toDateTimeEnd;
    this.deleted = deleted;

    const errors = validateSync(this, { skipMissingProperties: true });
    if (errors.length)
      throw new Error("BookingFilters error", { cause: errors });
  }
}
