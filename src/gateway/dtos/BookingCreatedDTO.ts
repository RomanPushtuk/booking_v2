import { MaxLength } from "class-validator";
import { shared } from "../imports";

export class BookingCreatedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingCreatedDTO>) {
    this.id = data.id;
  }
}
