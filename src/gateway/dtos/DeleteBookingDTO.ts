import { MaxLength } from "class-validator";

export class DeleteBookingDTO {
  @MaxLength(36)
  id: string;

  constructor(data: unknown) {
    // @ts-expect-error ok, validate next
    this.id = data.id;
  }
}
