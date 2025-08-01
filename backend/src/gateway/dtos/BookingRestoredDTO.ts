import { MaxLength, validateSync } from "class-validator";
import { shared } from "../imports";

export class BookingRestoredDTO {
  @MaxLength(36)
  id: string;

  constructor(data: shared.types.GetInterface<BookingRestoredDTO>) {
    this.id = data.id;

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(
        BookingRestoredDTO.name,
        errors,
      );
  }
}
