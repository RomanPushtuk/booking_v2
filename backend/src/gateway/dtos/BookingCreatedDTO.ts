import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class BookingCreatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingCreatedDTO>) {
    this.id = data.id;
  }
}
