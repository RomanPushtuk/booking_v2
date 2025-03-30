import { IsDateString, validateSync } from "class-validator";
import { GetInterface } from "../types";

export class BookingFilters {
  clientId?: string;

  hostId?: string;

  @IsDateString()
  dateTimeFrom?: string;

  @IsDateString()
  dateTimeTo?: string;

  constructor(data: Partial<GetInterface<BookingFilters>>) {
    const { clientId, hostId, dateTimeFrom, dateTimeTo } = data;

    this.clientId = clientId;
    this.hostId = hostId;
    this.dateTimeFrom = dateTimeFrom;
    this.dateTimeTo = dateTimeTo;

    const errors = validateSync(this, { skipMissingProperties: true });
    if (errors.length)
      throw new Error("BookingFilters error", { cause: errors });
  }
}
