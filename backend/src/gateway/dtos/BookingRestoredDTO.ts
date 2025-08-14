import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class BookingRestoredDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingRestoredDTO>) {
    this.id = data.id;
  }
}
