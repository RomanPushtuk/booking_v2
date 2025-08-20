import { GetInterface } from "../types";
import { IsBoolean, IsDateString } from "class-validator";

export class BookingFilters {
  clientId?: string;

  hostId?: string;

  @IsDateString()
  fromDateTime?: string;

  @IsDateString()
  toDateTime?: string;

  @IsBoolean()
  deleted?: boolean;

  constructor(data: Partial<GetInterface<BookingFilters>>) {
    const { clientId, hostId, fromDateTime, toDateTime, deleted } = data;

    this.clientId = clientId;
    this.hostId = hostId;
    this.fromDateTime = fromDateTime;
    this.toDateTime = toDateTime;
    this.deleted = deleted;
  }
}
