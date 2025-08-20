import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class BookingDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingDeletedDTO>) {
    this.id = data.id;
  }
}
