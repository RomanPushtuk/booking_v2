import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class BookingDeletedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingDeletedDTO>) {
    this.id = data.id;
  }
}
