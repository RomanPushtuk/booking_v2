import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class BookingUpdatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingUpdatedDTO>) {
    this.id = data.id;
  }
}
