import { shared } from "../imports";
import { MaxLength } from "class-validator";

export class BookingRevertedDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingRevertedDTO>) {
    this.id = data.id;
  }
}
