import { MaxLength } from "class-validator";

export class DeleteBookingDTO {
  @MaxLength(36)
  id: string;
}
