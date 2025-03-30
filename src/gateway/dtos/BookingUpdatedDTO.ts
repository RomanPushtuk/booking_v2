import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class BookingUpdatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingUpdatedDTO>) {
    this.id = data.id;
  }
}
